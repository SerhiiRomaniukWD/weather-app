import { FC, useMemo } from "react";

import UpdateIcon from "@icons/update.svg";

import { useCityStore } from "../store/cityStore";
import { WeatherService } from "../services/WeatherService";
import { useWeatherStore } from "../store/weatherStore";

export const UpdateWeatherBtn: FC = () => {
	const city = useCityStore((state) => state.city);
	const setCurrWeather = useWeatherStore((state) => state.setWeather);

	const weatherService = useMemo(() => new WeatherService(), []);

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

	const handleUpdateWeather = async () => {
		await fetchWeather();
	};

	return (
		<button
			onClick={handleUpdateWeather}
			className="cursor-pointer p-1 opacity-75"
			type="button"
		>
			<UpdateIcon />
		</button>
	);
};
