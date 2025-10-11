import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description:
      "For small workspaces and solo owners. Start accepting payments and managing timed sessions.",
    price: "₦8,000",
    period: "/month",
    features: [
      "Create up to 3 segments",
      "Time-based pricing bands",
      "Cash & card payments (Paystack)",
      "Daily sales report",
    ],
    buttonVariant: "accent" as const,
  },
  {
    name: "Standard",
    description:
      "Best for growing workspaces — DVA, reconciliation tools, and shift reports.",
    price: "₦20,000",
    period: "/month",
    features: [
      "Up to 10 segments",
      "Dedicated Virtual Account (DVA) support",
      "Automated webhook reconciliation",
      "Shift & rep-level reports",
      "Priority email support",
    ],
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Premium",
    description:
      "For multi-location operators — advanced reporting, API access and priority support.",
    price: "Contact",
    period: "",
    features: [
      "Unlimited segments & locations",
      "Advanced exports & CSV upload for reconciliation",
      "API access & custom integrations",
      "Dedicated account manager",
    ],
    buttonVariant: "accent" as const,
  },
];

export const Pricing = () => {
  return (
    <section className="py-20 bg-black text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Plans for Every Workspace
            <span className="block mt-2">
              from single-locations to multi-site operators
            </span>
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Pick a plan that fits your size — upgrade anytime as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-primary-foreground/5 backdrop-blur-sm border ${
                plan.popular
                  ? "border-accent ring-2 ring-accent"
                  : "border-primary-foreground/10"
              } rounded-2xl p-8 w-full hover:bg-primary-foreground/10 transition-all duration-300 hover:shadow-2xl animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-primary-foreground/70 text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-6 flex items-end gap-3">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-primary-foreground/70 text-sm">
                  {plan.period}
                </span>
              </div>

              <Button
                variant={plan.buttonVariant}
                size="lg"
                className="w-full mb-6 group rounded-full"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <hr className="border-primary-foreground/10 w-24" />
                  <span className="text-sm text-primary-foreground/70">
                    Features
                  </span>
                  <hr className="border-primary-foreground/10 w-24" />
                </div>

                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent-foreground" />
                    </div>
                    <span className="text-primary-foreground/90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Plan */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <h3 className="text-3xl font-bold mb-3">Professional</h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Designed for greater flexibility, this solution offers advanced
              tools for custom tailoring to your needs.
            </p>
            <Button variant="accent" size="lg" className="rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
