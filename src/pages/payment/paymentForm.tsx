import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@/components";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { paymentSuccess } from "@/api";
// import { bookShortCourse } from "api/home";
// import { cancePaymentIntent } from "api/home";

export default function PaymentForm({
    state,
}: any) {
    const { refId, cusId } = state
    const router = useRouter()
    const stripe = useStripe();
    const elements = useElements();

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        toggleLoading(true);
        setError("");
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:5173/applied-shortCourses",
                },
                redirect: "if_required",
            })
            .then(async (res: any) => {
                if (res.error) {
                    setError(res.error.message as string);
                } else {
                    if (res?.paymentIntent?.status == "succeeded") {
                        let paymentId = res?.paymentIntent?.id
                        toast.success("Payment Completed, Thank you for using our service.", { autoClose: 3000 })
                        await paymentSuccess({ refId, cusId, paymentId })
                        console.log("Payment done");
                        router.push('/')
                    }
                }
            })
            .catch((err) => {
                console.log("stripe error", err);
            });
        toggleLoading(false);
    };

    // const { isLoading: cancelPaymentLoading, mutate: cancelPayment } =
    //     useMutation(
    //         async () => {
    //             await cancePaymentIntent({ id: paymentIntentId });
    //         },
    //         {
    //             onSuccess: (res: any) => {
    //                 setValidated(false);
    //                 setIsPayment(false);
    //             },
    //         }
    //     );

    return (
        <div className="flex flex-col bg-white  p-5 border-b border-gray-200">
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                {error ? <p className="text-red-500 py-5">{error}</p> : null}
                <div className="grid grid-cols-2 gap-4 my-10">
                    {/* <Button
                        fullWidth={false}
                        label="Cancel"
                        type="button"
                        buttonType="danger"
                        onClick={cancelPayment}
                        disabled={cancelPaymentLoading || loading}
                    /> */}
                    <Button
                        fullWidth={false}
                        label={`Complete Payment (AUD ${state.amt})`}
                        type="submit"
                        loading={loading}
                    />
                </div>
            </form>
        </div>
    );
}
