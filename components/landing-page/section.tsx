export function Section({ children }: { children: React.ReactNode }) {
    return (
        <div className=" w-full mx-auto flex flex-col px-4 md:px-6 lg:px-8 3xl:gap-36 4xl:gap-40 xl:gap-18 3xl:py-32 4xl:py-36 isolate max-w-2xl gap-20 py-12 md:gap-24 md:py-16 lg:gap-28 lg:py-20 xl:py-24 2xl:gap-32 2xl:py-28 ">
            {children}
        </div>
    )
}