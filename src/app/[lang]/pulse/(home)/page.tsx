import Structure from '@/components/Pulse/Structure';
import Feautures from '@/components/Pulse/Features';
import WelcomeCard from '@/components/Pulse/WelcomeCard';

export default function HomePage() {
  return (
    <div className="my-4 w-full max-w-6xl flex gap-8 flex-col justify-start items-center text-center">
      <WelcomeCard />
      <Feautures />
      <Structure />
      <div className="w-full flex justify-center items-center bg-linear-to-br from-fd-primary/10 rounded-xl border p-4">
        <img src="https://flectone.net/api/pulse/metrics/svg" alt="metrics" className="not-dark:invert" />
      </div>
    </div>
  );
}
