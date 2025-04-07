import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

const root = resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), svgr()],
	resolve: {
		alias: {
			// ROOT
			"@": resolve(root, "../"),
			// ASSETS
			"@icons": resolve(root, "assets/icons"),
		} as AliasOptions,
	},
});
