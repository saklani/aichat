
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

export default function Page() {
    return (
        <div className={"flex flex-col items-center"}>
            {/* HEADER / NAVBAR */}
            <Header />
            <div className="flex flex-col items-center justify-center w-full h-full max-w-[968px]">
                {/* HERO SECTION */}
                <Hero />
                <div className="h-[400px] w-full bg-gray-700/20 rounded-lg">

                </div>
                {/* FEATURE CARDS */}
                <Features />
            </div>
            {/* FOOTER */}
            <Footer />
        </div>
    );
}
