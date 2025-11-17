import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo_dark.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50 bg-card/30 relative overflow-hidden">

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={logo}
                alt="INNOVAITE"
                className="h-8 dark:hidden"
              />
              <img
                src={logoDark}
                alt="INNOVAITE"
                className="h-8 hidden dark:block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.previousElementSibling?.classList.remove('dark:hidden');
                }}
              />
            </div>
            <p className="text-muted-foreground">
              30 hours of innovation, creativity, and artificial intelligence
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <a 
                href="mailto:info@innovaite.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>aihub.bocconistudents@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow us!</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/ai-hub-bocconi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a 
                href="https://www.instagram.com/innovaite.bocconi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              {/* <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>© {currentYear} InnovAIte. All rights reserved.</p>
          <p className="mt-2">
            Organized by student associations from Bocconi University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;