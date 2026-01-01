import Projects from "@/components/Content/Projects";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FlectoneMix from "@/components/Content/FlectoneMix";
export default function Home() {
  return (
    <div className="flex pb-4 flex-col justify-between min-h-screen max-xl:items-center">
      <Header/>
      <FlectoneMix/>
      <Footer/>
    </div>
  );
}
