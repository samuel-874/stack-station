import { Button } from "@/components/ui/button";
import { Box, Database, Cloud, Cpu, Gauge, Lock } from "lucide-react";

const integrations = [
  { icon: Box, color: "text-blue-500", delay: "0ms" },
  { icon: Database, color: "text-green-500", delay: "100ms" },
  { icon: Cloud, color: "text-purple-500", delay: "200ms" },
  { icon: Cpu, color: "text-orange-500", delay: "300ms" },
  { icon: Gauge, color: "text-pink-500", delay: "400ms" },
  { icon: Lock, color: "text-indigo-500", delay: "500ms" },
];

export const Integration = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Empowering Top Companies
              <span className="block text-primary mt-2">
                with Seamless Integrations
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Connect with industry-leading platforms and tools to streamline
              your manufacturing workflow. Our robust API enables effortless
              integration with your existing systems.
            </p>
            <Button variant="accent" size="lg" className="group">
              View All Integrations
            </Button>
          </div>

          {/* Right Content - Integration Icons */}
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/30 rounded-3xl blur-3xl animate-float" />
            <div className="relative bg-secondary/50 backdrop-blur-sm rounded-3xl p-12 border border-border">
              <div className="grid grid-cols-3 gap-8">
                {integrations.map((Integration, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center animate-slide-up"
                    style={{ animationDelay: Integration.delay }}
                  >
                    <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 hover:border-primary/50 group">
                      <Integration.icon
                        className={`w-8 h-8 ${Integration.color} group-hover:scale-125 transition-transform`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute top-4 right-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-float"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-8 left-8 w-16 h-16 bg-primary/20 rounded-full blur-2xl animate-float"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
