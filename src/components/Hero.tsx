import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo_dark.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1.5s" }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI HuB Presents</span>
        </div>

        <div className="mb-8">
          <img 
            src={logo} 
            alt="INNOVAITE" 
            className="h-20 md:h-28 lg:h-36 mx-auto dark:hidden"
          />
          <img 
            src={logoDark} 
            alt="INNOVAITE" 
            className="h-20 md:h-28 lg:h-36 mx-auto hidden dark:block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.previousElementSibling?.classList.remove('dark:hidden');
            }}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center items-stretch mb-12 max-w-2xl mx-auto">
          <div className="flex-1 p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/30 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-primary">Event Dates</h3>
            </div>
            <p className="text-lg md:text-xl font-bold">29-30 November 2025</p>
          </div>
          
          <div 
            className="flex-1 p-4 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundImage: 'url(/map-famagosta.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-card/70 backdrop-blur-[2px]"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-primary">Location</h3>
              </div>
              <p className="text-lg md:text-xl font-bold">Randstad Box</p>
              <p className="text-xs text-muted-foreground">(Famagosta)</p>
            </div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          30 hours of innovation, creativity, and artificial intelligence
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button 
            size="default" 
            className="text-sm px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] transition-all duration-300 group"
            onClick={() => scrollToSection("registration")}
          >
            Register Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="default" 
            variant="outline"
            className="text-sm px-5 py-3 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            onClick={() => scrollToSection("about")}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;