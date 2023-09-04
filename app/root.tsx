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
import Navbar from "./components/Navbar";

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


function Layout({ children }: {children: React.ReactNode}){

  return(
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
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
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800">
        <Layout>
          <h1>Remix Personal Website</h1>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}
