import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Back } from "./_components/back";
import { LogoutButton } from "./_components/logout";
import { Plan } from "./_components/plan";
import { User } from "./_components/user";
import { Payment } from "./_components/payment";
import { History } from "./_components/history";
import { DangerZone } from "./_components/danger-zone";

export default function Page() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="flex flex-col w-full h-screen p-[24px]">
                <header className="flex justify-between w-full">
                    <Back />
                    <LogoutButton />
                </header>
                <div className="flex gap-[24px]">
                    <div className="flex flex-col w-1/3 max-w-[300px]">
                        <User />
                        <Plan />
                    </div>
                    <Tabs defaultValue="account" className="w-2/3">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className="flex flex-col p-[24px] gap-[36px]">
                                <Payment />
                                <DangerZone/>
                            </div>
                        </TabsContent>
                        <TabsContent value="history"><History /></TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}