import { FC } from "react";
import { ThemeToggler } from "./ThemeToggler";

export const Header: FC = () => {
	return (
		<header className="mb-8 flex justify-between items-center">
			<h1 className="font-semibold text-3xl font-rubik">WEATHER-APP</h1>

			<ThemeToggler />
		</header>
	);
};
