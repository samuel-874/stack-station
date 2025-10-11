import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            From Idea to Production in Days
          </h2>
          <p className="text-lg opacity-90 mb-10 leading-relaxed">
            Start your manufacturing journey today with our expert team. We'll
            help you transform your vision into reality with cutting-edge
            technology and proven processes.
          </p>
          <Button variant="accent" size="lg" className="group shadow-2xl">
            Book a Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
