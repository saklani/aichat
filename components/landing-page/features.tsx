import { Section } from "./section";

export function Features() {
    return (
        <Section>
            <div className="flex flex-col w-full gap-4">
                <p className="scroll-mt-20 text-balance text-[clamp(1.5rem,_3vw,_1.8rem)] font-semibold leading-[1.2] -tracking-[0.5px] lg:text-center">
                    A centralized place for all your AI chats
                </p>

                <div className="flex flex-col h-[100px] w-full border rounded-md"></div>


            </div>
            <div className="flex flex-col w-full gap-4">
                <p className="scroll-mt-20 text-balance text-[clamp(1.5rem,_3vw,_1.8rem)] font-semibold leading-[1.2] -tracking-[0.5px] lg:text-center">
                    Retain full control of your data with a fully open-source platform.
                </p>
                <div className="flex flex-col h-[100px] w-full border rounded-md"></div>

            </div>
        </Section>
    )
}