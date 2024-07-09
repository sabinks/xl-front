"use client"
import { Dialog } from '@headlessui/react';
import React, { useContext, useState } from 'react'
import { BiCross, BiUser } from 'react-icons/bi';
import { FaBars, FaCross, FaFacebookF, FaInstagram, FaMobile, FaPhone, FaYoutube } from 'react-icons/fa';
import { FaLocationPin, FaMessage, FaTwitter, FaXmark } from 'react-icons/fa6';
import { BsMarkdown } from 'react-icons/bs';
import Link from 'next/link';
import { montserrat, montserratRegular } from '@/fonts';
import { APP_NAME, BASE_URL } from '@/constants';
import { UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { setCookie } from 'cookies-next';
import { usePathname } from 'next/navigation'
import { useAuth } from '../../hooks/auth';
import { logout } from '../../api/auth';
import { classNames } from '@/utils';
function Header() {
    const { isAuthenticated, signout, setIsAuthenticated, setAccessToken } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Book Appointment', href: '/book-appointment' },
        { name: 'Contact Us', href: '/contact-us' },
    ]
    const { mutate } = useMutation<any, Error>(logout,
        {
            onSuccess: () => {
                signout(() => {
                    router.push(router.asPath)
                });
            },
            onError: (err: any) => {
                console.log("logout Error: ", err);
            },
        }
    );
    const handleLogout = () => {
        setAccessToken('')
        setIsAuthenticated(false)
        setCookie('role', '')
        setCookie('token', '')
        // router.reload()
    }
    return (
        <div>
            <nav className="flex md:hidden items-center justify-between px-2 py-0 lg:px-8" aria-label="Global">
                <div className="flex items-center gap-x-2 lg:flex-1 pb-2">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">{APP_NAME}</span>
                        <Image
                            className="h-12 w-auto"
                            src="/assets/logo_small.png"
                            alt=""
                            width="100"
                            height="100"
                        />
                    </a>
                    {/* <p className='text-sm font-semibold text-[#57237E]'>Platform To Post Anything</p> */}
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <FaBars className="h-5 w-5 md:h-6 md:w-6 text-secondary" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </Link>
                    ))}

                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        {/* <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a> */}
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <FaXmark className="text-secondary" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e: any) => setMobileMenuOpen(false)}
                                        className="-mx-3 block px-3 py-2 tracking-wide texxt text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {
                                    !isAuthenticated ?
                                        <>
                                            <Link href="/login" className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300">Login</Link>
                                            {/* <Link href="/register" className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300">Register</Link> */}
                                        </>
                                        :
                                        <>
                                            <Link href="/auth/dashboard" className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300">Dashboard</Link>
                                            <span className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300" onClick={() => handleLogout()}>Logout</span>
                                        </>
                                }
                            </div>
                            {/* <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div> */}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
            <div className="flex bg-primary pt-1">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col justify-start md:flex-row md:space-x-4 divide-white text-white text-xs md:text-sm">
                            {/* <Link className='flex items-center pl-2 hover:cursor-pointer hover:text-secondary transition duration-500' href="https://www.facebook.com/people/Ad-Zoner/61556479892859"><FaFacebookF className=" hover:text-[#316FF6] transition duration-300 cursor-pointer" /></Link> */}
                            {/* <div className="pl-4"><FaTwitter className=" hover:text-[#1DA1F2] transition duration-300 cursor-pointer" /></div> */}
                            {/* <div className="pl-4"><FaInstagram className=" hover:text-pink-600 transition duration-300 cursor-pointer" /></div>
                            <div className="pl-4"><FaYoutube className=" hover:text-[#CD201F] transition duration-300 cursor-pointer" /> </div> */}
                            {/* <div className="flex items-center pl-2 text-sm md:text-lg hover:cursor-pointer hover:text-secondary transition duration-500"><FaMobile /><a href={`tel:${country == "Nepal" ? "+977 9861168333" : " + 61 402 941 594"}`} className='pl-2'> {country == "Nepal" ? "+977 9861168333" : " + 61 402 941 594"}</a></div> */}
                            {/* <div className="flex items-center pl-2 text-sm md:text-lg hover:cursor-pointer hover:text-secondary transition duration-500"><FaMessage /><a href="mailto:info@adzoner.com" className='pl-2'>info@adzoner.com</a></div> */}
                        </div>

                        {/* <div className="flex flex-row items-center gap-x-4 pb-1">
                            <Link href={isAuthenticated ? "/auth/advertisements?new=true" : "/register"} className="flex text-sm md:text-base relative px-3 md:px-5 py-1 md:py-2 font-medium text-white group">
                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                                <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                                <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                                <span className="relative">Post Advertisement</span>
                            </Link>
                            <p className='text-xs rounded-md px-2 bg-red-200 text-accent1 tracking-wide animate-pulse'>Beta Version</p>
                        </div> */}
                        <div className={`flex md:space-x-2 text-sm text-white`}>

                            {/* <div className="flex items-center pl-2 hover:cursor-pointer hover:text-gray-dark transition duration-500"><FaLocationPin /><span className='pl-2'> 1234 Elm Street</span></div> */}
                            <div className="hidden md:flex items-center pl-2 hover:cursor-pointer transition duration-500">
                                {isAuthenticated &&
                                    <div className="px-4 py-1 rounded-xl w-max  place-self-end hover:text-secondary hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500">
                                        <Link href="/auth/dashboard">
                                            <div className="flex space-x-2">
                                                <span>Dashboard</span>
                                            </div>
                                        </Link>
                                    </div>
                                }
                                {
                                    isAuthenticated ?
                                        <span className="px-4 py-1 rounded-xl w-max place-self-en hover:text-secondary hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" onClick={() => handleLogout()}>Logout</span>
                                        :
                                        <span className='pl-2'>
                                            <div className="flex space-x-2 px-4 py-1 rounded-xl w-max place-self-en hover:text-secondary hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500"
                                                onClick={() => {
                                                    sessionStorage.setItem("path", "/")
                                                    router.push("/login")
                                                }} >
                                                <UserIcon className="w-4" />
                                                <span>Login</span>
                                            </div>
                                        </span>
                                }
                                {/* {
                                    !isAuthenticated &&
                                    <Link href="/register">
                                        <div className="flex space-x-2 px-4 py-1 rounded-xl w-max place-self-end hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" >
                                            <UserIcon className="w-4" />
                                            <span>Sign Up</span>
                                        </div>
                                    </Link>
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" hidden md:flex py-0.5">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center ">
                        <div className="flex flex-col gap-x-2 pb-2">
                            <div className="flex flex-col lg:flex-row lg:items-center">
                                <Link href="/">
                                    <Image
                                        className="h-12 w-auto"
                                        src="/assets/logo_small.png"
                                        alt=""
                                        width="100"
                                        height="100"
                                    />
                                </Link>
                                <h1 className={`text-secondary tracking-wider font-semibold text-4xl pl-2 lg:pt-4 ${montserrat.className}`}>{APP_NAME}</h1>
                            </div>
                            {/* <p className='text-xs font-semibold text-[#57237E]'>Platform To Post Anything</p> */}
                        </div>
                        <div className={`flex items-center space-x-1 text-gray-dark ${montserratRegular.className}`}>
                            {
                                navigation.map((link: any, index: number) => {
                                    const isActive = link.href == pathname

                                    return <Link href={link?.href} key={index}
                                        className={classNames(" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-secondary py-5 px-2 lg:px-5 transition duration-300 cursor-pointer",
                                            isActive ? "text-white bg-primary border-secondary border-t-4 transition duration-300" : "")}
                                    >{link.name}</Link>
                                })
                            }
                            {/* <Link href="/" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-secondary py-5 px-5 transition duration-300 cursor-pointer">HOME</Link> */}
                            {/* <Link href="/about-us" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-t-yellow-600 hover:outline-t-4 py-5 px-5 transition duration-200 cursor-pointer">ABOUT US</Link> */}
                            {/* <Link href="/contact-us" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-secondary hover:outline-t-4 py-5 px-5 transition duration-300 cursor-pointer">CONTACT US</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header