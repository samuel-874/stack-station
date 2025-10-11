import { Mail, Linkedin, Twitter, Github } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">
                  F
                </span>
              </div>
              <span className="text-xl font-bold">Firstnext</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Cutting-edge manufacturing solutions powered by the latest
              technology. Transforming industries one innovation at a time.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#production"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Production Solutions
                </a>
              </li>
              <li>
                <a
                  href="#quality"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Quality Control
                </a>
              </li>
              <li>
                <a
                  href="#analytics"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#help"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {currentYear} Firstnext. All rights reserved.
          </p>

          <div className="flex items-center space-x-2">
            <a
              href="#privacy"
              className="text-background/60 hover:text-accent text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-background/40">•</span>
            <a
              href="#terms"
              className="text-background/60 hover:text-accent text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-background/60 hover:text-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-accent transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
