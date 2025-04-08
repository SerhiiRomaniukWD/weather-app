import axios from "axios";
import { WeatherService } from "./WeatherService";
import { WeatherData } from "../types/weather";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const axiosInstance = {
	get: jest.fn(),
};

describe("WeatherService", () => {
	let weatherService: WeatherService;
	let consoleErrorMock: jest.SpyInstance;

	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mockedAxios.create.mockReturnValue(axiosInstance as any);
		weatherService = new WeatherService();
		consoleErrorMock = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
	});

	afterEach(() => {
		jest.clearAllMocks();
		consoleErrorMock.mockRestore();
	});

	it("should fetch weather data by coordinates", async () => {
		const mockData: WeatherData = {
			coord: { lon: 30.523, lat: 50.45 },
			weather: [
				{ id: 800, main: "Clear", description: "clear sky", icon: "01d" },
			],
			base: "stations",
			main: {
				temp: 25,
				feels_like: 24,
				temp_min: 24,
				temp_max: 26,
				pressure: 1012,
				humidity: 53,
			},
			visibility: 10000,
			wind: { speed: 5, deg: 90 },
			clouds: { all: 0 },
			dt: 1618317040,
			sys: {
				type: 1,
				id: 8908,
				country: "UA",
				sunrise: 1618282134,
				sunset: 1618333901,
			},
			timezone: 10800,
			id: 703448,
			name: "Kyiv",
			cod: 200,
		};

		axiosInstance.get.mockResolvedValue({ data: mockData });

		const result = await weatherService.getWeatherByCoordinates(50.45, 30.523);

		expect(axiosInstance.get).toHaveBeenCalledWith("", {
			params: {
				lat: 50.45,
				lon: 30.523,
				appid: "a5cb2b17e7071e26c2fa985c48e0e1e5",
				units: "metric",
			},
		});
		expect(result).toEqual(mockData);
	});

	it("should handle API errors gracefully and return null", async () => {
		axiosInstance.get.mockRejectedValue(new Error("API Error"));

		const result = await weatherService.getWeatherByCoordinates(50.45, 30.523);

		expect(result).toBeNull();
		expect(axiosInstance.get).toHaveBeenCalledWith("", {
			params: {
				lat: 50.45,
				lon: 30.523,
				appid: "a5cb2b17e7071e26c2fa985c48e0e1e5",
				units: "metric",
			},
		});
	});
});
