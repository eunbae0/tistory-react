import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { renderToString } from "react-dom/server";

// const html = renderToString(<App />);
// console.log(html);
const rootEl = document.getElementById("root");

if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}
