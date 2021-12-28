import React, { useState, useEffect } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { Link, Route, Routes } from 'react-router-dom'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery, userBanner } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import UploadBanner from './UploadBanner'

const activeBtnStyles = 'bg-gold text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 dark:text-white text-black font-bold p-2 rounded-full w-20 outline-none'

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [banner, setBanner] = useState(null)
    const [text, setText] = useState('Created')
    const [activeBtn, setactiveBtn] = useState('created')
    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query)
            .then((data) => {
                setUser(data[0]);
            })
    }, [userId])

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId);

            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data);
                })
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId);

            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data);
                })
        }
    }, [text, userId])

    useEffect(() => {
        const bannerQuery = userBanner(userId)

        client.fetch(bannerQuery)
            .then((data) => {
                setBanner(data[0].image.asset.url);
                console.log(data[0].image.asset.url);
            })
    }, [banner, userId])

    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }

    if (!user) {
        return <Spinner message="Loading profile..." />
    }

    return (
        <div className='relative pb-2 h-full justify-center items-center'>
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className='flex flex-col justify-center items-center'>
                        <img
                            src={banner ? banner : 'https://source.unsplash.com/1600x900/?vintage'}
                            className='w-full h-370 2xl:h-420 shadow-lg object-cover'
                            alt='banner'
                        />
                        <img src={user.image}
                            className='rounded-full w-20 h-20 -mt-10 -shadow-xl object-cover'
                            alt="Profile"
                        />
                        <h1 className='font-bold text-3xl text-center mt-3 pb-1.5 dark:text-white'>{user.userName}</h1>
                        <div className="absolute top-0 z-1 right-0 p-2">
                            {userId === user._id && (
                                <GoogleLogout
                                    clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                                    render={(renderProps) => (

                                        <button
                                            type="button"
                                            className="bg-orange p-2 rounded-full cursor-pointer outline-none shadow-md"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            <AiOutlinePoweroff fontSize={21} className='invert' />
                                        </button>

                                    )}
                                    onLogoutSuccess={logout}
                                    cookiePolicy="single_host_origin"
                                />
                            )}
                        </div>
                        <div className="absolute top-11 z-1 right-0 p-2">
                            <Link to="/upload-banner">
                                <button
                                    type="button"
                                    className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                                >
                                    <MdOutlineEdit fontSize={21} />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button
                            type='button'
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setactiveBtn('created');
                            }}
                            className={`${activeBtn === `created` ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created
                        </button>

                        <button
                            type='button'
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setactiveBtn('saved');
                            }}
                            className={`${activeBtn === `saved` ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Saved
                        </button>
                    </div>

                    {pins?.length ? (
                        <div className='px-2'>
                            <MasonryLayout pins={pins} />
                        </div>
                    ) : (
                        <div className='flex justify-center text-orange font-bold items-center w-full text-xl mt-2'>
                            No pins found!
                        </div>
                    )}

                </div>
            </div>
            <Routes>
                <Route path='/upload-banner' element={<UploadBanner />} />
            </Routes>
        </div>

    )
}

export default UserProfile
