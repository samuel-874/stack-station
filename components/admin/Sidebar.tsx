"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Settings,
  BarChart3,
  Layers,
  CreditCard,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/segments", label: "Segments", icon: Layers },
  { href: "/admin/reservations", label: "Reservations", icon: Calendar },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-dvh sticky top-0 w-64 border-r border-border bg-background hidden md:flex flex-col">
      <div className="h-16 px-4 border-b border-border flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">SS</span>
        </div>
        <div className="font-bold">Stack-Station</div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm"
          onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
      <div className="p-3 text-xs text-muted-foreground">
        © {new Date().getFullYear()} AppBakery LTD
      </div>
    </aside>
  );
}

export default Sidebar;
