
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import ParticleCanvas from "./_components/particle-canvas";

export default function Page() {
    return (
        <div className={"flex flex-col items-center"}>
            {/* HEADER / NAVBAR */}
            <Header />
            <div className="border-x flex flex-col items-center justify-center w-full h-full max-w-[968px]">
                {/* HERO SECTION */}
                <Hero />
                {/* FEATURE CARDS */}
                <Features />
            </div>
            {/* FOOTER */}
            <Footer />
        </div>
    );
}
