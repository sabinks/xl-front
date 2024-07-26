import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchPaymentIntent } from "@/api";
import PaymentForm from "./paymentForm";
import Loading from "@/components/loading";
import { STRIPE_KEY } from "@/constants";

const stripePromise = loadStripe(`${STRIPE_KEY}`)

export default function BookAppointmentPayment() {
    const router = useRouter();
    const { refId, cusId, amt, cur } = router?.query
    const [state, setState] = useState<any>({})
    useEffect(() => {
        if (refId) {
            getPaymentIntent(refId, cusId, amt, cur);
        }
    }, [refId]);

    const getPaymentIntent = async (refId: any, cusId: any, amt: any, cur: any) => {
        try {
            const paymentIntentRespose = await fetchPaymentIntent({
                amt, cur, refId, cusId
            });
            setState((prev: any) => ({
                ...prev,
                clientSecret: paymentIntentRespose.client_secret,
                paymentIntentId: paymentIntentRespose.id,
                amt, cusId, refId, cur
            }));
        } catch (error: any) {
            console.log(error.response);
            router.push('/')
        }
    };
    const {
        clientSecret,
    } = state;
    if (!clientSecret) {
        return <Loading />
    }

    return (
        <div className='w-full h-screen border flex items-center'>
            <div className='mx-auto w-full max-w-sm'>
                {
                    <Elements
                        stripe={stripePromise}
                        options={{ clientSecret: clientSecret as string }}
                    >
                        <PaymentForm
                            state={state}
                        />
                    </Elements>
                }
            </div>
        </div>
    );
}