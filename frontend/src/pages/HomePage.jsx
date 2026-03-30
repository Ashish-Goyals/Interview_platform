import { Link } from "react-router";
import {
  Sparkles,
  ArrowRightIcon,
  ZapIcon,
  CheckIcon,
  VideoIcon,
  Code2Icon,
  UsersIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/react";
const HomePage = () => {
  const features = [
    {
      id: 1,
      icon: VideoIcon,
      title: "HD Video Call",
      description:
        "Crystal clear video and audio for seamless communication during interviews.",
    },
    {
      id: 2,
      icon: Code2Icon,
      title: "Live Code Editor",
      description:
        "Collaborate in real-time with syntax highlighting and multiple language support.",
    },
    {
      id: 3,
      icon: UsersIcon,
      title: "Easy Collaboration",
      description:
        "Share your screen, discuss solutions, and learn from each other in real-time.",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Navbar */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 p-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <Sparkles className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Interview{" "}
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">
                Code Together
              </span>
            </div>
          </Link>
          {/* Auth Button */}

          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>{" "}
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* Hero Section  */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content  */}
          <div className="space-y-8">
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaboration coding interviews and pair
              programming, Connect face-to-face, code in real-time, and ace your
              technical interviews.
            </p>
            {/* FEAUTER PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>
            {/* CTA Buttons  */}
            <div className="flex flex-wrap gap-4 ">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg ">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>
              <button className="btn btn-outline btn-lg">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>
            {/* STATS  */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-200 shadow-lg">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>
          {/* Right Image  */}
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full h-auto rounded-3xl shadow-2xl border-4  border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Feature Section  */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless
            and productive{" "}
          </p>
        </div>

        {/* Features Grid    */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.id} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="size-8 text-primary" />
                  </div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
