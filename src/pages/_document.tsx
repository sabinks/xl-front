import { APP_NAME } from '@/constants'
import { inter, roboto } from '@/fonts'
import { Html, Head, Main, NextScript } from 'next/document'
export const metadata = {
    title: "XL Accounting",
}
export default function Document() {
    return (
        <Html lang="en">
            <Head >
                {/* <title>{APP_NAME}</title> */}
                <meta property="og:description" content={`${APP_NAME}, lodging income tax return, bookkeeping, data entry and bank reconciliation, prepare bas, business structuring, accouting software, government incentive assistance, company tax return`} key="description" />
                <link rel="icon" href="/assets/logo_small.png" type="image/png" sizes="32x32" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
