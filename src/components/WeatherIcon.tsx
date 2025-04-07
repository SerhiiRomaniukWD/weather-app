import React from "react";

interface WeatherIconProps {
	icon: string;
	description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, description }) => {
	const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	return <img src={iconUrl} alt={description} />;
};

export default WeatherIcon;
