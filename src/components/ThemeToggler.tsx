import { FC, useState } from "react";

import SunIcon from "@icons/sun.svg";
import MoonIcon from "@icons/moon.svg";

export const ThemeToggler: FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prevState) => !prevState);
		document.documentElement.classList.toggle("dark");
	};

	return (
		<button className="cursor-pointer p-1" onClick={toggleTheme} type="button">
			{isDarkMode ? <MoonIcon /> : <SunIcon />}
		</button>
	);
};
