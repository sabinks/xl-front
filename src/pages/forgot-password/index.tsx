import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { apiClient } from "../../api";
import { useRouter } from "next/router";
import { Button, Input } from "../../components";
import ErrorMessage from "../../components/error_message";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { APP_NAME } from "@/constants";
import { montserrat } from "@/fonts";
import Head from "next/head";


export default function ForgotPassword() {
    const router = useRouter();
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = React.useState<any>({
        email: "",
    });

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true)
        try {
            const res: any = await apiClient.post(`/forgot-password`, {
                email: state.email
            });

            // const { message } = res.data
            setLoading(false)
            // toast.success(message, { autoClose: 3000 });
            router.push("/login");
        } catch (error: any) {
            let { data } = error.response
            setErrors(data)
            setLoading(false)
        }
    };
    return (
        <>
            <Head>
                <title>{APP_NAME} | Forgot Password</title>
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
                                Forgot Password
                            </h2>
                        </div>

                        <div className='mt-8'>
                            <div className='mt-6'>
                                <form action='#' method='POST' className='space-y-6'>
                                    <Input
                                        name="email"
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
                                    <div>
                                        <Button
                                            fullWidth
                                            type='submit'
                                            label='Reset Password'
                                            loading={loading}
                                            onClick={handleLogin}
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
