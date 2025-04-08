import { FC, useEffect, useMemo } from "react";

import { useCityStore } from "../store/cityStore";

import { WeatherService } from "../services/WeatherService";
import { WeatherItem } from "./WeatherItem";
import { useWeatherStore } from "../store/weatherStore";

export const WeatherGuard: FC = () => {
	const city = useCityStore((state) => state.city);
	const currWeather = useWeatherStore((state) => state.weather);
	const setCurrWeather = useWeatherStore((state) => state.setWeather);
	const weatherDate = useWeatherStore((state) => state.updateDate);

	const weatherService = useMemo(() => new WeatherService(), []);

	useEffect(() => {
		const fetchWeather = async () => {
			if (!city) {
				return;
			}

			setCurrWeather(null);

			const weather = await weatherService.getWeatherByCoordinates(
				city.lat,
				city.lon
			);

			setCurrWeather(weather);
		};

		if (
			currWeather?.sys.country !== city?.country ||
			currWeather?.name !== city?.name
		) {
			fetchWeather();
		}
	}, [city, weatherService, setCurrWeather, currWeather]);

	if (!city) {
		return null;
	}

	if (!currWeather || !weatherDate) {
		return <div className="flex justify-center py-4">Loading...</div>;
	}

	return <WeatherItem weather={currWeather} date={weatherDate} />;
};
