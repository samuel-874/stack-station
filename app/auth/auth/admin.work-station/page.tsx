"use client";
// pages/index.js
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [time, setTime] = useState(0);

  // Simple timer for the Time Tracker
  useEffect(() => {
    const start = Date.now();
    const t = setInterval(() => {
      setTime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatHMS = (s) => {
    const h = Math.floor(s / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((s % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <>
      <Head>
        <title>Donezo — Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Tailwind CDN for quick prototype */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root{
            --accent-green: #1f7a4c;
            --muted: #6b7280;
            font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          }
          /* soft background similar to the image */
          body { background: linear-gradient(180deg,#f3f4f6 0%, #eef2f6 100%); }
          /* small card radius and subtle shadows */
          .card { border-radius: 14px; background: white; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
        `}</style>
      </Head>

      <main className="min-h-screen p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-8">
            {/* SIDEBAR */}
            <aside className="w-64">
              <div className="card p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Donezo</div>
                    <div className="text-xs text-gray-400">
                      Project Dashboard
                    </div>
                  </div>
                </div>

                <nav className="space-y-1 text-sm">
                  <NavItem label="Dashboard" active />
                  <NavItem label="Tasks" badge="24" />
                  <NavItem label="Calendar" />
                  <NavItem label="Analytics" />
                  <NavItem label="Team" />
                </nav>

                <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                  <div className="mb-3">General</div>
                  <div className="flex flex-col gap-2">
                    <a className="flex items-center gap-3 hover:text-gray-900">
                      <IconCog /> Settings
                    </a>
                    <a className="flex items-center gap-3 hover:text-gray-900">
                      <IconHelp /> Help
                    </a>
                    <a className="flex items-center gap-3 hover:text-gray-900">
                      <IconLogout /> Logout
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="card p-4 bg-gradient-to-tr from-green-700 to-green-800 text-white">
                    <div className="text-sm">Download our</div>
                    <div className="font-semibold text-xl">Mobile App</div>
                    <button className="mt-3 px-4 py-2 rounded-md bg-white text-green-800 font-semibold">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        placeholder="Search task"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        ⌘F
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 5v7l5 3"
                          stroke="#374151"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="hidden md:inline">Notifications</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 flex items-center justify-center text-white">
                        TM
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Totok Michael</div>
                        <div className="text-xs text-gray-400">
                          tmichael20@mail.com
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard header */}
              <div className="card p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-gray-500">
                      Plan, prioritize, and accomplish your tasks with ease.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-md border border-gray-200 text-sm">
                      Import Data
                    </button>
                    <button className="px-4 py-2 rounded-md bg-green-700 text-white text-sm">
                      + Add Project
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-12 gap-4">
                {/* Stats */}
                <div className="col-span-12 md:col-span-7 lg:col-span-8 grid grid-cols-12 gap-4">
                  <StatCard
                    title="Total Projects"
                    value="24"
                    note="Increased from last month"
                    className="col-span-12 sm:col-span-4"
                  >
                    <div className="text-sm text-white/90">24</div>
                  </StatCard>

                  <StatCard
                    title="Ended Projects"
                    value="10"
                    className="col-span-12 sm:col-span-4"
                    note="Increased from last month"
                  />
                  <StatCard
                    title="Running Projects"
                    value="12"
                    className="col-span-12 sm:col-span-4"
                    note="Increased from last month"
                  />

                  <div className="col-span-12 grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-7 card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-medium">Project Analytics</div>
                        <div className="text-xs text-gray-400">Weekly</div>
                      </div>
                      {/* small bar chart using SVG */}
                      <div className="flex items-end gap-3 h-28">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => {
                          const heights = [18, 45, 48, 72, 55, 40, 28];
                          return (
                            <div
                              key={i}
                              className="flex-1 flex flex-col items-center"
                            >
                              <div
                                style={{
                                  height: `${heights[i]}%`,
                                  width: "100%",
                                }}
                                className={`w-full rounded-t-md ${
                                  i === 3 ? "bg-green-700" : "bg-green-200"
                                }`}
                              ></div>
                              <div className="text-xs text-gray-400 mt-2">
                                {d}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-5 card p-4">
                      <div className="font-medium mb-2">Reminders</div>
                      <div className="text-sm text-gray-600">
                        Meeting with Arc Company
                      </div>
                      <div className="text-xs text-gray-400 mb-4">
                        Time: 02:00 pm - 04:00 pm
                      </div>
                      <button className="px-3 py-2 rounded-md bg-green-700 text-white">
                        Start Meeting
                      </button>
                    </div>
                  </div>

                  {/* Team Collaboration + Project Progress */}
                  <div className="col-span-12 md:col-span-7 mt-2 card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Team Collaboration</div>
                      <button className="text-xs px-2 py-1 border rounded">
                        + Add Member
                      </button>
                    </div>

                    <ul className="space-y-3">
                      <TeamMember
                        name="Alexandra Deff"
                        role="Working on Github Project Repository"
                        status="Completed"
                      />
                      <TeamMember
                        name="Edwin Adenike"
                        role="Working on Integrate User Authentication System"
                        status="In Progress"
                      />
                      <TeamMember
                        name="Isaac Oluwatemilorun"
                        role="Working on Developer Search and Filter Functionality"
                        status="Pending"
                      />
                      <TeamMember
                        name="David Ghodsi"
                        role="Working on Responsive Layout for Homepage"
                        status="In Progress"
                      />
                    </ul>
                  </div>

                  <div className="col-span-12 md:col-span-5 mt-2 card p-4">
                    <div className="font-medium mb-2">Project Progress</div>
                    <div className="flex items-center gap-4">
                      <div className="w-36 h-36 flex items-center justify-center">
                        <Donut percent={41} />
                      </div>
                      <div>
                        <div className="text-2xl font-semibold">41%</div>
                        <div className="text-sm text-gray-500">
                          Project Ended
                        </div>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-600 rounded-full"></span>{" "}
                            Completed
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>{" "}
                            In Progress
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>{" "}
                            Pending
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-4">
                  <div className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Pending Project</div>
                      <div className="text-sm text-gray-400">2 On Discuss</div>
                    </div>

                    <div className="space-y-3">
                      <ProjectItem
                        title="Develop API Endpoints"
                        due="Due date: Nov 20, 2024"
                        color="indigo"
                      />
                      <ProjectItem
                        title="Onboarding Flow"
                        due="Due date: Nov 22, 2024"
                        color="teal"
                      />
                      <ProjectItem
                        title="Build Dashboard"
                        due="Due date: Nov 23, 2024"
                        color="rose"
                      />
                      <ProjectItem
                        title="Optimize Page Load"
                        due="Due date: Dec 05, 2024"
                        color="amber"
                      />
                      <ProjectItem
                        title="Cross-Browser Testing"
                        due="Due date: Dec 06, 2024"
                        color="slate"
                      />
                    </div>

                    <div className="mt-3 text-right">
                      <button className="px-3 py-2 rounded-md border text-sm">
                        + New
                      </button>
                    </div>
                  </div>

                  <div className="card p-4 bg-gradient-to-br from-green-900 to-green-700 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs">Time Tracker</div>
                        <div className="text-xl font-semibold">
                          {formatHMS(time)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 19V5l12 7-12 7z"
                              stroke="white"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 6h12v12H6z"
                              stroke="white"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-white/80">
                      Currently tracking:{" "}
                      <span className="font-medium">Onboarding Flow</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

/* -----------------------
   Helper presentational components
   ----------------------- */

function NavItem({ label, active, badge }) {
  return (
    <a
      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
        active
          ? "bg-green-50 text-green-700 font-semibold"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-80"
      >
        <path
          d="M3 12h18"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="text-xs bg-green-700 text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      ) : null}
    </a>
  );
}

function StatCard({ title, value = "—", note, children, className = "" }) {
  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-semibold text-gray-800">{value}</div>
          {note ? (
            <div className="text-xs text-gray-400 mt-1">{note}</div>
          ) : null}
        </div>
        <div className="self-end">{children}</div>
      </div>
    </div>
  );
}

function TeamMember({ name, role, status }) {
  const color =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "In Progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-600";
  return (
    <li className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-700">
        {name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium text-gray-800">{name}</div>
          <div className={`text-xs px-2 py-1 rounded ${color}`}>{status}</div>
        </div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </li>
  );
}

function ProjectItem({ title, due, color = "indigo" }) {
  const colorMap = {
    indigo: "bg-indigo-100 text-indigo-700",
    teal: "bg-teal-100 text-teal-700",
    rose: "bg-rose-100 text-rose-700",
    amber: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-3 h-3 rounded-full mt-2 ${
          colorMap[color] || "bg-gray-200"
        }`}
      ></div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium text-gray-800">{title}</div>
          <div className="text-xs text-gray-400">{due.split(":")[1] || ""}</div>
        </div>
        <div className="text-xs text-gray-500">{due}</div>
      </div>
    </div>
  );
}

// Simple donut chart using SVG
function Donut({ percent = 60, size = 120, stroke = 14 }) {
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const dash = (percent / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2},${size / 2})`}>
        <circle r={radius} fill="none" stroke="#e6e6e6" strokeWidth={stroke} />
        <circle
          r={radius}
          fill="none"
          stroke="url(#g)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90)`}
        />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontSize="18"
          fontWeight="600"
          fill="#111827"
        >
          {percent}%
        </text>
      </g>
    </svg>
  );
}

/* small icons */
function IconCog() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-80"
    >
      <path
        d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 012.28 17.9l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82L4.21 3.68A2 2 0 016.04.85l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V.5A2 2 0 0114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.22.34.36.72.41 1.12"
        stroke="#6b7280"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconHelp() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-80"
    >
      <path
        d="M12 18h.01"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.5 9.5a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-80"
    >
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17l5-5-5-5"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12H9"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
