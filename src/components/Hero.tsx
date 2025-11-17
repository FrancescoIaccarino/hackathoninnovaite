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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-8">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1.5s" }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-4 md:mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Bocconi Associations Present</span>
        </div>

        <div className="mb-6 md:mb-8">
          <img 
            src={logo} 
            alt="INNOVAITE" 
            className="h-16 md:h-28 lg:h-36 w-auto mx-auto dark:hidden"
          />
          <img 
            src={logoDark} 
            alt="INNOVAITE" 
            className="h-16 md:h-28 lg:h-36 w-auto mx-auto hidden dark:block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.previousElementSibling?.classList.remove('dark:hidden');
            }}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center md:items-stretch mb-8 md:mb-12 max-w-2xl mx-auto">
          <div className="md:flex-1 w-full md:max-w-xs p-3 md:p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/30 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-primary">Event Dates</h3>
            </div>
            <p className="text-lg md:text-xl font-bold">29-30 November 2025</p>
          </div>
          
          <div 
            className="md:flex-1 w-full md:max-w-xs p-3 md:p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/30 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            onClick={() => window.open('https://maps.app.goo.gl/WAPxzLxNwiosoUsJ6', '_blank')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.open('https://maps.app.goo.gl/WAPxzLxNwiosoUsJ6', '_blank'); } }}
          >
            {/* Keep the card background soft like Event Dates — remove heavy gradient overlay so it stays 'white' */}

            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-primary">Location</h3>
                </div>
                <p className="text-lg md:text-xl font-bold">Randstad Box</p>
                <p className="text-xs text-muted-foreground">(Famagosta)</p>
              </div>

              {/* Clickable map thumbnail aligned on the right */}
              <a
                href="https://maps.app.goo.gl/WAPxzLxNwiosoUsJ6"
                target="_blank"
                rel="noreferrer noopener"
                className="flex-shrink-0"
                aria-label="Open location in Google Maps"
                onClick={(e) => e.stopPropagation()} // prevent parent handler from opening a second tab
              >
                <div className="w-16 h-16 rounded-md overflow-hidden border border-border/30 transform hover:scale-105 transition-transform">
                  <img
                    src="/map-famagosta.png"
                    alt="Randstad Box map preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
          30 hours of innovation, creativity, and artificial intelligence
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 md:mb-16">
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

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce pointer-events-none">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-glow-pulse"></div>
          </div>
        </div>
      </div>

      {/* Remove the old absolute scroll indicator */}
    </section>
  );
};

export default Hero;