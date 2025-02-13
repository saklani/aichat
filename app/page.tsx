
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

export default function Page() {
    return (
        <div className={`flex flex-col min-h-screen`}>
            {/* HEADER / NAVBAR */}
            <Header/>
            {/* HERO SECTION */}
            <Hero/>
            {/* FEATURE CARDS */}
            <Features/>
            {/* FOOTER */}
            <Footer/>
        </div>
    );
}
