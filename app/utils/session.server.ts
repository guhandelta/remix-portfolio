// *.server.js/ts => This file should only be run on the server

import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";


const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__remix-themes',
        // qwerty is just a placeholder, the Domain URL will be updated later || null can't be assigned to a typeOf string, "" is assigned
        domain: process.env.NODE_ENV !== "development" ? "qwerty" : "http://localhost:3000/",
        // / => instrcuts the cookie to apply for all routes, eg: /admin would makes ure cookie works only in /admin route
        path: '/',
        // httpOnly: true, => security purposes
        httpOnly: true,
        sameSite: 'lax',
        secrets: ["ragasiyam"],
        // Enable it only in production
        secure: process.env.NODE_ENV !== 'development' ? false : true,
    },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);