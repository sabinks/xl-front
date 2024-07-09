import React, { useState } from 'react'
import { PageTitle } from '../../../components'
// import BankDetail from './bankDetails'
import ChangeUserPassword from './changeUserPassword'
import ChangeUserDetail from './changeUserDetail'
import Head from 'next/head'
// import ChangeAdminDetail from './changeAdminDetail'




const multipleTabData = [
    { label: "Change Password", slug: 'change-password', role: ['superadmin', 'ADMIN', 'PARTNER', 'USER'] },
    { label: "User Details", slug: 'change-user-detail', role: ['superadmin', 'ADMIN', 'PARTNER', 'USER'] },
    // { label: "Bank Details", slug: 'bank-details', role: ['Client', 'Partner'] },
    // { label: "Testimonial", slug: 'testimonial', role: ['Client', 'Partner'] },
]
export default function Profile() {
    const [navState, setNavState] = useState('change-password')
    // const { roles }: any = useAuth()

    return (

        <div className='px-3'>
            <Head>
                <title>Profile</title>
            </Head>
            <PageTitle title='Profile' />
            <div className="flex mb-2  flex-row rounded">
                {
                    multipleTabData.map(({ label, slug, role }) => (
                        <div key={label}
                            className={`px-4 py-1.5 cursor-pointer rounded-t-md ${slug == navState ? 'bg-accent1 text-white font-bold' : 'bg-gray-light'}`}
                            onClick={() => setNavState(slug)}>
                            {label}
                        </div>
                    ))}
            </div>
            <div className='w-full md:w-3/4 lg:w-1/2'>
                {/* {navState == 'bank-details' && <BankDetail />} */}
                {/* {navState == 'testimonial' && <UserTestimonial />} */}
                {/* {navState == 'user-details' && <ChangeAdminDetail />} */}
                {/* {navState == 'user-details' && checkSubset(['Client'], roles) && <ChangeClientDetail />}
                {navState == 'user-details' && checkSubset(['Partner'], roles) && <ChangePartnerDetail />} */}
                {navState == 'change-password' && <ChangeUserPassword />}
                {navState == 'change-user-detail' && <ChangeUserDetail />}
            </div>
        </div>

    )
}

