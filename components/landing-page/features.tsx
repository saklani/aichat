import { Section } from "./section";
import Image from "next/image";
import Link from "next/link";

function SeeTheCode() {
    return (
        <Link href="https://github.com/saklani/sable" className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-white/90 px-4 h-[28px] rounded-md gap-2">
            <Image src="/github.svg" alt="GitHub" width={16} height={16} />
            <span>See the code</span>
        </Link>
    )
}


export function Features() {
    return (
        <Section>
            <div className="flex flex-col w-full gap-6">
                <div className="flex flex-col w-full gap-2">
                    <p className="scroll-mt-20 text-balance text-[clamp(1.5rem,_3vw,_1.8rem)] font-semibold leading-[1.2] -tracking-[0.5px] lg:text-center">
                        A centralized hub for all your AI chats
                    </p>
                    <p className="text-[clamp(0.9375rem,_2vw,_1.0625rem)] text-muted-foreground leading-relaxed w-full text-center">
                        No more jumping between different chat apps
                    </p>
                </div>
                <div className="flex h-[203.69px] w-full">
                    <Image src="https://sable-assets-public.s3.us-east-1.amazonaws.com/a-centralized-hub-for-all-your-ai-chats.png" alt="Sample" width={968} height={547} />
                </div>
            </div>
            <div className="flex flex-col w-full gap-6 items-center justify-between">
                <p className="scroll-mt-20 text-balance text-[clamp(1.5rem,_3vw,_1.8rem)] font-semibold leading-[1.2] -tracking-[0.5px] w-full lg:text-center">
                    Connect to multiple data sources
                </p>
                <div className="flex bg-popover rounded-xl py-5 px-4 max-w-md items-center justify-between gap-7 border-[0.5px]">
                    <div>
                        <p className="text-[clamp(0.9375rem,_2vw,_1.0625rem)] text-muted-foreground leading-relaxed w-full">
                            Add data to every conversation from a wide range of sources
                        </p>
                    </div>
                    <div className="flex bg-foreground/70 rounded-xl p-1">
                        <Image src="https://sable-assets-public.s3.us-east-1.amazonaws.com/connect-multiple-data-sources.png" alt="Sample" width={200} height={200} />
                    </div>
                </div>

            </div>
            <div className="flex flex-col w-full gap-6 items-center">
                <div className="flex flex-col w-full gap-2">
                    <p className="scroll-mt-20 text-balance text-[clamp(1.5rem,_3vw,_1.8rem)] font-semibold leading-[1.2] -tracking-[0.5px] lg:text-center">
                        Retain control with an open-source platform
                    </p>
                    <p className="text-[clamp(0.9375rem,_2vw,_1.0625rem)] text-muted-foreground leading-relaxed w-full text-center">
                        Code should be open source and accessible to everyone
                    </p>
                </div>
                <div className="bg-popover group relative flex flex-col items-center w-full max-w-xs scroll-m-1 gap-4 rounded-xl border-[0.5px] px-4 py-8 shadow-sm z-[3] transition-all group-hover/posts:shadow">
                    <span className="text-center text-[clamp(0.9375rem,_2vw,_1.0625rem)] leading-relaxed w-full">
                        Check out the source code
                    </span>

                    <SeeTheCode />
                </div>
            </div>

        </Section>
    )
}