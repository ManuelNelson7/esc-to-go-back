import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    if (!user) return null;


    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7 dark:bg-darkv'>
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white dark:bg-darkgray border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className='ml-1 dark:invert' />
                <input
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search'
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className='p-2 w-full bg-white outline-none dark:bg-darkgray dark:text-white'
                />
            </div>
            <div className='flex gap-8 items-center'>
                <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                    <img src={user.image} alt="profile picture" className='rounded-full w-12' />
                </Link>

                <Link to='create-pin' className='bg-gold text-white rounded-full w-10 h-10  md:w-12 md:h-11 flex justify-center items-center'>
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
