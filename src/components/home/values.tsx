import { nunitoSans, playFair, poppins, ptSans } from '@/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UpSlidingBox from '../box/upSlidingBox'

function Values() {
    return (
        <div className="bg-dot-bg bg-repeat">
            <div className="container mx-auto py-16">
                <div className="mb-12 px-4 md:px-0">
                    <div className="flex justify-center pl-2 mb-2">
                        <div className="border rotate-90 border-primary"></div>
                        <h1 className={`pl-6 text-primary ${nunitoSans.className} font-semibold text-lg`}>Values
                        </h1>
                    </div>
                    <h2 className={`${playFair.className} text-5xl lg:text-7xl font-extrabold mb-6 text-white text-center`}>Client centricity is our core</h2>
                    <p className={`text-white leading-7 ${poppins.className} mb-8 text-center`}>
                        We focuses on client needs keeping the following values in mind and serving clients.
                    </p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-5 md:gap-x-4 gap-y-4 px-4">
                    <UpSlidingBox duration="0.8" distance={90}>
                        <div className="flex flex-col items-center bg-white py-4 px-2 rounded-md shadow-md h-80 md:h-72 xl:h-[480px] 2xl:h-96">
                            <Image className="w-20 h-20 md:h-16 md:w-16 object-cover mb-8"
                                alt="Separate"
                                src="/assets/values/integrity.png" width={600} height={600} />
                            <h1 className={`font-bold text-3xl pb-8 text-center`}>Integrity</h1>
                            <p className={`font-bold md:text-xl lg:text-lg text-gray-dark text-center leading-6 ${ptSans.className}`}>
                                Upholding the highest ethical standards in all our dealings, maintaining honesty,
                                transparency, and trustworthiness in every interaction with clients, colleagues, and
                                stakeholders.
                            </p>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.0" distance={90}>
                        <div className="flex flex-col items-center bg-white py-4 px-2 rounded-md shadow-md h-80 md:h-72 xl:h-[480px] 2xl:h-96">
                            <Image className="w-20 h-20 md:h-16 md:w-16 object-cover mb-8"
                                alt="Separate"
                                src="/assets/values/excellence.png" width={600} height={600} />
                            <h1 className={`font-bold text-3xl pb-8 text-center`}>Excellence</h1>
                            <p className={`font-bold md:text-xl lg:text-lg text-gray-dark text-center leading-6 ${ptSans.className}`}>
                                Pursuing excellence in all aspects of our work, striving for accuracy, efficiency,
                                and continuous improvement to deliver exceptional results and exceed client expectations.
                            </p>
                        </div>
                    </UpSlidingBox>

                    <UpSlidingBox duration="1.2" distance={90}>
                        <div className="flex flex-col items-center bg-white py-4 px-2 rounded-md shadow-md h-80 md:h-72 xl:h-[480px] 2xl:h-96">
                            <Image className="w-20 h-20 md:h-16 md:w-16 object-cover mb-8"
                                alt="Separate"
                                src="/assets/values/collaboration.png" width={600} height={600} />
                            <h1 className={`font-bold text-3xl pb-8 text-center`}>Collaboration</h1>
                            <p className={`font-bold md:text-xl lg:text-lg text-gray-dark text-center leading-6 ${ptSans.className}`}>
                                Fostering a culture of collaboration and teamwork, where diverse
                                perspectives are valued, and collective efforts drive innovation, creativity, and success.
                            </p>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.4" distance={90}>
                        <div className="flex flex-col items-center bg-white py-4 px-2 rounded-md shadow-md h-80 md:h-72 xl:h-[480px] 2xl:h-96">
                            <Image className="w-20 h-20 md:h-16 md:w-16 object-cover mb-8"
                                alt="Separate"
                                src="/assets/values/client-centric.png" width={600} height={600} />
                            <h1 className={`font-bold text-3xl pb-8 text-center`}>Client-Centricity</h1>
                            <p className={`font-bold md:text-xl lg:text-lg text-gray-dark text-center leading-6 ${ptSans.className}`}>
                                Placing the needs and satisfaction of our clients at the forefront of
                                everything we do, providing personalised solutions, attentive service, and proactive support
                                to ensure their success and peace of mind.
                            </p>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.6" distance={90}>
                        <div className="flex flex-col items-center bg-white py-4 px-2 rounded-md shadow-md h-80 md:h-72 xl:h-[480px] 2xl:h-96">
                            <Image className="w-20 h-20 md:h-16 md:w-16 object-cover mb-8"
                                alt="Separate"
                                src="/assets/values/growth_oriented.jpg" width={600} height={600} />
                            <h1 className={`font-bold text-3xl pb-8 text-center`}>Growth-Oriented</h1>
                            <p className={`font-bold md:text-xl lg:text-lg text-gray-dark text-center leading-6 ${ptSans.className}`}>
                                Embracing a growth mindset, both for our clients and ourselves, by
                                continuously seeking opportunities for learning, development, and advancement to drive
                                mutual growth and prosperity.
                            </p>
                        </div>
                    </UpSlidingBox>
                </div>
            </div>
        </div>
    )
}

export default Values