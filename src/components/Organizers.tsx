import { Building2 } from "lucide-react";
import { useState } from "react";

const Organizers = () => {
  const associations = [
    "astra-bocconi",
    "bsml",
    "bsdsa",
    "bainsa",
    "voyce",
    "thehacklab",
    "hephaestus",
    "law4ai"
  ];

  // Helper to try loading image
  const getOrganizerImage = (organizerId: string, isDark: boolean = false) => {
    try {
      const suffix = isDark ? '_dark' : '';
      return new URL(`../assets/sponsor/${organizerId}${suffix}.png`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  // Helper to format organizer name for display
  const formatOrganizerName = (organizerId: string) => {
    return organizerId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Component to render organizer with dark mode support
  const OrganizerLogo = ({ organizerId }: { organizerId: string }) => {
    const [lightError, setLightError] = useState(false);
    const [darkError, setDarkError] = useState(false);
    const lightSrc = getOrganizerImage(organizerId, false);
    const darkSrc = getOrganizerImage(organizerId, true);

    if (lightError && darkError) {
      return (
        <div className="flex items-center gap-2 text-foreground">
          <Building2 className="w-5 h-5" />
          <span className="font-medium text-center">{formatOrganizerName(organizerId)}</span>
        </div>
      );
    }

    return (
      <>
        {lightSrc && !lightError && (
          <img
            src={lightSrc}
            alt={formatOrganizerName(organizerId)}
            className="max-w-full max-h-full object-contain dark:hidden"
            onError={() => setLightError(true)}
          />
        )}
        {darkSrc && !darkError && (
          <img
            src={darkSrc}
            alt={formatOrganizerName(organizerId)}
            className="max-w-full max-h-full object-contain hidden dark:block"
            onError={() => {
              setDarkError(true);
            }}
          />
        )}
        {darkError && lightSrc && !lightError && (
          <img
            src={lightSrc}
            alt={formatOrganizerName(organizerId)}
            className="max-w-full max-h-full object-contain hidden dark:block"
          />
        )}
      </>
    );
  };

  return (
    <section className="py-20 bg-card/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Organized <span className="text-primary">By</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collaborative effort by leading student associations from Bocconi University
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {associations.map((association, index) => (
              <div 
                key={index}
                className="aspect-square rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-6 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <OrganizerLogo organizerId={association} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-3">
                Powered by <span className="text-primary">Bocconi AI HuB</span>
              </h3>
              <p className="text-muted-foreground max-w-lg">
                AI HuB brings together passionate students and industry leaders 
                to advance artificial intelligence through education, innovation, and collaboration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organizers;