import Image from "next/image";

export function ExampleImage() {
    return (
        <div className="w-[968px] h-[548px] border">
            <Image src="https://sable-assets-public.s3.us-east-1.amazonaws.com/example.png" alt="Sample" width={968} height={547} />
        </div>
    )
}