import { FC, FormEvent, useState } from "react";

import { ItemLayout } from "./ItemLayout";
import { SubmitBtn } from "./SubmitBtn";

import LocationIcon from "@icons/location.svg";

export const SearchBar: FC = () => {
	const [city, setCity] = useState("");

	const isActive = city.length > 0;

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		setCity(e.currentTarget.value);
	};

	return (
		<ItemLayout>
			<form className="flex justify-between gap-4">
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
	);
};
