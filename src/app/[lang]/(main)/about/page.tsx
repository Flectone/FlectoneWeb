import Card from "@/components/Card/Card";
import Members from "@/components/Content/Members";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
export default function Home() {
  return (
    <div className="flex pb-4 flex-col justify-between items-center min-h-screen">
      <Header/>
      <Members/>
      <Footer/>
    </div>
  );
}
