import { FC, useEffect, useMemo, useState } from "react";

import { useCityStore } from "../store/cityStore";

import { WeatherService } from "../services/WeatherService";
import { WeatherData } from "../types/weather";

import { ItemLayout } from "./ItemLayout";

export const WeatherItem: FC = () => {
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

	return (
		<ItemLayout>
			<div>{currWeather?.weather[0].main}</div>
		</ItemLayout>
	);
};
