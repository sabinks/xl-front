import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getList, postQuery } from '@/api';
import { Button, CheckBox, PageTitle } from '@/components';
import Select from 'react-select'
import Spinner from '@/components/spinner';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { APP_NAME } from '@/constants';

export default function SendMail() {
    const [checkboxState, setCheckboxState] = useState({
        client: false,
    })
    const [clients, setClients] = useState<any>()
    const [partners, setPartners] = useState<any>()
    const [newsletters, setNewsletters] = useState<any>()
    const [data, setData] = useState<any>()
    const [formErrors, setFormErrors] = useState<any>()
    const [selectClients, setSelectClients] = useState<boolean>(false)
    useQuery(["newsletter"], getList, {
        onSuccess: (res) => {
            let array: any = []
            res?.data?.data?.map(({ id, name }: any) => {
                array.push({ value: id, label: name })
            })
            setNewsletters(array);
        }
    })

    useQuery(["client-list"], getList, {
        onSuccess: (res: any) => {
            const array = res?.data?.map(({ id, name }: any) => ({ value: id, label: name }))
            setClients(array);
        }
    })


    const { mutate, isLoading } = useMutation(postQuery, {
        onSuccess: (res: any) => {
            // const { message } = res.data
            // toast.success(message, { autoClose: 3000 })
        },
        onError: (err: any) => {
            const { status, data } = err.response;
            if (status == 422) {
                setFormErrors(data);
            } else {
                console.log("Course Form Error: ", err);
            }
        }
    })

    const hangleChange = (value: any, name: string) => {
        setData({ ...data, [name]: value })
    }

    const handleCheckboxEvent = (e: any, user_type: string) => {
        const { checked } = e.target
        setSelectClients(checked)
        if (user_type == 'client') {
            setData((prev: any) => ({ ...prev, client_ids: checked ? clients : [] }))
        }
    }

    const handleSubmit = () => {
        let sumbitData = {}
        const clientId: any = data?.client_ids?.map(({ value }: any) => (value))

        sumbitData = {
            route: "send-newsletter",
            data: {
                newsletter_id: data?.newsletter_id?.value,
                client_ids: JSON.stringify(clientId),
            }
        }
        mutate(sumbitData)

    }
    return (
        <>
            <Head>
                <title>{APP_NAME} | Send Newsletter</title>
            </Head>
            <div className='sm:w-full md:w-3/4  space-y-2'>
                {
                    newsletters && clients ?
                        <>
                            <PageTitle title='Send Newsletter' />
                            <div className='pb-4'>
                                <label className='font-bold'>Select Newsletters</label>
                                <Select
                                    value={data?.newsletter_id}
                                    options={newsletters}
                                    isMulti={false}
                                    onChange={(value) => hangleChange(value, "newsletter_id")}
                                    placeholder="Select Newsletter"
                                    className='w-1/2'
                                />

                                <p className='text-red-400 text-sm'>{formErrors?.newsletter_id}</p>
                            </div>
                            <div className='pb-4'>
                                <div className="flex flex-row items-center">
                                    <label className='w-48 font-bold'>Select Client(s)</label>
                                    <CheckBox
                                        label="All/None"
                                        name="selectClients"
                                        onChange={(e: any) => handleCheckboxEvent(e, 'client')}
                                        checked={selectClients}
                                        className=""
                                    />
                                </div>
                                <Select
                                    value={data?.client_ids}
                                    options={clients}
                                    isMulti={true}
                                    onChange={(value) => hangleChange(value, "client_ids")}
                                    placeholder="Select Client(s)"
                                />
                                <p className='text-red-400 text-sm'>{formErrors?.client_ids}</p>

                            </div>
                            <Button label='Submit' onClick={handleSubmit} loading={isLoading} className='w-xl' />
                        </>
                        :
                        <div className="flex justify-center  text-blue-500 py-20 font-medium">
                            <div className='flex'>
                                <Spinner /><h1 className='flex items-center'>Loading ...</h1>
                            </div>
                        </div>

                }

            </div>
        </>

    )
}
