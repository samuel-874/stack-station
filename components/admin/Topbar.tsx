"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Topbar() {
  const [q, setQ] = useState("");
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search reservations, reps, payments..."
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Topbar;
