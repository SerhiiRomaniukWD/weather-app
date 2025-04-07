import { FC } from "react";

import { ItemLayout } from "./ItemLayout";

export const SearchBar: FC = () => {
	return (
		<ItemLayout>
			<form>
				<input type="text" placeholder="City..." />
			</form>
		</ItemLayout>
	);
};
