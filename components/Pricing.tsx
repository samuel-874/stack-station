import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for small businesses just getting started with modern manufacturing",
    price: "$39",
    period: "/month",
    features: [
      "Up to 100 products per month",
      "Basic quality control",
      "Email support",
      "Standard analytics",
    ],
    buttonVariant: "outline" as const,
  },
  {
    name: "Enterprise",
    description:
      "Ideal for growing companies scaling their production capabilities",
    price: "$99",
    period: "/month",
    features: [
      "Unlimited products per month",
      "Advanced quality control",
      "24/7 Priority support",
      "Advanced analytics dashboard",
      "Custom integrations available",
    ],
    buttonVariant: "accent" as const,
    popular: true,
  },
];

export const Pricing = () => {
  return (
    <section className="py-20 bg-black text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Tailored Plans for Your
            <span className="block mt-2">Manufacturing Scale</span>
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your production
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
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
