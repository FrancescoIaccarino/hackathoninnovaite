import { Calendar, Clock, Zap } from "lucide-react";

const Schedule = () => {
  const scheduleData = [
    {
      day: "Day 1",
      date: "Saturday",
      events: [
        { time: "10:00 AM", endTime: "11:00 AM", title: "Opening Ceremony", description: "Teams registration and welcome from organizers" },
        { time: "11:00 AM", endTime: "12:00 PM", title: "Keynote Panels", description: "Industry experts share insights on AI trends" },
        { time: "12:00 PM", title: "Challenge Reveal and Hackathon Begins!", description: "Competition challenges are revealed and the hackathon officially starts" },
      ]
    },
    {
      day: "Day 2",
      date: "Sunday",
      events: [
        { time: "12:00 PM", title: "Project Submissions", description: "It's time to submit your projects" },
        { time: "12:00 PM", endTime: "02:00 PM", title: "Final Presentations", description: "Pitch your projects to judges" },
        { time: "02:00 PM", endTime: "03:00 PM", title: "Awards Ceremony", description: "Winners announced and prizes awarded" },
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
                      <div className="text-sm">
                        <div>{event.time}</div>
                        {event.endTime && <div>{event.endTime}</div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
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