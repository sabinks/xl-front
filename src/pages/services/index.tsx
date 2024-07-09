import ServicesList from '@/components/home/servicesList'
import { APP_NAME } from '@/constants'
import Head from 'next/head'
import React from 'react'

function Services() {
    return (
        <div className="">
            <Head>
                <title>{APP_NAME} | Services</title>
            </Head>
            <ServicesList />
        </div>
    )
}

export default Services