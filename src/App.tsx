import { MainLayout } from "./components/MainLayout";
import { SearchBar } from "./components/SearchBar";

function App() {
	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
	};

	return (
		<MainLayout>
			<SearchBar />

			<button type="button" className="cursor-pointer" onClick={toggleTheme}>
				Theme
			</button>
		</MainLayout>
	);
}

export default App;
