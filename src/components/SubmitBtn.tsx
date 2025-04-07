import { FC } from "react";

import ArrowRightIcon from "@icons/arrow-right.svg";

type Props = {
	isActive: boolean;
};

export const SubmitBtn: FC<Props> = ({ isActive }) => {
	return (
		<button
			type="submit"
			className={`cursor-pointer p-1 border-2 border-solid rounded-sm opacity-50 ${isActive ? "opacity-100" : "!cursor-default"}`}
			disabled={!isActive}
		>
			<ArrowRightIcon />
		</button>
	);
};
