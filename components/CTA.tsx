import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start managing walk-ins and subscriptions today
          </h2>
          <p className="text-lg opacity-90 mb-10 leading-relaxed">
            Try Stack-Station free for 14 days or request a guided demo — see
            how timed check-ins, DVA payments and reports simplify daily
            reconciliation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="accent" size="lg" className="group shadow-2xl">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="group">
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
