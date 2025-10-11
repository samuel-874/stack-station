"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function WorkstationOnboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/onboard/workstation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save workstation");
      const data = await res.json();
      toast({ title: "Onboarding complete", description: `Workspace created. Your role: ${data.role}` });
      router.push("/");
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Unable to save", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-background border border-border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-1">Workstation details</h1>
        <p className="text-muted-foreground mb-6">Please provide your workstation information. The first registered user in a workstation is assigned Admin by default.</p>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="Workspace name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={form.location} onChange={onChange} placeholder="City / Area" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="e.g. +2348012345678" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="contact@workspace.com" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={form.address} onChange={onChange} placeholder="Street address" required />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>{loading?"Saving...":"Save and continue"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
