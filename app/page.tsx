
import { Features } from "@/components/landing-page/features";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { ExampleImage } from "@/components/landing-page/example-image";
export default function Page() {
    return (
        <div className={"flex flex-col items-center"}>
            {/* HEADER / NAVBAR */}
            <Header />
            <div className="flex flex-col items-center justify-center w-full h-full max-w-[968px]">
                {/* HERO SECTION */}
                <Hero />
                <ExampleImage />
                {/* FEATURE CARDS */}
                <Features />
            </div>
            {/* FOOTER */}
            <Footer />
        </div>
    );
}
