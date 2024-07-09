import { Bree_Serif, Inter, Montserrat, Nunito_Sans, PT_Sans, Playfair, Poppins, Roboto_Flex, Roboto_Serif } from "next/font/google"

export const inter = Inter({ subsets: ['latin'] })
export const montserrat = Montserrat({ subsets: ['latin'] })
export const nunitoSans = Nunito_Sans({ subsets: ['latin'] })
export const playFair = Playfair({ subsets: ['latin'] })
export const poppins = Poppins({ weight: "400", subsets: [] })
export const ptSans = PT_Sans({ weight: "400", subsets: ['latin'] })
export const montserratRegular = Montserrat({ subsets: ['latin'], weight: "500" })
export const bree = Bree_Serif({
    subsets: ['latin'],
    weight: '400'
});
export const roboto = Roboto_Serif({
    subsets: ['latin'],
    weight: '400'
});
export const robotoFlex = Roboto_Flex({
    subsets: ['latin'],
});