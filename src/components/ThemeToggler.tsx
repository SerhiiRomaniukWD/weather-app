import { FC, useState } from "react";

export const ThemeToggler: FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prevState) => !prevState);
		document.documentElement.classList.toggle("dark");
	};

	return (
		<button
			className="cursor-pointer p-1 border-2 border-solid rounded-sm"
			onClick={toggleTheme}
			type="button"
		>
			{isDarkMode ? "DARK" : "LIGHT"}
		</button>
	);
};
