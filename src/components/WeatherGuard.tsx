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
	const setWeatherDate = useWeatherStore((state) => state.setUpdateDate);

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

			setCurrWeather(weather);
		};

		if (
			currWeather?.sys.country !== city?.country ||
			currWeather?.name !== city?.name
		) {
			fetchWeather();
			setWeatherDate(Date.now());
		}
	}, [city, weatherService, setCurrWeather, currWeather, setWeatherDate]);

	if (!currWeather || !weatherDate) {
		return <div>Loading...</div>;
	}

	return <WeatherItem weather={currWeather} date={weatherDate} />;
};
