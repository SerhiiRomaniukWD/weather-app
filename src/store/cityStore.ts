import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CitySuggestion } from "../types/geo";

interface CityStore {
	city: CitySuggestion | null;

	setCity: (city: CitySuggestion | null) => void;
}

export const useCityStore = create(
	persist<CityStore>(
		(set) => ({
			city: null,

			setCity: (city: CitySuggestion | null) => {
				set({ city });
			},
		}),
		{ name: "selectedCity", storage: createJSONStorage(() => localStorage) }
	)
);
