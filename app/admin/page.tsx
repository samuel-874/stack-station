import { Button } from "@/components/ui/button";
import { CreditCard, Timer, Users, Layers } from "lucide-react";

function Card({
  title,
  description,
  icon: Icon,
  cta,
}: {
  title: string;
  description: string;
  icon: any;
  cta?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
          {cta ? <div className="mt-3">{cta}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Manage segments, timed sessions, payments and reports from your
          dashboard.
        </p>
      </header>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Real-time sessions"
          description="Start, extend, and auto-expire desk sessions with server timers."
          icon={Timer}
          cta={<Button size="sm">View active sessions</Button>}
        />
        <Card
          title="Card & DVA payments"
          description="Collect via Paystack checkout or Dedicated Virtual Accounts."
          icon={CreditCard}
          cta={<Button size="sm">Open payments</Button>}
        />
        <Card
          title="Segments & pricing"
          description="Create floors/segments and set time-based price bands."
          icon={Layers}
          cta={<Button size="sm">Configure pricing</Button>}
        />
      </section>

      <section className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="font-semibold mb-2">Today’s activity</div>
          <div className="text-sm text-muted-foreground">
            Session expiries, recent payments and check-ins will appear here
            once wired.
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="font-semibold mb-3">Quick actions</div>
          <div className="grid gap-2">
            <Button variant="outline">Add a Sales Rep</Button>
            <Button variant="outline">Create a Segment</Button>
            <Button variant="outline">View Reports</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
