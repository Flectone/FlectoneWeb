import Projects from "@/components/Content/Projects";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FlectoneChat from "@/components/Content/FlectoneChat";
export default function Home() {
  return (
    <div className="flex pb-4 flex-col justify-between min-h-screen max-xl:items-center">
      <Header/>
      <FlectoneChat/>
      <Footer/>
    </div>
  );
}
