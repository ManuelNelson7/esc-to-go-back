import React, {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { categories } from '../utils/data'
import { MdNightlight, MdWbSunny } from 'react-icons/md'

import logo from '../assets/logo.png'
import useTheme from '../hooks/useTheme'

const isNonActiveStyle = 'flex dark:text-db items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center dark:text-white px-5 gap-3 font-extrabold border-r-2 border-black dark:border-white transition-all duration-200 ease-in-out capitalize'


const Sidebar = ({ user, closeToggle }) => {
    const [dark, setDark] = useState(false)
    const [nextTheme, setTheme] = useTheme()

    const handleCloseSideBar = () => {
        if (closeToggle) closeToggle(false);
    }

    return (
        <div className='flex flex-col justify-between bg-white dark:bg-darkv h-full  min-w-210 hide-scrollbar'>
            <div className="flex flex-col">
                <Link
                    to="/"
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSideBar}
                >
                    <img src={nextTheme ==='dark' ? '/img/logo.png' : '/img/logo-white.png' } alt="logo" className='w-full' />
                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? isActiveStyle : isNonActiveStyle}
                        onClick={handleCloseSideBar}
                    >
                        <AiFillHome className='dark:db'/>
                        Home
                    </NavLink>
                    <h3 className='mt-2 px-5 text-base 2xl:text-xl dark:text-white'>Discover categories</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNonActiveStyle}
                            onClick={handleCloseSideBar}
                            key={category.name}
                        >
                            <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt={category.name} />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className='flex justify-center gap-4'>
                <MdWbSunny fontSize={28} className='dark:invert' />
                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                
                    <input onClick={() => setTheme(nextTheme)} type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <MdNightlight fontSize={28} className='dark:invert'/>
            </div>

            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 dark:bg-darkgray"
                    onClick={handleCloseSideBar}
                >
                    <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                    <p className='dark:text-white'>{user.userName}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar
