import { FC, FormEvent, useEffect, useMemo, useState } from "react";

import { GeoService } from "@services/GeoService";
import { CitySuggestion } from "@types/geo";

import { ItemLayout } from "./ItemLayout";
import { SubmitBtn } from "./SubmitBtn";

import LocationIcon from "@icons/location.svg";

export const SearchBar: FC = () => {
	const [city, setCity] = useState("");
	const [suggestions, setSuggestions] = useState<CitySuggestion[]>([
		{
			name: "Lutsk",
			country: "Ukraine",
			state: "Volyn Oblast",
			lat: 50.7475,
			lon: 25.3292,
		},
		{
			name: "Lutsk",
			country: "Ukraine",
			state: "Volyn Oblast",
			lat: 50.7475,
			lon: 25.3292,
		},
	]);

	const geoService = useMemo(() => new GeoService(), []);

	const isActive = city.length > 0;

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setCity(e.currentTarget.value);
	};

	useEffect(() => {
		const fetchCitySuggestions = async () => {
			if (city.trim().length < 2) {
				setSuggestions([]);
				return;
			}

			const cities = await geoService.getCitySuggestions(city);
			setSuggestions(cities);
		};

		fetchCitySuggestions();
	}, [city, geoService]);

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
						/>
					</label>

					<SubmitBtn isActive={isActive} />
				</form>
			</ItemLayout>

			{suggestions.length > 0 && (
				<ItemLayout className="!absolute top-[64px] left-0 w-full">
					<ul className="flex flex-col gap-2">
						{suggestions.map((sugCity, index) => (
							<li key={`${sugCity.name}_${index}`}>{sugCity.name}</li>
						))}
					</ul>
				</ItemLayout>
			)}
		</div>
	);
};
