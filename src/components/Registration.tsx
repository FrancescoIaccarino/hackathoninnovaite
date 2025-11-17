import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rocket, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo_dark.png";

const Registration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    degreeProgram: "",
    yearOfStudy: "",
    affiliation: "",
    affiliationOther: "",
    cv: null as File | null,
    linkedIn: "",
    github: "",
    hasTeam: false,
    teamMembers: "",
    wantTeamAssignment: false,
    firstTrack: "",
    secondTrack: "",
    motivation: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate degree program
    if (!formData.degreeProgram) {
      toast({
        title: "Error",
        description: "Please select your degree program.",
        variant: "destructive",
      });
      return;
    }

    // Validate year of study
    if (!formData.yearOfStudy) {
      toast({
        title: "Error",
        description: "Please select your year of study.",
        variant: "destructive",
      });
      return;
    }

    // Validate affiliation
    if (!formData.affiliation) {
      toast({
        title: "Error",
        description: "Please select your affiliation.",
        variant: "destructive",
      });
      return;
    }

    // Validate affiliation other field
    if (formData.affiliation === "other" && !formData.affiliationOther.trim()) {
      toast({
        title: "Error",
        description: "Please specify your affiliation.",
        variant: "destructive",
      });
      return;
    }

    // Validate team participation selection
    if (!formData.hasTeam && !formData.wantTeamAssignment) {
      toast({
        title: "Error",
        description: "Please select a team participation option.",
        variant: "destructive",
      });
      return;
    }

    // Validate track selection
    if (!formData.firstTrack) {
      toast({
        title: "Error",
        description: "Please select your preferred track.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert CV to base64 if present
      let cvData: string | undefined;
      let cvFileName: string | undefined;

      if (formData.cv) {
        cvFileName = formData.cv.name;
        const reader = new FileReader();
        cvData = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string;
            // Remove data URL prefix to get just base64
            resolve(base64.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.cv!);
        });
      }

      // Submit to Netlify function
      const response = await fetch('/.netlify/functions/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          degreeProgram: formData.degreeProgram,
          yearOfStudy: formData.yearOfStudy,
          affiliation: formData.affiliation === "other" ? formData.affiliationOther : formData.affiliation,
          linkedIn: formData.linkedIn,
          github: formData.github,
          hasTeam: formData.hasTeam,
          wantTeamAssignment: formData.wantTeamAssignment,
          teamMembers: formData.teamMembers,
          firstTrack: formData.firstTrack,
          secondTrack: formData.secondTrack,
          motivation: formData.motivation,
          cvFileName,
          cvData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Application Submitted! 🎉",
          description: "We'll review your application and get back to you soon.",
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          degreeProgram: "",
          yearOfStudy: "",
          affiliation: "",
          affiliationOther: "",
          cv: null,
          linkedIn: "",
          github: "",
          hasTeam: false,
          teamMembers: "",
          wantTeamAssignment: false,
          firstTrack: "",
          secondTrack: "",
          motivation: ""
        });

        // Reset file input
        const fileInput = document.getElementById('cv') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "There was an error submitting your application.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Could not submit application. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  return (
    <section id="registration" className="py-20 relative overflow-hidden bg-primary/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-6">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Applications Open</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3">
              <img
                src={logo}
                alt="INNOVAITE"
                className="h-9 md:h-11 md:self-end dark:hidden"
              />
              <img
                src={logoDark}
                alt="INNOVAITE"
                className="h-9 md:h-11 md:self-end hidden dark:block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.previousElementSibling?.classList.remove('dark:hidden');
                }}
              />
              <span className="hidden md:inline whitespace-nowrap">– </span><span className="text-primary text-center md:text-left whitespace-nowrap">Application Form</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
            
            <div className="max-w-3xl mx-auto space-y-4 text-left">
              <p className="text-base text-foreground leading-relaxed">
                Welcome to <span className="text-primary font-semibold">InnovAIte</span>, the AI hackathon that brings together students, developers, and aspiring innovators to create artificial intelligence projects with real-world impact.
              </p>
              <p className="text-base text-primary font-medium">
                📅 November 29–30 – Randstad Box (Famagosta)
              </p>
              <p className="text-sm text-muted-foreground">
                Applications are individual, but you can indicate your team members if you already have a group. 
                If you are applying alone, don't worry — we'll assign you to a balanced team based on skills and background.
              </p>
              
              <div className="pt-4 pb-2">
                <h3 className="text-lg font-semibold text-foreground mb-3">During the hackathon, participants can join one of two tracks:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="text-foreground font-medium">Tech Track (Hiop & Tada)</span> – focused on AI, data analysis, and machine learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="text-foreground font-medium">Entrepreneurial Track (Datapizza & University Network)</span> – focused on AI, startup design, and business models</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Please indicate your preferred track (non-binding).
                </p>
              </div>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="space-y-8 p-8 rounded-2xl bg-card border border-border/50 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {/* 1. Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                1. Personal Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base">Full Name *</Label>
                <Input 
                  id="fullName"
                  name="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">University Email *</Label>
                <Input 
                  id="email"
                  name="Email"
                  type="email"
                  placeholder="your.email@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">Phone Number *</Label>
                <Input 
                  id="phone"
                  name="Phone"
                  type="tel"
                  placeholder="+39 123 456 7890"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degreeProgram" className="text-base">Degree Program *</Label>
                  <Select 
                    value={formData.degreeProgram}
                    onValueChange={(value) => setFormData({...formData, degreeProgram: value})}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bai">BAI</SelectItem>
                      <SelectItem value="bemacs">BEMACS</SelectItem>
                      <SelectItem value="bess">BESS</SelectItem>
                      <SelectItem value="ai">AI</SelectItem>
                      <SelectItem value="daihs">DAIHS</SelectItem>
                      <SelectItem value="ess">ESS</SelectItem>
                      <SelectItem value="dsba">DSBA</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearOfStudy" className="text-base">Year of Study *</Label>
                  <Select 
                    value={formData.yearOfStudy}
                    onValueChange={(value) => setFormData({...formData, yearOfStudy: value})}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="msc1">MSc1</SelectItem>
                      <SelectItem value="msc2">MSc2</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="affiliation" className="text-base">Affiliation *</Label>
                <Select 
                  value={formData.affiliation}
                  onValueChange={(value) => setFormData({...formData, affiliation: value})}
                >
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select your affiliation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="astra-bocconi">Astra Bocconi</SelectItem>
                    <SelectItem value="bsml">BSML</SelectItem>
                    <SelectItem value="bsdsa">BSDSA</SelectItem>
                    <SelectItem value="bainsa">BAINSA</SelectItem>
                    <SelectItem value="voyce">Voyce</SelectItem>
                    <SelectItem value="thehacklab">The HackLab</SelectItem>
                    <SelectItem value="hephaestus">Hephaestus</SelectItem>
                    <SelectItem value="law4ai">Law4AI</SelectItem>
                    <SelectItem value="other">Other (please specify below)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.affiliation === "other" && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="affiliationOther" className="text-base">Please specify your affiliation *</Label>
                  <Input 
                    id="affiliationOther"
                    name="Affiliation Other"
                    type="text"
                    placeholder="Enter your affiliation"
                    value={formData.affiliationOther}
                    onChange={(e) => setFormData({...formData, affiliationOther: e.target.value})}
                    required={formData.affiliation === "other"}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>

            {/* 2. Experience and Profile */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                2. Experience and Profile
              </h3>

              <div className="space-y-2">
                <Label htmlFor="cv" className="text-base">Upload your CV (PDF) *</Label>
                <div className="relative">
                  <Input 
                    id="cv"
                    name="CV"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    className="h-15 py-2.5 bg-background/50 border-border/50 focus:border-primary transition-colors file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {formData.cv && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                      <Upload className="w-3 h-3" />
                      {formData.cv.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedIn" className="text-base">LinkedIn URL *</Label>
                <Input 
                  id="linkedIn"
                  name="LinkedIn"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="text-base">GitHub URL (Optional)</Label>
                <Input 
                  id="github"
                  name="GitHub"
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* 3. Participation */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                3. Participation
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base">Team Participation *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, hasTeam: true, wantTeamAssignment: false})}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.hasTeam
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-background/30 border-border/30 hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">I have a team</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, hasTeam: false, wantTeamAssignment: true, teamMembers: ''})}
                      className={`p-4 rounded-lg border transition-all ${
                        !formData.hasTeam && formData.wantTeamAssignment
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-background/30 border-border/30 hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">Assign me to a team</div>
                    </button>
                  </div>
                </div>

                {formData.hasTeam && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="teamMembers" className="text-base">
                      Please list names and emails of your teammates (max 4 people) *
                    </Label>
                    <Textarea 
                      id="teamMembers"
                      name="Team Members"
                      placeholder="Example:&#10;John Doe, john.doe@university.edu&#10;Jane Smith, jane.smith@university.edu"
                      value={formData.teamMembers}
                      onChange={(e) => setFormData({...formData, teamMembers: e.target.value})}
                      required
                      rows={5}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 4. Track Preference */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                4. Track Preference (non-binding)
              </h3>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please order your preferred tracks from 1 (most preferred) to 2 (least preferred)
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstTrack" className="text-base">1st Choice *</Label>
                    <Select 
                      value={formData.firstTrack}
                      onValueChange={(value) => {
                        setFormData({...formData, firstTrack: value, secondTrack: value === 'tech' ? 'entrepreneurial' : 'tech'})
                      }}
                    >
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tech Track (Hiop & Tada)</SelectItem>
                        <SelectItem value="entrepreneurial">Entrepreneurial Track (Datapizza & University Network)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondTrack" className="text-base">2nd Choice</Label>
                    <Input
                      value={formData.secondTrack === 'tech' ? 'Tech Track (Hiop & Tada)' : formData.secondTrack === 'entrepreneurial' ? 'Entrepreneurial Track (Datapizza & University Network)' : 'Will be auto-filled'}
                      disabled
                      className="bg-background/20 border-border/30 text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Motivation */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                5. Motivation
              </h3>

              <div className="space-y-2">
                <Label htmlFor="motivation" className="text-base">
                  In 3–5 sentences, tell us why you want to join INNOVAITE and what you hope to learn or achieve *
                </Label>
                <Textarea 
                  id="motivation"
                  name="Motivation"
                  placeholder="Share your passion for AI and what you hope to achieve at INNOVAITE..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  required
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>

            <Button 
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <Rocket className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              By submitting, you agree to participate in the full 30-hour hackathon experience
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;