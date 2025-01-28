import { FileUpload } from "@/components/file-upload/component";
import { Files } from "@/components/files/components";

export default function Page() {
    return (
    <div className="flex flex-col w-full">
      <FileUpload />
      <Files />
    </div>
    );
}