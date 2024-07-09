import { nunitoSans, playFair } from '@/fonts'
import Image from 'next/image'
import React from 'react'
import LeftSlidingBox from '../box/leftSlidingBox'

function ClientReviews() {
    return (
        <div className='bg-[#35475a]'>
            <div className="container mx-auto pt-16">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <Image className="h-full w-3/4 object-cover"
                        alt="Separate"
                        src="/people.png" width={1200} height={800} />
                    <div className="px-4 md:px-0">
                        <div className="flex pl-2 mb-2">
                            <div className="border rotate-90 border-primary"></div>
                            <h1 className={`pl-6 text-primary ${nunitoSans.className} font-semibold text-lg`}>TESTIMONIALS</h1>
                        </div>
                        <h2 className={`${playFair.className} text-5xl md:text-5xl font-extrabold mb-6`}>Our Clients Reviews</h2>
                        <LeftSlidingBox duration="1.0">
                            <div className="bg-primary text-white p-8 md:w-4/5 space-y-4">
                                <p className="italic leading-8 text-lg">
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.
                                </p>
                                <p className=''><span className='font-bold'>John Wick, </span>Founder</p>
                            </div>
                        </LeftSlidingBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientReviews