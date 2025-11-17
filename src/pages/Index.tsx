import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";
import Organizers from "@/components/Organizers";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-grow">
        <Hero />
        <About />
        <Schedule />
        <Sponsors />
        <Organizers />
        <Registration />
      </div>
      <Footer />
    </div>
  );
};

export default Index;