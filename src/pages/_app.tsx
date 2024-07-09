import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/auth";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-medium-image-zoom/dist/styles.css'
// import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "@/components/authLayout";
import Layout from "@/components/layout";
import SiteVisit from "@/components/siteVisit";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400"],
    variable: '--font-roboto',
});


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 60 * 5,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    const pages = ['/reset-password', '/register', '/login', '/forgot-password', '/email-verify']

    return (
        <div className={`${roboto.variable}`}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {
                        router.pathname.startsWith("/auth") ?
                            <AuthLayout props={<Component {...pageProps} />} /> :
                            pages.includes(router.pathname) ? <Component {...pageProps} /> :
                                <Layout props={<Component {...pageProps} />} />
                    }
                </AuthProvider>
                <ToastContainer />
                {/* <SiteVisit /> */}
            </QueryClientProvider>
        </div>
    );
}
