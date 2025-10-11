import { CheckCircle2, TrendingUp, Users, BarChart3 } from "lucide-react";

const benefits = [
  {
    title: "Time-based pricing & segments",
    description:
      "Create floors and segments (Regular, VIP, Private) and set per-segment time bands and prices so your front desk charges consistently.",
  },
  {
    title: "Paystack & Dedicated Virtual Accounts (DVA)",
    description:
      "Accept card payments or generate DVAs for easy bank transfers. Webhooks ensure payments are verified and reconciled automatically.",
  },
  {
    title: "Sessions, timers & expiries",
    description:
      "Start timed sessions at check-in, push expiry warnings, and extend sessions — all server-authoritative for accurate billing.",
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Stats */}
          <div className="animate-fade-in">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Total Reports
                </span>
              </div>

              {/* Bar Chart Representation */}
              <div className="space-y-4 mb-6">
                {[
                  { label: "Production", value: 85, color: "bg-accent" },
                  { label: "Quality", value: 70, color: "bg-primary" },
                  { label: "Efficiency", value: 95, color: "bg-secondary" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </span>
                  <TrendingUp className="w-5 h-5 text-accent ml-auto" />
                </div>
                <div className="text-4xl font-bold text-foreground">1951+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Growth in the last quarter
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits List */}
          <div className="animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Built for workspace owners
              <span className="block text-primary mt-2">
                check-ins, payments & reconciliation
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Simple, auditable workflows so your sales team can process
              walk-ins fast and your accounting always matches the bank.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex gap-4 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
