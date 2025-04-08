import axios from "axios";
import { GeoService } from "./GeoService";
import { CitySuggestion } from "../types/geo";

jest.mock("axios");

describe("GeoService", () => {
	let geoService: GeoService;

	beforeEach(() => {
		geoService = new GeoService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return city suggestions for a valid query", async () => {
		const mockData: CitySuggestion[] = [
			{ name: "London", lat: 51.5074, lon: -0.1278, country: "GB" },
			{ name: "Los Angeles", lat: 34.0522, lon: -118.2437, country: "US" },
		];

		(axios.get as jest.Mock).mockResolvedValue({ data: mockData });

		const result = await geoService.getCitySuggestions("Lon");

		expect(result).toEqual(mockData);
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith("", {
			params: {
				q: "Lon",
				limit: 5,
				appid: "a5cb2b17e7071e26c2fa985c48e0e1e5",
			},
		});
	});

	it("should return an empty array for an empty query", async () => {
		const result = await geoService.getCitySuggestions("");

		expect(result).toEqual([]);
		expect(axios.get).not.toHaveBeenCalled();
	});

	it("should handle API errors gracefully", async () => {
		(axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

		const result = await geoService.getCitySuggestions("Lon");

		expect(result).toEqual([]);
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith("", {
			params: {
				q: "Lon",
				limit: 5,
				appid: "a5cb2b17e7071e26c2fa985c48e0e1e5",
			},
		});
	});
});
