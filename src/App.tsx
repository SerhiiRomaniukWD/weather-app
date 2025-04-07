import { Header } from "./components/Header";
import { MainLayout } from "./components/MainLayout";
import { SearchBar } from "./components/SearchBar";
import { WeatherGuard } from "./components/WeatherGuard";

function App() {
	return (
		<MainLayout>
			<Header />

			<SearchBar />

			<WeatherGuard />
		</MainLayout>
	);
}

export default App;
