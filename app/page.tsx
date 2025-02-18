
import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

export default function Page() {
    return (
        <div className={`flex flex-col items-center bg-gradient-to-b from-violet-600/5 via-blue-600/5 to-green-500/5`}>
            <div className="flex flex-col items-center justify-center w-full h-full">
                {/* HEADER / NAVBAR */}
                <Header />
                {/* HERO SECTION */}
                <Hero />
                {/* FEATURE CARDS */}
                <Features />
                {/* FOOTER */}
                <Footer />
            </div>
        </div>
    );
}
