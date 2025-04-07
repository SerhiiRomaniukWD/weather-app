import axios, { AxiosInstance } from "axios";

import { WeatherData } from "../types/weather";

export class WeatherService {
	private axiosInstance: AxiosInstance;
	private readonly BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
	private readonly API_KEY = "a5cb2b17e7071e26c2fa985c48e0e1e5";

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.BASE_URL,
			timeout: 5000,
		});
	}

	public async getWeatherByCoordinates(
		lat: number,
		lon: number
	): Promise<WeatherData | null> {
		try {
			const response = await this.axiosInstance.get<WeatherData>("", {
				params: {
					lat,
					lon,
					appid: this.API_KEY,
					units: "metric",
				},
			});

			return response.data;
		} catch (error) {
			console.error("WeatherService Error:", error);
			return null;
		}
	}
}
