import { Header } from "./components/Header";
import { MainLayout } from "./components/MainLayout";
import { SearchBar } from "./components/SearchBar";
import { WeatherItem } from "./components/WeatherItem";

function App() {
	return (
		<MainLayout>
			<Header />

			<SearchBar />

			<WeatherItem />
		</MainLayout>
	);
}

export default App;
