import { CheckCircle2, TrendingUp, Users, BarChart3 } from "lucide-react";

const benefits = [
  {
    title: "Boosting Quality in Tech",
    description:
      "Our advanced technology ensures superior quality standards across all manufacturing processes, delivering exceptional results.",
  },
  {
    title: "Optimization Production Process",
    description:
      "Streamlined workflows and intelligent automation maximize efficiency, reducing costs while increasing output quality.",
  },
  {
    title: "AI Driven Production",
    description:
      "Harness the power of artificial intelligence to predict, optimize, and enhance every aspect of your production line.",
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
              Key Benefits of Our System
              <span className="block text-primary mt-2">
                for Your Business Efficiency
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              We deliver measurable results that drive your business forward
              with cutting-edge technology
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
