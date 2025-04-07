import { FC, useEffect, useMemo, useState } from "react";

import { useCityStore } from "../store/cityStore";

import { WeatherService } from "../services/WeatherService";
import { WeatherData } from "../types/weather";
import { WeatherItem } from "./WeatherItem";

export const WeatherGuard: FC = () => {
	const city = useCityStore((state) => state.city);
	const [currWeather, setCurrWeather] = useState<WeatherData | null>(null);

	const weatherService = useMemo(() => new WeatherService(), []);

	useEffect(() => {
		const fetchWeather = async () => {
			if (!city) {
				return;
			}

			const weather = await weatherService.getWeatherByCoordinates(
				city.lat,
				city.lon
			);

			if (weather) {
				setCurrWeather(weather);
			}
		};

		fetchWeather();
	}, [city, weatherService]);

	if (!currWeather) {
		return <div>Loading...</div>;
	}

	return <WeatherItem weather={currWeather} />;
};
