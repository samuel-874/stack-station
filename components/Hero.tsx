import { Button } from "@/components/ui/button";
import {
  Star,
  ArrowRight,
  TrendingUp,
  Target,
  Settings,
  FileText,
  BarChart3,
  Waves,
} from "lucide-react";
import heroImage from "./../public/workspace.jpg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 overflow-hidden bg-background"
    >
      {/* Floating Decorative Icons */}
      <div className="absolute top-32 left-[10%] animate-float">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <Settings className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      <div
        className="absolute top-48 left-[15%] animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-background">
          <ArrowRight className="w-5 h-5 text-foreground" />
        </div>
      </div>
      <div
        className="absolute top-56 left-[12%] animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <FileText className="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>
      <div
        className="absolute top-40 right-[12%] animate-float"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>
      <div
        className="absolute top-52 right-[18%] animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-background">
          <Waves className="w-5 h-5 text-foreground" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Centered Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            The Future of Manufacturing
            <span className="block mt-2">with Latest Technology</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Expert tech to elevate your manufacturing. Let's take your business
            further.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button size="lg" className="rounded-full px-8">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Try Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-semibold">5.0</span>
            <span className="text-muted-foreground">from 80+ reviews</span>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="flex flex-wrap lg:mt-[-100px] lg:flex-nowrap items-end gap-6 max-w-7xl mx-auto animate-slide-up justify-center">
          {/* Large Image Card */}
          <div className="w-full lg:w-60 h-96 rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
            <img
              src={heroImage.src}
              alt="Modern Manufacturing Technology"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 100+ Card */}
          <div className="w-full lg:w-52 h-70 bg-primary text-primary-foreground rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <div className="text-6xl font-bold mb-4">100+</div>
            <div className="text-base opacity-90 leading-relaxed">
              Our Esteemed Clients and Partners
            </div>
          </div>

          {/* 1951+ Card */}
          <div className="w-full lg:w-72 h-60 bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-6">
              <FileText className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              Total Projects
              <span className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-semibold">
                i
              </span>
              <span className="font-semibold">8%</span>
            </div>
            <div className="text-5xl font-bold text-foreground mb-4">1951+</div>
            <div className="text-sm text-muted-foreground mt-auto">
              Increase of <span className="text-accent font-semibold">126</span>{" "}
              this month
            </div>
          </div>

          {/* 6+ Card */}
          <div className="w-full lg:w-52 h-70 bg-secondary text-secondary-foreground rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <div className="text-6xl font-bold mb-4">6+</div>
            <div className="text-base leading-relaxed">
              Years of Dedicated Service
            </div>
          </div>

          {/* Productivity Card */}
          <div className="w-full lg:w-60 h-96 bg-primary text-primary-foreground rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <Target className="w-16 h-16 mb-6 opacity-90" />
            <div className="text-xl font-medium leading-relaxed">
              Achieve Optimal Efficiency and Boost Productivity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
