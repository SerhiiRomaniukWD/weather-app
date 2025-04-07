import axios, { AxiosInstance } from "axios";

import { CitySuggestion } from "../types/geo.ts";

export class GeoService {
	private axiosInstance: AxiosInstance;
	private readonly BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";
	private readonly API_KEY = "a5cb2b17e7071e26c2fa985c48e0e1e5";

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.BASE_URL,
			timeout: 5000,
		});
	}

	public async getCitySuggestions(
		query: string,
		limit = 5
	): Promise<CitySuggestion[]> {
		if (!query) return [];

		try {
			const response = await this.axiosInstance.get<CitySuggestion[]>("", {
				params: {
					q: query,
					limit,
					appid: this.API_KEY,
				},
			});

			return response.data;
		} catch (error) {
			console.error("GeoService Error:", error);
			return [];
		}
	}
}
