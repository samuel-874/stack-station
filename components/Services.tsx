import {
  Wrench,
  Factory,
  ShieldCheck,
  Lightbulb,
  Package,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Production and Assembly",
    description:
      "High-precision manufacturing and assembly services with cutting-edge automation.",
  },
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description:
      "Tailored manufacturing solutions designed to meet your specific requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    description:
      "Rigorous quality assurance processes ensuring excellence in every product.",
  },
  {
    icon: Lightbulb,
    title: "Technology and Innovation",
    description:
      "Leading-edge technology integration for maximum efficiency and innovation.",
  },
  {
    icon: Package,
    title: "Packaging and Logistics",
    description:
      "Comprehensive packaging and logistics management for seamless delivery.",
  },
  {
    icon: TrendingUp,
    title: "Conducting Market Research",
    description:
      "In-depth market analysis and research to drive strategic decisions.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Efficient and Integrated
            <span className="block mt-2">Manufacturing Services</span>
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We offer comprehensive solutions that streamline your manufacturing
            process from start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-15">
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
