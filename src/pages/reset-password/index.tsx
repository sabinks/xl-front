import * as React from "react";
import { useState } from "react";
import { apiClient } from "../../api";
import { Button, Input } from "../../components";
import ErrorMessage from "../../components/error_message";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { APP_NAME } from "@/constants";
import { montserrat } from "@/fonts";
import Link from "next/link";
import Head from "next/head";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export default function ResetPassword() {
    const router = useRouter()
    const [isPassword, setIsPassword] = React.useState(true);
    const { token } = router?.query
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = React.useState<any>({
        token,
        email: "",
        password: "",
    });

    React.useEffect(() => {
        setState((prev: any) => ({ ...state, token }))
    }, [token])


    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true)
        try {
            const data: any = await apiClient.post(`/reset-password`, state);
            // toast.success('Password Reset Completed!', { autoClose: 3000 })
            setLoading(false)
            router.push('/login');
        } catch (error: any) {
            let { data } = error.response
            setErrors(data)
            setLoading(false)
        }
    }
    return (
        <>
            <Head>
                <title>{APP_NAME} |Reset Password</title>
            </Head>
            <div className='min-h-screen flex'>
                <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
                    <div className='mx-auto w-full max-w-sm lg:w-96'>
                        <div className="">
                            <Link href={'/'}>
                                <div className="flex flex-col gap-x-4 items-start">
                                    <Image
                                        className="h-36 w-auto"
                                        src="/assets/logo_small.png"
                                        alt="Logo"
                                        width="100"
                                        height="100"
                                    />
                                    <h2 className={`text-4xl tracking-wider font-extrabold text-secondary ${montserrat.className}`}>
                                        {APP_NAME}
                                    </h2>
                                </div>
                            </Link>

                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Reset Password
                            </h2>
                        </div>

                        <div className='mt-8'>
                            <div className='mt-6'>
                                <form action='#' method='POST' className='space-y-6'>
                                    <Input
                                        name="password"
                                        label='Email Address'
                                        type='email'
                                        value={state.email}
                                        onChange={(e: { target: { value: string } }) =>
                                            setState({ ...state, email: e.target.value })
                                        }
                                    />
                                    {
                                        errors && <ErrorMessage name="email" errors={errors} />
                                    }
                                    <div className="relative w-full">

                                        <Input
                                            name="password"
                                            label='Password'
                                            type={isPassword ? "password" : "text"}
                                            value={state.password}
                                            onChange={(e: { target: { value: string } }) =>
                                                setState({ ...state, password: e.target.value })
                                            }
                                        />
                                        {isPassword ? (
                                            <EyeIcon
                                                className="w-5 mr-2 cursor-pointer absolute top-8 right-0 "
                                                onClick={() => setIsPassword(!isPassword)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="w-5 mr-2 cursor-pointer absolute top-8 right-0 "
                                                onClick={() => setIsPassword(!isPassword)}
                                            />
                                        )}
                                        {
                                            errors && <ErrorMessage name="password" errors={errors} />
                                        }
                                    </div>
                                    <div>
                                        <Button
                                            fullWidth
                                            type='submit'
                                            label='Reset Password'
                                            loading={loading}
                                            onClick={handleResetPassword}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1 contrast-50">
                    <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/assets/bookkeeping_big.jpg"
                        alt="Main"
                        width="1000"
                        height="1000"
                    />
                </div>
            </div>
        </>
    );
}
