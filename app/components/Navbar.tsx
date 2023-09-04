import React from 'react'
import { Disclosure } from "@headlessui/react"
import { Link, NavLink } from "@remix-run/react"
import { Theme, useTheme } from 'remix-themes'
import { NavbarLinks } from './_const'



const ThemeToggler = ({ theme, setTheme, prev }) => (
    <button 
        className='mr-4'
        onClick={() => 
            setTheme(
                prev => prev === Theme.DARK 
                ? Theme.LIGHT : Theme.DARK
            )
        }   
    >
        {theme === Theme.DARK ? (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6 text-gray-500"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        ) : (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>

        )}
    </button>
)

const Navbar = () => {

    const [ theme, setTheme ] = useTheme();

  return (
    
    <Disclosure as="nav">
    {/*Disclosures are built using the Disclosure, Disclosure.Button and Disclosure.Panel components.

        The button will automatically open/close the panel when clicked, and all components will receive the appropriate aria-* related attributes like aria-expanded and aria-controls. */}

        {/* Get the state when the NavBar is open */}
        {({open}) => (
            <>
                <div className="sticky top-0 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between w-full">
                            <div className="flex items-center">
                                <Link to="/">
                                    <h1 className="text-2xl font-medium">
                                        Guhan
                                        <span className="text-teal-500">
                                            Blog
                                        </span>
                                    </h1>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {/* Just like Link, Remix also has NavLink, which gives the active/inactive state, with which appropriate styling or any other functionalities may be provided */}
                                {NavbarLinks.map(({ sno, name, link }) => (
                                     <NavLink 
                                        className={({ isActive }) => isActive ? 'border-teal-500 dark:bg-gray-900 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
                                        to={link} 
                                        key={sno}
                                    >
                                        {name}
                                    </NavLink>
                                ))}
                                <ThemeToggler 
                                    theme={theme} 
                                    setTheme={setTheme} 
                                    prev={theme}
                                />
                            </div>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <ThemeToggler 
                                theme={theme} 
                                setTheme={setTheme} 
                                prev={theme}
                            />
                            {/* Disclosure.Button is the button that will open/close the panel */}
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                                {open ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>

                                )}
                            </Disclosure.Button>
                        </div>
                    </div>
                </div>
                {/* Disclosure.Panel is the panel that will be shown/hidden */}
                <Disclosure.Panel className="sm:hidden">
                    <div className="sticky top-0 z-30 pt-2 pb-3 space-y-1">                     
                        {NavbarLinks.map(({ sno, name, link }) => (
                            <NavLink
                                className={({ isActive }) => isActive ? 'bg-teal-50 dark:bg-gray-800 text-teal-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 border-teal-500 dark:border-teal-500 text-base font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium'}
                                to={link} 
                                key={sno}
                            >
                                {name}
                            </NavLink>
                        ))}
                        
                    </div>
                </Disclosure.Panel>
            </>
        )}
    </Disclosure>
  )
}

export default Navbar