import { Hono } from "hono";
import { renderToReadableStream } from "react-server-dom-webpack/server.browser";
import { Suspense } from "react";
//
const app = new Hono();

const App = () => (
  <Suspense fallback={<div>Loading 3 sec...</div>}>
    <div>Hello</div>
  </Suspense>
);
/*
*/
//
app.get('/', async (c) => {
	return c.html(`
	<!DOCTYPE html>
	<html>
	<head>
		<title>React Server Components from Scratch</title>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body>
		<div id="root"></div>
    <script src="/static/rsc.js"></script>
	</body>
	</html>
	`);
});
/*
*/
app.get("/rsc", async (c) => {
  const stream = await renderToReadableStream(<App />);
//console.log(stream);
  return new Response(stream);
});

export default app;
