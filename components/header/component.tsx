import { Account } from "../account/component";

export function Header() {
    return (
        <div className="flex bg-zeus h-[48px] w-full items-center justify-between px-[16px]">
            <p>Name</p>
            <Account/>
        </div>
    )
}