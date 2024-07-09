import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../../../components'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { changeUserDetail } from '../../../../api/auth'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useAuth } from '../../../../hooks/auth'
import Image from 'next/image'
import { BACKEND_URL } from '@/constants'

function ChangeUserDetail() {

    const { user: { email, name, phone, profile_image }, getUserDetails } = useAuth()
    const [user, setUser] = useState<any>({
        name: '',
        email: '',
        // phone: ''
    })
    const [errors, setErrors] = useState<any>([])
    useEffect(() => {
        getUserDetails()
        setUser((prev: any) => ({
            ...prev, name, email,
            // phone
        }))
    }, [email, name, phone])
    const { mutate, isLoading }: any = useMutation(changeUserDetail, {
        onError: (err: any) => {
            const { status, data } = err.response
            if (status === 422) {
                setErrors(data)
            }
        },
        onSuccess: () => {
            getUserDetails()
        }
    })

    const handleInputChange = (e: any) => {
        let { name, value, files } = e.target;
        if (name == 'profile_image') {
            setUser((prev: any) => ({
                ...prev, [name]: files[0],
            }));
        } else {
            setUser((prev: any) => ({
                ...prev, [name]: value,
            }));
        }

    };

    return (
        <div className='space-y-2'>
            <div>
                <div className="text-sm font-semibold">User/Company Name</div>
                <div className="relative w-full items-center">
                    <Input
                        name='name'
                        value={user?.name}
                        type='text'
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text-red-500 text-sm">{errors?.name}</div>
            </div>
            <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="relative w-full items-center">
                    <Input
                        name='email'
                        value={user?.email}
                        type='text'
                    />
                </div>
                <div className="text-red-500 text-sm">{errors?.email}</div>
            </div>
            {/* <div>
                <div className="text-sm font-semibold">Contact Number</div>
                <div className="relative w-full items-center">
                    <Input
                        name='phone'
                        value={user?.phone}
                        type='text'
                        onChange={handleInputChange}
                    />

                </div>
                <div className="text-red-500 text-sm">{errors?.phone}</div>
            </div> */}

            <div>
                <div className="text-sm font-semibold">Profile Image</div>
                <div className="relative w-full items-center space-y-2">
                    <Image
                        className='object-contain'
                        src={`${BACKEND_URL}/storage/profile_image/${profile_image}`}
                        height={200} width={200}
                        alt='Profile Image' />
                    <Input
                        name='profile_image'
                        // value={user?.profile_image}
                        type='file'
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text-red-500 text-sm">{errors?.phone}</div>
            </div>
            <Button buttonType='' label='Update' loading={isLoading} className='w-full' onClick={() => mutate(user)} />
        </div>
    )
}

export default ChangeUserDetail