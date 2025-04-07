import { FC } from "react";

import { CitySuggestion } from "../types/geo";

import { ItemLayout } from "./ItemLayout";

type Props = {
	suggestions: CitySuggestion[];
	chooseCity: (city: CitySuggestion) => void;
};

export const SuggestionsList: FC<Props> = ({ suggestions, chooseCity }) => {
	return (
		<ItemLayout className="!absolute top-[64px] left-0 w-full z-50">
			<ul className="flex flex-col gap-2">
				{suggestions.map((sugCity, index) => (
					<li
						className="p-1 cursor-pointer opacity-50 hover:opacity-100"
						key={`${sugCity.name}_${index}`}
						onClick={() => chooseCity(sugCity)}
					>
						{sugCity.name}, {sugCity.country}
					</li>
				))}
			</ul>
		</ItemLayout>
	);
};
