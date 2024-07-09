import { useState } from "react"
import { Button, CheckBox, Input } from "@/components"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import ReactDatePicker from "react-datepicker"
import { format } from "date-fns"

export default function ClientForm({ state, setState, error, edit }: any) {
    const [info, setInfo] = useState(true)
    const [isPassword, setIsPassword] = useState(true)
    const handleChange = (e: any) => {
        let { name, type, value, files, checked } = e.target
        if (type === "file") {
            value = files
        }
        if (type === "checkbox") {
            value = checked
        }
        setState((prev: any) => ({
            ...prev, [name]: value
        }))

    }
    const handleInputDateTimeChange = (name: string, value: any) => {
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className="space-y-2">
            <Input
                label="Name"
                name='name'
                type='text'
                value={state?.name}
                onChange={handleChange}
            />
            <p className='text-red-400 text-sm'>{error?.name}</p>
            <Input
                label="Email"
                name='email'
                type='text'
                value={state?.email}
                onChange={handleChange}
                disabled={true}
            />
            <p className='text-red-400 text-sm'>{error?.email}</p>
            <Input
                label="Phone"
                name='phone'
                type='text'
                value={state?.phone}
                onChange={handleChange}
            // disabled={edit}
            />
            <p className='text-red-400 text-sm'>{error?.phone}</p>
            {/* {
                !edit &&
                <div>
                    <div className="text-sm font-semibold">Password</div>

                    <div className="relative w-full items-center">
                        <Input
                            name='password'
                            type={isPassword ? 'password' : 'text'}
                            value={state?.password}
                            onChange={handleChange}
                        />
                        {
                            isPassword ?
                                <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0 " onClick={() => setIsPassword(!isPassword)} /> :
                                <EyeOffOutline className="w-5 mr-2 cursor-pointer absolute top-2 right-0 " onClick={() => setIsPassword(!isPassword)} />
                        }

                    </div>

                    <p className='text-red-400 text-sm'>{error?.password}</p>


                </div>
            } */}
            <div className="flex flex-col">
                <label htmlFor="" className='text-sm font-semibold text-gray-700 pb-1'>Date of Birth</label>
                <ReactDatePicker
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
                    className="border rounded-md border-primary focus:outline-none focus:ring-primary text-sm placeholder-gray-400"
                />
            </div>
            {
                edit &&
                <>

                    <CheckBox
                        label="Active"
                        name="is_active"
                        onChange={handleChange}
                        checked={state?.is_active}
                    />
                    <p className='text-red-400 text-sm'>{error?.is_active}</p>
                </>
            }


            {
                state?.image &&
                <img src={state?.image_path} width={200} height={200} alt={state?.image} />
            }
            <Input
                label="Profile Image"
                name='profile_image'
                type='file'
                onChange={handleChange}
            />
            <p className='text-red-400 text-sm'>{error?.profile_image}</p>
        </div>
    )
}
