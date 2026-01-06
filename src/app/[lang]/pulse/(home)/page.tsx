import Structure from '@/components/Pulse/Structure';
import Feautures from '@/components/Pulse/Features';
import WelcomeCard from '@/components/Pulse/WelcomeCard';
import Metrics from "@/components/Pulse/Metrics";

export default function HomePage() {
  return (
    <div className="my-4 w-full max-w-6xl flex gap-8 flex-col justify-start items-center text-center">
      <WelcomeCard />
      <Feautures />
      <Structure />
      <Metrics />
    </div>
  );
}
