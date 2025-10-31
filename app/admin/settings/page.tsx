"use client";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Appearance and workspace preferences
        </p>
      </header>

      <section className="rounded-2xl border border-border p-5 bg-card shadow-sm">
        <div className="font-semibold mb-2">Appearance</div>
        <div className="text-sm text-muted-foreground mb-4">
          Switch between light and dark themes
        </div>
        <ThemeToggle />
      </section>

      <section className="rounded-2xl border border-border p-5 bg-card shadow-sm">
        <div className="font-semibold mb-4">Workspace Details</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Workspace Name</Label>
            <Input id="name" placeholder="e.g., Acme Co-working" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="e.g., +234 801 234 5678" />
          </div>
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" type="email" placeholder="hello@example.com" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Street, City" />
          </div>
        </div>
        <div className="mt-4">
          <Button>Save changes</Button>
        </div>
      </section>
    </div>
  );
}
