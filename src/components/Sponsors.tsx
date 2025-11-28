import { Crown, Users, Building2 } from "lucide-react";
import { useState } from "react";

const Sponsors = () => {
  const sponsorTiers = [
    {
      tier: "Sponsors",
      icon: Crown,
      color: "text-primary",
      sponsors: ["astra-bocconi", "egroup", "hotiday", "cvc", "lovable", "venti-136"],
      description: "Premier partners driving AI innovation"
    },
    {
      tier: "Supported by",
      icon: Users,
      color: "text-accent",
      sponsors: ["hiop", "university-network", "datapizza", "tada", "starting-finance", "randstad-box"],
      description: "Supporting the future of AI"
    },
    // {
    //   tier: "Organized by",
    //   icon: Building2,
    //   color: "text-muted-foreground",
    //   sponsors: ["astra-bocconi", "bainsa", "bsdsa", "bsml", "hephaestus", "law4ai", "thehacklab", "voyce"],
    //   description: "Student organizations making it happen"
    // }
  ];

  // Helper to try loading image
  const getSponsorImage = (sponsorId: string, isDark: boolean = false) => {
    try {
      const suffix = isDark ? '_dark' : '';
      return new URL(`../assets/sponsor/${sponsorId}${suffix}.png`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  // Helper to format sponsor name for display
  const formatSponsorName = (sponsorId: string) => {
    return sponsorId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Component to render sponsor with dark mode support
  const SponsorLogo = ({ sponsorId }: { sponsorId: string }) => {
    const [lightError, setLightError] = useState(false);
    const [darkError, setDarkError] = useState(false);
    const lightSrc = getSponsorImage(sponsorId, false);
    const darkSrc = getSponsorImage(sponsorId, true);

    if (lightError && darkError) {
      return (
        <div className="flex items-center gap-2 text-foreground">
          <Building2 className="w-5 h-5" />
          <span className="font-medium">{formatSponsorName(sponsorId)}</span>
        </div>
      );
    }

    return (
      <>
        {lightSrc && !lightError && (
          <img
            src={lightSrc}
            alt={formatSponsorName(sponsorId)}
            className="h-12 w-auto object-contain dark:hidden"
            onError={() => setLightError(true)}
          />
        )}
        {darkSrc && !darkError && (
          <img
            src={darkSrc}
            alt={formatSponsorName(sponsorId)}
            className="h-12 w-auto object-contain hidden dark:block"
            onError={() => {
              setDarkError(true);
            }}
          />
        )}
        {darkError && lightSrc && !lightError && (
          <img
            src={lightSrc}
            alt={formatSponsorName(sponsorId)}
            className="h-12 w-auto object-contain hidden dark:block"
          />
        )}
      </>
    );
  };

  return (
    <section className="py-20 relative overflow-hidden bg-primary/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sponsors & <span className="text-primary">Partners</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partnering with industry leaders to create opportunities for innovation and collaboration
          </p>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {sponsorTiers.map((tier, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <tier.icon className={`w-8 h-8 ${tier.color}`} />
                <h3 className="text-2xl md:text-3xl font-bold">{tier.tier}</h3>
              </div>
              
              <p className="text-center text-muted-foreground mb-6">{tier.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {tier.sponsors.map((sponsor, sponsorIndex) => (
                  <div 
                    key={sponsorIndex}
                    className="aspect-video rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 flex items-center justify-center p-6 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group"
                  >
                    <SponsorLogo sponsorId={sponsor} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-card/50 border border-primary/30 backdrop-blur-sm">
            <h4 className="text-xl font-semibold mb-3">Interested in Sponsoring?</h4>
            <p className="text-muted-foreground mb-4">
              Join us in shaping the future of AI innovation
            </p>
            <a 
              href="mailto:sponsors@innovaite.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
            >
              Become a Sponsor
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Sponsors;