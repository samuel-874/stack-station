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
import Image from "next/image";
import heroImage from "./../public/workspace.jpg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Floating Decorative Icons */}
      <div
        className="absolute top-32 left-[10%] animate-float"
        aria-hidden="true"
      >
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <Settings className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      <div
        className="absolute top-48 left-[15%] animate-float"
        style={{ animationDelay: "0.5s" }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-background">
          <ArrowRight className="w-5 h-5 text-foreground" />
        </div>
      </div>
      <div
        className="absolute top-56 left-[12%] animate-float"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <FileText className="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>
      <div
        className="absolute top-40 right-[12%] animate-float"
        style={{ animationDelay: "0.7s" }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-secondary-foreground" />
        </div>
      </div>
      <div
        className="absolute top-52 right-[18%] animate-float"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center bg-background">
          <Waves className="w-5 h-5 text-foreground" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Centered Hero Content */}
        <header className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <h1
            id="hero-heading"
            className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-14 tracking-tight"
          >
            Manage Your Workspace
            <span className="block mt-2">
              Reservations, timed check-ins & reliable reconciliation
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A simple, auditable platform for co-working and workstation owners
            to price segments, accept card or DVA payments, start timed
            sessions, and reconcile sales with ease.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center mb-8"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button
              size="lg"
              className="rounded-full px-8"
              aria-describedby="trial-description"
            >
              Get Started — Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              aria-describedby="demo-description"
            >
              Request Demo
            </Button>
          </div>

          {/* Screen reader descriptions for buttons */}
          <div className="sr-only">
            <p id="trial-description">
              Start your 14-day free trial of Stack-Station workspace management
              platform
            </p>
            <p id="demo-description">
              Schedule a guided demo to see Stack-Station features in action
            </p>
          </div>

          <div
            className="flex items-center justify-center space-x-2"
            role="img"
            aria-label="Customer rating: 4.9 out of 5 stars from 120+ workspace owners"
          >
            <div className="flex" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-foreground font-semibold">4.9</span>
            <span className="text-muted-foreground">
              from 120+ workspace owners
            </span>
          </div>
        </header>

        {/* Stats Cards Grid */}
        <div className="flex flex-wrap lg:mt-[-100px] lg:flex-nowrap items-end gap-6 max-w-7xl mx-auto animate-slide-up justify-center">
          {/* Large Image Card */}
          <div className="w-full lg:w-60 h-96 rounded-3xl overflow-hidden shadow-lg flex-shrink-0">
            <Image
              src={heroImage}
              alt="Stack-Station workspace management dashboard showing desk bookings, payment processing, and session timers for a modern co-working space"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              priority
              width={240}
              height={384}
              sizes="(max-width: 1024px) 100vw, 240px"
            />
          </div>

          {/* Automated Billing Card */}
          <div className="w-full lg:w-52 h-70 bg-primary text-primary-foreground rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <TrendingUp
              className="w-12 h-12 mb-4 opacity-90"
              aria-hidden="true"
            />
            <div className="text-base opacity-90 leading-relaxed">
              Automated Billing & Payment Reconciliation
            </div>
          </div>

          {/* Timed Sessions Card */}
          <div className="w-full lg:w-72 h-60 bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-6">
              <FileText
                className="w-6 h-6 text-secondary-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="text-xl font-semibold text-foreground mb-3">
              Real-Time Session Management
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Track desk occupancy with automatic timers and expiry
              notifications
            </div>
          </div>

          {/* DVA Payments Card */}
          <div className="w-full lg:w-52 h-70 bg-secondary text-secondary-foreground rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <BarChart3 className="w-12 h-12 mb-4" aria-hidden="true" />
            <div className="text-base leading-relaxed">
              Card & DVA Payment Support
            </div>
          </div>

          {/* Productivity Card */}
          <div className="w-full lg:w-60 h-96 bg-primary text-primary-foreground rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center flex-shrink-0">
            <Target className="w-16 h-16 mb-6 opacity-90" aria-hidden="true" />
            <div className="text-xl font-medium leading-relaxed">
              Streamline Revenue & Boost Workspace Efficiency
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
