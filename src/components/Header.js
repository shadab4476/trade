import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    return (
        <>

            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center w-[10%]">
                            <Link to="/" className=" w-full flex items-center">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                            </Link>
                        </div>
                        <div className="w-[70%] justify-between items-center flex " >
                            <ul className="flex  mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link className={`capitalize ${location.pathname == '/index' || location.pathname == '/' ? "text-red-500" : ""} `} to="/index">
                                        index
                                    </Link>

                                </li>
                                <li>
                                    <Link className={`capitalize ${location.pathname == '/add' ? "text-red-500" : ""} `} to="/add">
                                        add
                                    </Link>

                                </li>
                                <li>
                                    <Link to="/edit" className={`capitalize ${location.pathname == '/edit' ? "text-red-500" : ""} `}  >
                                        edit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header >
        </>
    )
}
export default Header;