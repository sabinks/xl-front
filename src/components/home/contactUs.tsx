import { nunitoSans, playFair } from '@/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ContactUs() {
    return (
        <div className='bg-secondary'>
            <div className="container mx-auto">
                <div className="flex flex-col-reverse md:flex-row lg:justify-between items-center pt-8 xl:pt-16 px-4 md:px-0 gap-x-8">
                    <div className="lg:pl-64">
                        <div className="flex pl-2 mb-2 ">
                            <div className="border rotate-90 border-primary"></div>
                            <h1 className={`pl-8 text-primary ${nunitoSans.className} font-bold text-lg`}>CONTACT US</h1>
                        </div>
                        <h2 className={`${playFair.className} text-5xl md:text-5xl font-extrabold mb-10 text-white`}>
                            <Link href="/contact-us">Get In Touch</Link>
                        </h2>
                    </div>
                    <div className="lg:pr-64 mb-8 md:mb-0">
                        <Image className="md:h-5/6 md:w-5/6"
                            alt="Separate"
                            src="/assets/group_people.jpg" width={800} height={600} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs