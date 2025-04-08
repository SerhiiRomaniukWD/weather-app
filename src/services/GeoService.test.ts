import axios from "axios";
import { GeoService } from "./GeoService";
import { CitySuggestion } from "../types/geo";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const axiosInstance = {
	get: jest.fn(),
};

describe("GeoService", () => {
	let geoService: GeoService;

	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mockedAxios.create.mockReturnValue(axiosInstance as any);
		geoService = new GeoService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch city suggestions", async () => {
		const mockData: CitySuggestion[] = [
			{ name: "Kyiv", country: "UA", lat: 50.45, lon: 30.523 },
			{ name: "Kharkiv", country: "UA", lat: 49.99, lon: 36.23 },
		];

		axiosInstance.get.mockResolvedValue({ data: mockData });

		const result = await geoService.getCitySuggestions("Kyiv");

		expect(axiosInstance.get).toHaveBeenCalledWith("", {
			params: {
				q: "Kyiv",
				limit: 5,
				appid: "a5cb2b17e7071e26c2fa985c48e0e1e5",
			},
		});
		expect(result).toEqual(mockData);
	});

	it("should return an empty array when API returns no suggestions", async () => {
		axiosInstance.get.mockResolvedValue({ data: [] });

		const result = await geoService.getCitySuggestions("UnknownCity");

		expect(result).toEqual([]);
		expect(axiosInstance.get).toHaveBeenCalledWith("", {
			params: {
				q: "UnknownCity",
				limit: 5,
				appid: "a5cb2b17e7071e26c2fa985c48e0e1e5",
			},
		});
	});
});
