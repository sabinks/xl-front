import { nunitoSans, playFair, poppins, ptSans } from '@/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UpSlidingBox from '../box/upSlidingBox'

function ServicesList() {
    return (
        <div className="bg-dot-bg bg-repeat">
            <div className="container mx-auto py-16">
                <div className="mb-12 px-4 md:px-0">
                    <div className="flex justify-center pl-2 mb-2">
                        <div className="border rotate-90 border-primary"></div>
                        <h1 className={`pl-6 text-primary ${nunitoSans.className} font-semibold text-lg`}>WELCOME TO COMPANY
                        </h1>
                    </div>
                    <h2 className={`${playFair.className} text-5xl md:text-7xl font-extrabold mb-6 text-white text-center`}>Our Services That We Provide</h2>
                    {/* <p className={`text-white leading-7 ${poppins.className} mb-8 text-center`}>
                        At Java Energy Solutions, we specialize in expert solar panel installations. Transform your energy landscape with our efficient solutions, ensuring a sustainable and cost-effective power source for your home or business.
                    </p> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <UpSlidingBox duration="0.8" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/lodging_income_tax.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Lodging Income Tax Returns</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.2" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/bookkeeping.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Bookkeeping</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.5" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/dataentry.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Data entry and bank reconciliation</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.7" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/prepare_bas.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Prepare BAS</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.9" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/structure.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Business structuring</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.9" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/software_setup.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Assist in accounting software setup</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.9" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/incentive_assistance.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Government Incentive Assistance</p>
                            </div>
                        </div>
                    </UpSlidingBox>
                    <UpSlidingBox duration="1.9" distance={70}>
                        <div className="flex flex-col items-center">
                            <div className="">
                                <Image className="rounded-2xl h-96 w-72 object-cover"
                                    alt="Separate"
                                    src="/assets/services/company_tax_return.jpg" width={400} height={600} />
                            </div>
                            <div className="relative bottom-10 flex bg-primary py-4 px-4 w-60 h-16 items-center justify-center rounded-xl hover:bg-black transition duration-500">
                                <p className={`font-bold text-2xl text-white hover:text-white text-center leading-6 ${ptSans.className}`}>Company Tax Return</p>
                            </div>
                        </div>
                    </UpSlidingBox>

                </div>

                <div className="">
                    <div className="flex flex-col  md:flex-row items-center md:justify-center gap-4">
                        <p className='text-white text-center'>Need more services based on your demand?</p>
                        <UpSlidingBox duration="1.2" distance={70}>
                            <Link href="/contact-us" className={` w-40 text-center bg-primary text-black py-4 px-6 font-medium hover:text-white hover:bg-gray-dark transition duration-500`}>Contact Us</Link>
                        </UpSlidingBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesList