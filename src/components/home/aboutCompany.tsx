import { nunitoSans, playFair, ptSans } from '@/fonts'
import Image from 'next/image'
import React from 'react'
import { BiLinkAlt } from 'react-icons/bi'
import RightSlidingBox from '../box/rightSlidingBox'


function AboutCompany() {
    return (
        <div className='bg-small-white-dot'>
            <div className="w-full flex justify-center">
                <div className="md:relative md:-top-28 py-16 w-full md:w-3/4 bg-white border border-slate-100">
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className="mx-8 md:mx-16">
                            <RightSlidingBox duration="0.8">
                                <div className="">
                                    <div className="flex pl-2 mb-2">
                                        <div className="border rotate-90 border-primary"></div>
                                        <h1 className={`pl-6 text-primary ${nunitoSans.className} font-bold text-lg`}>ABOUT COMPANY</h1>
                                    </div>
                                    <h2 className={`${playFair.className} text-5xl md:text-5xl font-extrabold mb-10 text-black`}>Check Out Our Credentials</h2>


                                    <div className=" flex flex-col space-y-8">
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Recording Transactions</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Keep track of all financial transactions, including sales, purchases, expenses, and receipts.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Invoicing</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Issue invoices for goods sold or services provided to customers.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Accounts Receivable</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Monitor payments from customers and follow up on overdue accounts.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Accounts Payable</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Manage payments to suppliers, contractors, and other creditors.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Bank Reconciliation</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Regularly reconcile bank statements with internal records to ensure accuracy.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Tax Compliance</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Stay updated on tax regulations and ensure timely filing of tax returns.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Budgeting and Forecasting</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Develop and monitor budgets to plan for future expenses and revenue.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RightSlidingBox>
                        </div>
                        <div className="w-full mb-12 hover:mb-0">
                            <Image className="w-full md:h-96 md:w-96 object-cover"
                                alt="Separate"
                                src="/assets/business_image.jpg" width={400} height={600} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AboutCompany