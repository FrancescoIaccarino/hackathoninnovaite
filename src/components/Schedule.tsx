import { Calendar, Clock, Zap } from "lucide-react";

const Schedule = () => {
  const scheduleData = [
    {
      day: "Day 1",
      date: "Saturday",
      events: [
        { time: "9:30 AM", endTime: "10:00 AM", title: "Registration & Welcome", description: "Teams check-in and welcome coffee" },
        { time: "10:00 AM", endTime: "10:15 AM", title: "Institutional Greetings", description: "Student Representative: Armando Mastromartino, CDS President." },
        { time: "10:15 AM", endTime: "11:30 AM", title: "Panel: \"Humans vs Algorithms\"", description: "Industry experts from DataPizza, E-Group and Starting Finance share their insights" },
        { time: "11:30 AM", endTime: "11:50 AM", title: "Technical Briefing & Rules", description: "Explanation of the challenges and pitch by our Tech Partners" },
        { time: "11:50 AM", endTime: "12:00 PM", title: "Teams Placement" },
        { time: "12:00 PM", title: "HACKATHON BEGINS!🚀" },
        { time: "1:00 PM", endTime: "2:00 PM", title: "Lunch" },
        { time: "2:00 PM", endTime: "8:00 PM", title: "Working Phase & Mentoring", description: "Teams work on their projects with mentoring support" },
        { time: "8:00 PM", endTime: "9:00 PM", title: "Dinner" },
        { time: "9:00 PM", endTime: "Late Night", title: "Night Mode", description: "Coding and chilling" },
      ]
    },
    {
      day: "Day 2",
      date: "Sunday",
      events: [
        { time: "9:00 AM", endTime: "10:30 AM", title: "\"Power\" Breakfast & Final Rush" },
        { time: "10:30 AM", title: "End of Entrepreneurship track", description: "Final submissions for presentations and other material for Entrepreneurship track teams" },
        { time: "10:45 AM", endTime: "11:45 AM", title: "Pitch Session (Entrepreneurship)", description: "Entrepreneurship track teams present their projects to the jury" },
        { time: "12:00 PM", title: "End of Machine Learning Track", description: "Final submissions for results and code for Machine Learning track teams" },
        { time: "12:00 PM", endTime: "12:30 PM", title: "Jury Validates the leaderboard (ML)", description: "Machine Learning track jury reviews and validates the code and the leaderboard" },
        { time: "12:30 PM", endTime: "1:15 PM", title: "Awards Ceremony & Final Remarks", description: "Winners from both tracks are announced, they pitch their projects and receive their prizes" },
        { time: "1:15 PM", title: "End of Event" },
      ]
    }
  ];

  return (
    <section className="py-20 bg-card/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Event <span className="text-primary">Schedule</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-primary animate-icon-glow" />
            <span className="text-lg font-semibold text-primary">Non-stop 24h Hackathon Experience</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {scheduleData.map((day, dayIndex) => (
            <div 
              key={dayIndex}
              className="rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${dayIndex * 0.2}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold">{day.day}</h3>
                  <p className="text-muted-foreground">{day.date}</p>
                </div>
              </div>

              <div className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div 
                    key={eventIndex}
                    className="flex gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border/30"
                  >
                    <div className="flex items-center gap-2 text-primary font-semibold min-w-[100px]">
                      <Clock className="w-4 h-4" />
                      <div className="text-sm text-center">
                        <div>{event.time}</div>
                        {event.endTime && <div>{event.endTime}</div>}
                      </div>
                    </div>
                    <div className={`flex-1 ${!event.description ? 'flex items-center' : ''}`}>
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;