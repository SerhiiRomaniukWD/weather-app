import { FC, FormEvent, useEffect, useMemo, useState } from "react";

import { GeoService } from "../services/GeoService.ts";
import { CitySuggestion } from "../types/geo.ts";

import LocationIcon from "@icons/location.svg";

import { ItemLayout } from "./ItemLayout";
import { SuggestionsList } from "./SuggestionsList";
import { useCityStore } from "../store/cityStore.ts";

export const SearchBar: FC = () => {
	const city = useCityStore((state) => state.city);
	const [cityInput, setCityInput] = useState(`${city?.name}, ${city?.country}`);
	const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
	const setCity = useCityStore((state) => state.setCity);

	const geoService = useMemo(() => new GeoService(), []);

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setCity(null);
		setCityInput(e.currentTarget.value);
	};
	const handleChooseCity = (city: CitySuggestion) => {
		const cityFullName = `${city.name}, ${city.country}`;

		setSuggestions([]);
		setCity(city);
		setCityInput(cityFullName);
	};

	useEffect(() => {
		const fetchCitySuggestions = async () => {
			if (cityInput.trim().length < 2) {
				return;
			}

			if (!city) {
				const cities = await geoService.getCitySuggestions(cityInput);
				setSuggestions(cities);
			}
		};

		fetchCitySuggestions();
	}, [cityInput, geoService, city]);

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
