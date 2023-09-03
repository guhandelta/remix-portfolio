import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from "remix-themes";
import stylesheet from "~/tailwind.css";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { themeSessionResolver } from "./utils/session.server";

/*Remix has 2 types of funcitons - Loaders & Actions
Loaders are to get data(GET) || Actions are to manipulate data(POST, PUT, PATCH, DELETE)
*/

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

// Fetch the theme from the session storage using a loader fn()
export async function loader({ request }: LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return { 
    theme: getTheme()
  };
}

// Supplying the theme to the App using the ThemeProvider
export default function AppWithProvider(){
  const { theme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider 
      specifiedTheme={theme} 
      themeAction="/action/set-theme"
    > 
      <App />
    </ThemeProvider>
  )
}

function App() {
  const { theme } = useLoaderData<typeof loader>();
  const [ themeX ] = useTheme();
  return (
    <html lang="en" data-theme={themeX ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>
      <body>
        <h1>Remix Personal Website</h1>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
