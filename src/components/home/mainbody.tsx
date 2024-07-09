import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RightSlidingBox from '../box/rightSlidingBox'
import UpSlidingBox from '../box/upSlidingBox'
import { nunitoSans, playFair, poppins } from '@/fonts'
import LeftSlidingBox from '../box/leftSlidingBox'
function MainBody() {
    return (
        <div className="lg:bg-banner-bg mb-16">
            <div className="container mx-auto">
                <div className="flex flex-col-reverse items-center md:grid md:grid-cols-2 px-4 gap-4 md:px-6 md:gap-24 lg:gap-12 md:py-24">
                    <div className="flex flex-col px-4 md:px-0">
                        <RightSlidingBox duration="0.4" >
                            <div id="slide-right" className="flex pl-2 mb-2">
                                <div className="border rotate-90 border-primary"></div>
                                <h1 className={`pl-6 text-primary ${nunitoSans.className} font-bold md:font-semibold text-lg`}>Vision</h1>
                            </div>
                        </RightSlidingBox>
                        <RightSlidingBox duration="0.8">
                            <h2 className={`${playFair.className} text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-6 uppercase`}>A Solution To Your Bookkeeping</h2>
                        </RightSlidingBox>
                        <RightSlidingBox duration="1.1">
                            <p className={`text-gray-light leading-7 ${poppins.className} mb-8`}>
                                To be the trusted partner in financial prosperity, guiding businesses towards sustained growth
                                and success through meticulous accounting services, proactive tax services, and steadfast
                                adherence to legal compliance. We envision a future where businesses thrive, supported by our
                                expertise and dedication to their financial well-being.
                            </p>
                        </RightSlidingBox>
                        <RightSlidingBox duration="1.3">
                            <Link href="/contact-us" className={` w-40 text-center bg-primary text-black py-4 px-6 font-medium hover:text-white hover:bg-gray-dark transition duration-500`}>
                                Contact Us</Link>
                        </RightSlidingBox>
                    </div>
                    <LeftSlidingBox duration="1.1">
                        <Image className="h-96 w-96 md:h-[480px] md:w-[480px]"
                            alt="Separate"
                            src="/assets/bookkeeping_big.png" width={1000} height={1000} />
                    </LeftSlidingBox>
                </div>
            </div>
        </div >
    )
}

export default MainBody