import { Brain, Users, Lightbulb, Award } from "lucide-react";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo_dark.png";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Tackle real-world AI challenges proposed by industry partners"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Unite students from diverse backgrounds to create solutions"
    },
    {
      icon: Lightbulb,
      title: "Mentorship",
      description: "Learn from experts and receive guidance throughout the event"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Showcase your innovation and compete for amazing prizes"
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-primary/5">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            About
            <img
              src={logo}
              alt="INNOVAITE"
              className="h-10 md:h-12 dark:hidden"
            />
            <img
              src={logoDark}
              alt="INNOVAITE"
              className="h-10 md:h-12 hidden dark:block"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.previousElementSibling?.classList.remove('dark:hidden');
              }}
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            InnovAIte is a 30-hour AI hackathon organized by Bocconi Associations, uniting brilliant minds 
            to solve real-world AI challenges. 
            Experience a collaborative environment where innovation meets expertise, 
            with mentorship from industry leaders and the opportunity to work on cutting-edge AI solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;