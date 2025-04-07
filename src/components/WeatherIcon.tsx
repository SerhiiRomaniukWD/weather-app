import React from "react";

interface WeatherIconProps {
	icon: string;
	description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, description }) => {
	const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	return (
		<div className="p-4 md:p-6 lg:p-10">
			<img src={iconUrl} alt={description} />
		</div>
	);
};

export default WeatherIcon;
