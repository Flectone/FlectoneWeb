import Projects from "@/components/Content/Projects";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <div className="flex pb-4 flex-col max-w-7xl justify-between min-h-screen max-xl:items-center">
      <Header/>
      <Projects/>
      <Footer/>
    </div>
  );
}
