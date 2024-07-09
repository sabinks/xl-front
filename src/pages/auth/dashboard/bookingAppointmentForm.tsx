import React, { useEffect, useState } from 'react'
import { Button, CheckBox, Input } from '../../../components';
import { useAuth } from '../../../../hooks/auth';
import TextArea from '@/components/textArea';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import Dropdown from '@/components/dropDown';

const list = [
    { name: "Tentative", id: "Tentative" },
    { name: "Confirmed", id: "Confirmed" },
    { name: "Cancelled", id: "Cancelled" },
]
export default function BookingAppointmentForm({ state, setState, error, edit }: any) {
    const { role, user: { email, name, phone }, getUserDetails } = useAuth()
    const handleInputDateTimeChange = (name: string, value: any) => {
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
    }
    return (
        <div className='space-y-4 mb-4'>
            <div className="border rounded-md p-2 space-y-2 bg-gray-light">
                <div className="">
                    <Input
                        name="name"
                        label='Name'
                        placeholder='Enter Fullname'
                        type="text"
                        value={state?.name}
                        onChange={(e: any) => setState({ ...state, name: e.target.value })}
                        error={error?.name}
                    />
                </div>
                <div className="">
                    <Input
                        name="email"
                        label='Email'
                        placeholder='Enter E-mail Address'
                        type="text"
                        value={state?.email}
                        onChange={(e: any) => setState({ ...state, email: e.target.value })}
                        error={error?.email}
                    />
                </div>
                <div className="">
                    <Input
                        name="phone"
                        label='Phone'
                        placeholder='Enter Phone Number'
                        type="text"
                        value={state?.phone}
                        onChange={(e: any) => setState({ ...state, phone: e.target.value })}
                        error={error?.phone}
                    />
                </div>
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
                        selected={state?.dob ? new Date(state?.dob) : null}
                        onChange={(value: any) => handleInputDateTimeChange('dob', format(value, 'yyyy-MM-dd HH:mm:ss'))}
                        // timeIntervals={30}
                        showTimeSelect={false}
                        dateFormat="yyyy-MM-dd"
                        todayButton="Today"
                        className="border rounded-md border-primary focus:outline-none focus:ring-primary1 text-sm placeholder-gray-400"
                    />
                    <div className="py-1">
                        {error?.dob && <p className="text-red-500 text-xs ">{error?.dob}
                        </p>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className='text-sm font-semibold text-gray-700'>Booking Date Time</label>
                    <DatePicker
                        placeholderText='Enter Booking Date Time'
                        showIcon
                        minDate={new Date()}
                        selected={state?.booking_date_time ? new Date(state.booking_date_time) : null}
                        onChange={(value: any) => handleInputDateTimeChange('booking_date_time', format(value, 'yyyy-MM-dd HH:mm:ss'))}
                        timeIntervals={30}
                        showTimeSelect={true}
                        dateFormat="yyyy-MM-dd hh:mm a"
                        todayButton="Today"

                        className="border rounded-md  px-3 py-4 border-primary focus:outline-none text-sm placeholder-gray-400"
                    />
                    <div className="py-1">
                        {error?.booking_date_time && <p className="text-red-500 text-xs ">{error?.booking_date_time}
                        </p>}
                    </div>
                </div>
                <div className="">
                    <label htmlFor="" className='text-sm font-semibold text-gray-700'>Status</label>
                    <Dropdown data={list} selectedValue={{ id: state?.status, name: state?.status }}
                        onChange={(selected: any) => setState({ ...state, status: selected.name })}
                    />
                </div>

                <TextArea
                    rows={6}
                    label='Description'
                    name="description"
                    type="textarea"
                    value={state?.description}
                    onChange={(e: any) => setState({ ...state, description: e.target.value })}
                    placeholder='Enter Description'
                    error={error?.description} />
            </div>
        </div>
    )
}
