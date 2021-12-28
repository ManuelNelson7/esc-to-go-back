import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import Spinner from './Spinner'

const UploadBanner = ({ user }) => {
    const [fields, setFields] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageAsset, setImageAsset] = useState(null)
    const [wrongImageType, setWrongImageType] = useState(false)

    const navigate = useNavigate();

    const uploadBanner = (e) => {
        const { type, name } = e.target.files[0];

        if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
            setWrongImageType(false);
            setLoading(true);

            client.assets
                .upload('image', e.target.files[0], { contentType: type, filename: name })
                .then((document) => {
                    setImageAsset(document);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log('Image upload error', error);
                })
        } else {
            setWrongImageType(true);
        }
    }

    const saveBanner = () => {
        if (imageAsset?._id) {
            const doc = {
                _type: 'banner',
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id,
                    },
                },
                userId: user._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id,
                },
            };
            client.patch(doc).then(() => {
                navigate('/');
            })
        } else {
            setFields(true);

            setTimeout(
                () => {
                    setFields(false);
                },
                5000,
            );
        };
    }

    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>Please fill (at least) the title, image and category</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
                <h1 className='text-lg font-semibold mb-4'>You can update your banner just once, so choose well!</h1>
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 '>
                        {loading && <Spinner />}
                        {wrongImageType && <p>Wrong image type</p>}
                        {!imageAsset ? (
                            <label>
                                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='font-bold text-2xl'>
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className='text-lg'>Click to upload your banner*</p>
                                    </div>
                                    <p className='mt-32 text-gray-400'>Use hight-quality JPG, SVG, PNG or GIF less than 20MB</p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uploadBanner}
                                    className="w-0 h-0"
                                />
                            </label>
                        ) : (
                            <div className='relative h-full'>
                                <img src={imageAsset?.url} alt="uploaded pic" className='h-full w-full' />
                                <button
                                    type='button'
                                    className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>

                    <div className='flex justify-end items-end mt-5'>
                        <button
                            type='button'
                            onClick={saveBanner}
                            className='bg-gold text-white font-bold p-2 rounded-full w-28 outline-none'
                        >
                            Upload
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default UploadBanner
