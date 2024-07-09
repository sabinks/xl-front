import { nunitoSans, playFair, ptSans } from '@/fonts'
import Image from 'next/image'
import React from 'react'
import { BiLinkAlt } from 'react-icons/bi'
import RightSlidingBox from '../box/rightSlidingBox'


function CompanyObjectives() {
    return (
        <div className='bg-small-white-dot'>
            <div className="w-full flex justify-center">
                <div className="md:relative md:-top-28 py-12 w-full md:w-3/4 bg-white border border-slate-100">
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className="mx-8 md:mx-12">
                            <RightSlidingBox duration="0.8">
                                <div className="">
                                    <div className="flex pl-2 mb-2">
                                        <div className="border rotate-90 border-primary"></div>
                                        <h1 className={`pl-6 text-primary ${nunitoSans.className} font-bold text-lg`}>Our Objectives</h1>
                                    </div>
                                    <h2 className={`${playFair.className} text-5xl md:text-5xl font-extrabold mb-10 text-black`}>Check Out Our Credentials</h2>


                                    <div className=" flex flex-col space-y-8">
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Focus on Client Growth</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Partner with our clients in their journey towards growth and
                                                    success, offering strategic insights, financial guidance, and value-added services to
                                                    support their expansion, profitability, and sustainability.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Build Strong Client Relationships</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Foster strong, long-lasting relationships with our clients
                                                    by actively listening to their needs, providing personalised solutions, and offering proactive
                                                    guidance and support to help them achieve their financial goals.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Precision in Accounting Practices</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Maintain the highest standards of accuracy and
                                                    precision in accounting practices, ensuring that all financial records, statements, and
                                                    reports are meticulously maintained and error-free.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Maximise Tax Benefits</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Provide proactive tax optimisation strategies to maximise tax
                                                    benefits for our clients while ensuring full compliance with tax laws and regulations.
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
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Continuous Improvement</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Embrace a culture of continuous improvement, investing in
                                                    ongoing training, technology upgrades, and process enhancements to enhance efficiency,
                                                    effectiveness, and client satisfaction.
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
                                        <div className="flex gap-6">
                                            <div className="z-10 bg-primary rounded-full p-3 w-14 h-14"><BiLinkAlt className="h-8 w-8 text-white" /></div>
                                            <div className="">
                                                <h3 className={`text-2xl font-bold mb-2 ${ptSans.className}`}>Timely Compliance</h3>
                                                <p className={`text-gray-light leading-7`}>
                                                    Ensure timely compliance with all legal requirements, including BAS
                                                    lodgements, IAS lings, tax returns (ITR), payroll processing, and other statutory
                                                    obligations, to avoid penalties and mitigate risks
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

export default CompanyObjectives