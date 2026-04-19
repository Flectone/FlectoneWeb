import { notFound } from 'next/navigation';
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'NotFound'
});

export default function CatchAllPage() {
    notFound();
}