import MainBody from "@/components/home/mainbody";
import WelcomeToCompany from "@/components/home/welcomeToCompany";
import Counter from "@/components/home/counter";
import ServicesList from "@/components/home/servicesList";
import AboutCompany from "@/components/home/aboutCompany";
import ContactUs from "@/components/home/contactUs";
import ClientReviews from "@/components/home/clientReviews";
import CompanyObjectives from "@/components/home/companyOjectives";
import Values from "@/components/home/values";

export default function Home({ }: any) {
    return (
        <div className="">
            <MainBody />
            <WelcomeToCompany />
            {/* <ServicesList /> */}
            <Counter />
            {/* <AboutCompany /> */}
            <CompanyObjectives />
            <Values />
            <ContactUs />
            {/* <ClientReviews /> */}
        </div>
    )
}