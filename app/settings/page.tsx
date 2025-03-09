import { Back } from "@/components/common/back";
import { User } from "@/components/account/user";
import { History } from "@/components/account/export-chat";
import { DeleteAccount } from "@/components/account/delete-account";
import { Logout } from "@/components/auth/logout";

export default function Page() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="flex flex-col w-full h-screen p-[24px]">
                <header className="flex justify-between w-full">
                    <Back />
                    <Logout />
                </header>
                <div className="flex flex-col items-center gap-4 w-full py-3">
                    <div className="flex flex-col py-5 gap-6 w-full max-w-xl">
                        <User />
                        <History />
                        <DeleteAccount />
                    </div>
                </div>
            </div>
        </div>
    )
}