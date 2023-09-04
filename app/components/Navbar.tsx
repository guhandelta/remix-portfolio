import React from 'react'
import { Disclosure } from "@headlessui/react"
import { Link, NavLink } from "@remix-run/react"
import { Theme, useTheme } from 'remix-themes'

const Navbar = () => {

    const [ theme, setTheme ] = useTheme();

  return (
    
    <Disclosure as="nav">
    {/*Disclosures are built using the Disclosure, Disclosure.Button and Disclosure.Panel components.

        The button will automatically open/close the panel when clicked, and all components will receive the appropriate aria-* related attributes like aria-expanded and aria-controls. */}

        {/* Get the state when the NavBar is open */}
        {({open}) => (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => isActive ? 'border-teal-500 dark:bg-gray-900 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => isActive ? 'border-teal-500 dark:bg-gray-900 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
                                to="/blob" 
                            >
                                Blog
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => isActive ? 'border-teal-500 dark:bg-gray-900 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
                                to="/experience" 
                            >
                                Experience
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => isActive ? 'border-teal-500 dark:bg-gray-900 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
                                to="/projects" 
                            >
                                Projects
                            </NavLink>
                            <button 
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
                        </div>
                    </div>
                </div>
            </div>
        )}
    </Disclosure>
  )
}

export default Navbar