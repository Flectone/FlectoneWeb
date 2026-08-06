import { createMetadata } from "@/lib/create-metadata";
import FlectoneTools from "@/components/Content/Tools/FlectoneTools";
import WelcomeCard from "@/components/Content/Tools/WelcomeCard";

export const generateMetadata = createMetadata({
    namespace: 'Tools.Main'
});

export default function ToolsPage() {
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
            <WelcomeCard/>
            <span className="border-b"></span>
            <FlectoneTools />
        </div>
    )
}