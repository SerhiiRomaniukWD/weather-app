import { FC } from "react";

import { WeatherData } from "../types/weather";

import WindIcon from "@icons/wind.svg";
import RainIcon from "@icons/rain.svg";
import HumidityIcon from "@icons/humidity.svg";

import { ItemLayout } from "./ItemLayout";
import WeatherIcon from "./WeatherIcon";

type Props = {
	weather: WeatherData;
};

const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric",
	};
	return date.toLocaleDateString("en-UK", options);
};

export const WeatherItem: FC<Props> = ({ weather }) => {
	const main = weather.weather[0];
	const date = formatDate(weather.dt);

	return (
		<div className="flex flex-col gap-4">
			<ItemLayout className="flex justify-between px-8 items-center">
				<div className="">
					<div className="mb-1 text-[12px]">{date}</div>
					<div className="mb-2 text-[16px] font-medium">{main.main}</div>
					<div className="text-[40px] font-medium">
						{Math.round(weather.main.temp)}°C
					</div>
				</div>

				<WeatherIcon icon={main.icon} description={main.description} />
			</ItemLayout>

			<ItemLayout className="flex justify-between px-8 py-5">
				<div className="flex flex-col gap-2 items-center">
					<WindIcon />

					<div>{weather.wind.speed} m/s</div>

					<p className="text-[12px]">Wind</p>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<HumidityIcon />

					<div>{weather.main.humidity}%</div>

					<p className="text-[12px]">Humidity</p>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<RainIcon />

					<div>{weather.rain?.["1h"] || "0"}%</div>

					<p className="text-[12px]">Rain</p>
				</div>
			</ItemLayout>
		</div>
	);
};
