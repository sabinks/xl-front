import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchPaymentIntent } from "@/api";
import PaymentForm from "./paymentForm";
const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

export default function BookAppointmentPayment() {
    const router = useRouter();
    useEffect(() => {
        getPaymentIntent();
    }, []);
    const [state, setState] = useState<any>({})
    const { refId, cusId, amt, cur } = router?.query
    const getPaymentIntent = async () => {
        const paymentIntentRespose = await fetchPaymentIntent({
            amt, cur, refId, cusId
        });
        setState((prev: any) => ({
            ...prev,
            clientSecret: paymentIntentRespose.client_secret,
            paymentIntentId: paymentIntentRespose.id,
            amt, cusId, refId, cur
        }));
    };
    const {
        clientSecret,
        paymentIntentId,
        price,
        mutateBookShortCourse,
    } = state;
    return (
        <div className='w-full h-screen border flex items-center'>
            <div className='mx-auto w-full max-w-sm'>
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: clientSecret as string }}
                >
                    <PaymentForm
                        state={state}
                    />
                </Elements>
            </div>
        </div>
    );
}