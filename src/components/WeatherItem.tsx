import { FC } from "react";

import { WeatherData } from "../types/weather";

import WindIcon from "@icons/wind.svg";
import RainIcon from "@icons/rain.svg";
import HumidityIcon from "@icons/humidity.svg";

import { ItemLayout } from "./ItemLayout";
import WeatherIcon from "./WeatherIcon";
import { TimeAgo } from "./TimeAgo";

type Props = {
	weather: WeatherData;
	date: number;
};

export const WeatherItem: FC<Props> = ({ weather, date }) => {
	const main = weather.weather[0];

	return (
		<div className="flex flex-col gap-4">
			<ItemLayout className="flex justify-between px-8 items-center">
				<div className="">
					<TimeAgo date={date} />
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
