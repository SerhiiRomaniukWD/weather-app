import { FC } from "react";

import { ItemLayout } from "./ItemLayout";

export const SearchBar: FC = () => {
	return (
		<ItemLayout>
			<form>
				<input
					className="font-rubik w-full outline-none text-lg"
					type="text"
					placeholder="Your location.."
				/>
			</form>
		</ItemLayout>
	);
};
