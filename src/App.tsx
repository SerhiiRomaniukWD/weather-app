import { Header } from "./components/Header";
import { MainLayout } from "./components/MainLayout";
import { SearchBar } from "./components/SearchBar";

function App() {
	return (
		<MainLayout>
			<Header />

			<SearchBar />
		</MainLayout>
	);
}

export default App;
