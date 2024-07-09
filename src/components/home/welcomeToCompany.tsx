import Image from 'next/image'
import React from 'react'
import RightSlidingBox from '../box/rightSlidingBox'
import UpSlidingBox from '../box/upSlidingBox'
import { nunitoSans, playFair, poppins } from '@/fonts'

function WelcomeToCompany() {
    return (
        <div className="mb-16">
            <div className="container mx-auto">
                <div className="flex flex-col px-4 md:px-6 md:grid md:grid-cols-3 gap-2  md:gap-4 lg:gap-8 ">
                    <div className=" col-span-1">
                        <RightSlidingBox duration="0.8">
                            <Image className="w-full md:h-96 md:w-96 object-cover"
                                alt="Separate"
                                src="/assets/mission_image.jpg" width={400} height={600} />
                        </RightSlidingBox>
                    </div>
                    <div className="col-span-2">
                        <UpSlidingBox duration="1.0">
                            <div className="flex pl-2 mb-2">
                                <div className="border rotate-90 border-primary"></div>
                                <h1 className={`pl-6 text-primary ${nunitoSans.className} font-semibold text-lg`}>Mission</h1>
                            </div>
                        </UpSlidingBox>
                        <UpSlidingBox duration="1.2">
                            <h2 id="slide-left" className={`${playFair.className} text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-6`}>Your Trusted Partner In BookKeeping</h2>
                        </UpSlidingBox>
                        <p className={`text-gray-light leading-7 ${poppins.className} mb-8`}>
                            To provide unparalleled peace of mind to our clients through precise accounting practices,
                            comprehensive tax and BAS services, and unwavering commitment to legal compliance. We
                            strive to be the trusted partner for businesses, ensuring timely and accurate financial
                            management, enabling our clients to focus on their core operations with confidence.
                        </p>
                        {/* <p className={`text-gray-light leading-7 ${poppins.className} mb-8`}>
                            At Java Energy Solutions, we go beyond installation, offering tailored solutions that align with your energy needs and environmental goals. Join us in embracing a sustainable lifestyle while enjoying cost savings. Power up with Java Energy Solutions - illuminating a brighter, cleaner tomorrow.
                        </p> */}
                        {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="">
                                <Image className=""
                                    alt="Separate"
                                    src="/working-image.png" width={100} height={100} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className='text-xl'>Ravinder Kumar</h3>
                                <p className='text-gray-light leading-7'>Director</p>
                                <p className='text-gray-light leading-7'>XL Accounting Pty Ltd</p>
                            </div>
                            <div className="">  
                                <Image className=""
                                    alt="Separate"
                                    src="/working-image.png" width={100} height={100} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WelcomeToCompany