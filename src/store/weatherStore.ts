import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { WeatherData } from "../types/weather";

interface WeatherStore {
	weather: WeatherData | null;

	setWeather: (weather: WeatherData | null) => void;
}

export const useWeatherStore = create(
	persist<WeatherStore>(
		(set) => ({
			weather: null,

			setWeather: (weather: WeatherData | null) => {
				set({ weather });
			},
		}),
		{ name: "weather", storage: createJSONStorage(() => localStorage) }
	)
);
