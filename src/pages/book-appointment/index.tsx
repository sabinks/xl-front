"use client"
import { bookAppointment, checkAppointmentAvailablity } from '@/api';
import { Button, Input } from '@/components';
import TextArea from '@/components/textArea';
import { APP_NAME } from '@/constants';
import { montserrat, nunitoSans, playFair, poppins, ptSans } from '@/fonts';
import { firstWordCapital } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format, setHours, setMinutes } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';

function BookAppointment() {
    const router = useRouter()
    const [dob, setDob] = useState<any>(null)
    const [errors, setErrors] = useState<any>([])
    const [excludeData, setExcludeData] = useState<any>([])
    const [excludeTime, setExcludeTime] = useState<any>([])
    const [state, setState] = useState({
        name: '', email: '', phone: '', dob: '', bookingDate: '', bookingTime: '', description: ''
    })
    useEffect(() => {
        const a = excludeData?.filter((item: any) => item.date == state?.bookingDate)
            .map((item: any) => {
                const time = item.time.split(":")
                return setHours(setMinutes(new Date(), time[1]), time[0])
            })

        setExcludeTime(a)
    }, [state?.bookingDate, excludeData])

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
        switch (name) {
            case 'dob':
                setDob(value)
                break;
            default:
                break;
        }
    }
    const handleInputDateTimeChange = (name: string, value: any) => {
        if (name == 'bookingDate') {
            setState((prev: any) => ({
                ...prev, [name]: value, bookingTime: ''
            }))
        } else {
            setState((prev: any) => ({
                ...prev, [name]: value
            }))
        }

    }
    const handleSubmit = (e: any) => {
        setErrors({})
        mutateBookAppointment({ data: state })
    }
    const { isLoading, data: bookedAppointment, refetch, isFetching } = useQuery(
        ["check-appointment-availablity"],
        checkAppointmentAvailablity, {
        onSuccess: (data) => {
            const i = data.map((a: any) => {
                const b = a.split(" ")
                return { date: b[0], time: b[1] }
            })

            setExcludeData(i)
        },
    })
    const { mutate: mutateBookAppointment } = useMutation(bookAppointment, {
        onSuccess: (res) => {
            // const { message } = res.data
            // toast.success(message, { autoClose: 3000 })
            router.push('/');
        },
        onError: (error: any) => {
            const { statusCode, message } = error.response.data;
            console.log(error.response.data);

            if (statusCode == 422) {
                setErrors(message)
            }
        }
    })
    const getErrorMsg = (name: string) => {
        let msg = errors.find((error: any) => error.property == name)?.message
        if (msg) {
            return firstWordCapital(msg)
        }
        return ''
    }
    return (
        <>
            <Head>
                <title>{APP_NAME} | Book Appointment</title>
            </Head>
            <div className=" container mx-auto text-gray-700 py-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full md:w-1/2 pt-12">
                        <div className="rounded-md shadow-lg p-8 space-y-2">
                            <h1 className={` text-center font-bold text-3xl ${nunitoSans.className} text-primary`}>Book Appointment</h1>
                            <div className="flex justify-center items-center px-4 md:px-0 pb-4">
                                <Image className=""
                                    alt="Separate"
                                    src="/separator.webp" width={400} height={200} />
                            </div>
                            <Input label='Name' name="name" type="text" onChange={(e: any) => handleInputChange(e)} placeholder='Enter Fullname' error={errors.length > 0 && getErrorMsg('name')} />
                            <Input label='Email' name="email" type="text" onChange={(e: any) => handleInputChange(e)} placeholder='Enter E-mail Address' error={errors.length > 0 && getErrorMsg('email')} />
                            <Input label='Phone' name="phone" type="text" onChange={(e: any) => handleInputChange(e)} placeholder='Enter Phone Number' error={errors.length > 0 && getErrorMsg('phone')} />
                            <div className="flex flex-col">
                                <label htmlFor="" className='text-sm font-semibold text-gray-700'>Date of Birth</label>
                                <DatePicker
                                    placeholderText='Enter Date of Birth'
                                    showIcon
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown

                                    yearDropdownItemNumber={110}
                                    // minDate={new Date()}
                                    selected={state.dob ? new Date(state.dob) : null}
                                    onChange={(value: any) => handleInputDateTimeChange('dob', format(value, 'yyyy-MM-dd HH:mm:ss'))}
                                    // timeIntervals={30}
                                    showTimeSelect={false}
                                    dateFormat="yyyy-MM-dd"
                                    todayButton="Today"
                                    className="border rounded-md border-primary focus:outline-none focus:ring-primary1 text-sm placeholder-gray-400"
                                />
                                <div className="py-1">
                                    {errors.length > 0 && getErrorMsg('dob') && <p className="text-red-500 text-xs ">{errors.length > 0 && getErrorMsg('dob')}
                                    </p>}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col xl:flex-row justify-between">
                                    <div className="flex flex-col">
                                        <label htmlFor="" className='text-sm font-semibold text-gray-700'>Choose Booking Date</label>
                                        <DatePicker
                                            placeholderText='Enter Booking Date Time'
                                            showIcon
                                            minDate={new Date()}
                                            selected={state?.bookingDate ? new Date(state.bookingDate) : null}
                                            onChange={(value: any) => handleInputDateTimeChange('bookingDate', format(value, 'yyyy-MM-dd'))}
                                            showTimeSelect={false}
                                            dateFormat="yyyy-MM-dd"
                                            todayButton="Today"
                                            className="border rounded-md  px-3 py-4 border-primary focus:outline-none text-sm placeholder-gray-400"
                                        />
                                        <div className="py-1">
                                            {
                                                errors.length > 0 && <p className="text-red-500 text-xs ">{errors.length > 0 && getErrorMsg('bookingDate')}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className='text-sm font-semibold text-gray-700'>Choose Appropriate Time</label>
                                        <DatePicker
                                            placeholderText='Enter Booking Date Time'
                                            showIcon
                                            minDate={new Date()}
                                            selected={state?.bookingTime ? new Date(state?.bookingDate + " " + state.bookingTime) : null}
                                            onChange={(value: any) => {
                                                handleInputDateTimeChange('bookingTime', format(value, 'HH:mm:ss'))
                                            }}
                                            disabled={state?.bookingDate == "" ? true : false}
                                            timeIntervals={30}
                                            showTimeSelectOnly
                                            showTimeSelect
                                            dateFormat="hh:mm a"
                                            todayButton="Today"
                                            excludeTimes={excludeTime}
                                            className="border rounded-md  px-3 py-4 border-primary focus:outline-none text-sm placeholder-gray-400"
                                        />
                                        <div className="py-1">
                                            {
                                                errors.length > 0 && <p className="text-red-500 text-xs ">{errors.length > 0 && getErrorMsg('bookingTime')}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <TextArea rows={6} label='Description' name="description" type="textarea" onChange={(e: any) => handleInputChange(e)} placeholder='Enter Description' error={errors.length > 0 && getErrorMsg('description')} />
                            <div className="grid place-items-center pt-4">
                                <Button label={'Book Appointment'} onClick={(e: any) => {
                                    handleSubmit(e)
                                }}
                                    className='px-16 bg-secondary'
                                // loading={isLoading}
                                // disabled={validated}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookAppointment