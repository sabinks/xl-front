import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'

function Footer() {
    return (
        <div className='bg-primary'>
            <div className="container mx-auto pt-4 md:pt-8 pb-2">
                <div className="flex flex-col items-center">
                    <div className="flex space-x-6 text-white">
                        {/* <Link href="https://www.facebook.com/people/Ad-Zoner/61556479892859" className="rounded-full p-2"><FaFacebookF /></Link> */}
                        {/* <Link href="" className="rounded-full p-2"><FaTwitter /></Link>
                        <Link href="" className="rounded-full p-2"><FaInstagram /></Link>
                        <Link href="" className="rounded-full p-2"><FaYoutube /></Link> */}
                    </div>
                    <div className="flex flex-col md:flex-row items-center space-x-4 text-white py-2 md:py-4">
                        {/* <Link href="/about-us" className='text-sm border-b-[1px] border-dotted'>About Us</Link>
                        <p className='text-xs opacity-50'>/</p> */}
                        <Link href="/" className="text-sm border-b-[1px] border-dotted hover:text-secondary transition duration-300">Home</Link>
                        <Link href="/services" className="text-sm border-b-[1px] border-dotted hover:text-secondary transition duration-300">Services</Link>
                        <Link href="/book-appointment" className="text-sm border-b-[1px] border-dotted hover:text-secondary transition duration-300">Book Appointment</Link>
                        <Link href="/contact-us" className="text-sm border-b-[1px] border-dotted hover:text-secondary transition duration-300">Contact Us</Link>
                    </div>
                    <div className="text-white text-center text-sm tracking-wider">
                        Copyright © 2024 XL Accounting . All rights reserved.
                    </div>
                    <div className="text-secondary text-center text-xs tracking-wider pt-4">
                        <span className='pr-1'>Developed by:</span>
                        <a href="https://neptekasolutions.com" target="_blank" rel="noopener noreferrer" className='hover:text-white transition duration-300 underline'>Nepteka Solutions Pvt. Ltd.</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer