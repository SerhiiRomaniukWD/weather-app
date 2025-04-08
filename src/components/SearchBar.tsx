import { FC, FormEvent, useEffect, useMemo, useState } from "react";

import { GeoService } from "../services/GeoService.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import { useCityStore } from "../store/cityStore.ts";
import { CitySuggestion } from "../types/geo.ts";

import LocationIcon from "@icons/location.svg";

import { ItemLayout } from "./ItemLayout";
import { SuggestionsList } from "./SuggestionsList";
import { UpdateWeatherBtn } from "./UpdateWeatherBtn.tsx";

export const SearchBar: FC = () => {
	const city = useCityStore((state) => state.city);
	const [cityInput, setCityInput] = useState(`${city?.name}, ${city?.country}`);
	const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
	const debouncedValue = useDebounce(cityInput, 300);
	const setCity = useCityStore((state) => state.setCity);

	const geoService = useMemo(() => new GeoService(), []);

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setCityInput(e.currentTarget.value);
	};
	const handleChooseCity = (city: CitySuggestion) => {
		setSuggestions([]);
		setCityInput(`${city?.name}, ${city?.country}`);
		setCity(city);
	};

	useEffect(() => {
		const fetchCitySuggestions = async () => {
			const cities = await geoService.getCitySuggestions(debouncedValue);
			setSuggestions(cities);
		};

		const fullCityString = `${city?.name}, ${city?.country}`;

		if (debouncedValue !== fullCityString) {
			fetchCitySuggestions();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue, geoService]);

	return (
		<div className="relative h-fit">
			<ItemLayout>
				<form className="flex justify-between gap-4 h-fit">
					<label className="flex gap-2 items-center opacity-75 w-full">
						<div>
							<LocationIcon />
						</div>

						<input
							className="font-rubik w-full outline-none text-lg"
							type="text"
							placeholder="City name..."
							onChange={handleChange}
							value={cityInput}
						/>
					</label>

					<UpdateWeatherBtn />
				</form>
			</ItemLayout>

			{suggestions.length > 0 && (
				<SuggestionsList
					suggestions={suggestions}
					chooseCity={handleChooseCity}
				/>
			)}
		</div>
	);
};
