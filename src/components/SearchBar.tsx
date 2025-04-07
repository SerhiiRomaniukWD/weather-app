import { FC, FormEvent, useEffect, useMemo, useState } from "react";

import { GeoService } from "@services/GeoService.ts";
import { CitySuggestion } from "@types/geo.ts";

import LocationIcon from "@icons/location.svg";

import { ItemLayout } from "./ItemLayout";
import { SuggestionsList } from "./SuggestionsList";

export const SearchBar: FC = () => {
	const [city, setCity] = useState("");
	const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
	const [isCitySelected, setIsCitySelected] = useState(false);

	const geoService = useMemo(() => new GeoService(), []);

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setIsCitySelected(false);
		setCity(e.currentTarget.value);
	};
	const handleChooseCity = (city: CitySuggestion) => {
		setSuggestions([]);
		setIsCitySelected(true);
		setCity(`${city.name}, ${city.country}`);
	};

	useEffect(() => {
		const fetchCitySuggestions = async () => {
			if (city.trim().length < 2) {
				return;
			}

			if (!isCitySelected) {
				const cities = await geoService.getCitySuggestions(city);
				setSuggestions(cities);
			}
		};

		fetchCitySuggestions();
	}, [city, geoService, isCitySelected]);

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
							value={city}
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
