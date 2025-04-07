export interface WeatherData {
	temperature: number;
	pressure: number;
	humidity: number;
	weather: {
		description: string;
		icon: string;
	}[];
	name: string;
}
