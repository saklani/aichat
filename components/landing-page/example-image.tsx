import Image from "next/image";

export function ExampleImage() {
    return (
        <div className=" border">
            <Image src="https://sable-assets-public.s3.us-east-1.amazonaws.com/example.png" alt="Sample" width={0} height={0} sizes="100vw"  className="w-full h-full object-cover" priority/>
        </div>
    )
}