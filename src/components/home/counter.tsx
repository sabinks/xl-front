import { poppins } from '@/fonts'
import React from 'react'

function Counter() {
    return (
        <div className='bg-secondary pt-16 pb-16 md:pb-48'>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-y-0 md:justify-around">
                    {/* <div className="text-white text-center">
                        <h1 className={`font-bold text-6xl md:text-8xl mb-2 ${poppins.className}`}>8K+</h1>
                        <p className={`text-xl ${poppins.className}`}>Project Completed</p>
                    </div> */}
                    <div className="text-white text-center">
                        <h1 className={`font-bold text-6xl md:text-8xl mb-2 ${poppins.className}`}>1K+</h1>
                        <p className={`text-xl ${poppins.className}`}>Happy Customers</p>
                    </div>
                    <div className="text-white text-center">
                        <h1 className={`font-bold text-6xl md:text-8xl mb-2 ${poppins.className}`}>20</h1>
                        <p className={`text-xl ${poppins.className}`}>Years of Experience</p>
                    </div>
                    <div className="text-white text-center">
                        <h1 className={`font-bold text-6xl md:text-8xl mb-2 ${poppins.className}`}>10</h1>
                        <p className={`text-xl ${poppins.className}`}>Team Members</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Counter