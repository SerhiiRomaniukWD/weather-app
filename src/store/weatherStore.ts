import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { WeatherData } from "../types/weather";

interface WeatherStore {
	weather: WeatherData | null;
	updateDate: number | null;

	setWeather: (weather: WeatherData | null) => void;
	setUpdateDate: (date: number | null) => void;
}

export const useWeatherStore = create(
	persist<WeatherStore>(
		(set) => ({
			weather: null,
			updateDate: null,

			setWeather: (weather: WeatherData | null) => {
				set({ weather });
			},
			setUpdateDate: (date: number | null) => {
				set({ updateDate: date });
			},
		}),
		{ name: "weather", storage: createJSONStorage(() => localStorage) }
	)
);
