import { Agents } from "@/components/index/agents/component";
import { CreateAgent } from "@/components/index/create-agent/components";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <div className="flex flex-col p-[8px]">
        <div className="flex items-center justify-between py-[16px]">
          <h1 className="title">Agents</h1>
          <CreateAgent />
        </div>
        <Agents />
      </div>
    </Suspense>
  );
}
