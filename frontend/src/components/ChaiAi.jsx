import React from "react";
import { useNavigate } from "react-router-dom";

const buddies = [
  {
    name: "Hitesh Choudhary",
    slug: "hitesh-chat",
    role: "YouTuber & Tech Mentor",
    description:
      "Retired from corporate life and now a full-time YouTuber. Former founder of LCO (acquired), ex-CTO and Sr. Director at PhysicsWallah. With two YouTube channels (950k & 470k subscribers), Hitesh has shared his tech journey across 43 countries.",
    tags: [
      "YouTube",
      "Tech Career",
      "Leadership",
      "LCO",
      "Global Speaker",
      "Startups",
      "System Design",
      "Node.js",
      "Project-Based Learning",
    ],
  },
  {
    name: "Piyush Garg",
    slug: "piyush-chat",
    role: "Founder at Teachyst & Educator",
    description:
      "Building Teachyst — a platform empowering educators and creators. Piyush shares insights on backend development, cloud-native tools, and system design through his YouTube and educational content.",
    tags: [
      "Docker",
      "Backend",
      "Cloud",
      "Startups",
      "System Design",
      "Node.js",
      "Project-Based Learning",
    ],
  },
  {
    name: "Rakesh (Coder's Gyan)",
    role: "Fullstack Developer & Educator",
    slug: "rakesh-chat",
    description:
      "I help you become a fullstack engineer. Founder of Coder’s Gyan. Passionate about building with JavaScript and Golang, and focused on transforming learners into confident engineers.",
    tags: [
      "Full Stack",
      "JavaScript",
      "Golang",
      "Project-Based Learning",
      "Education",
    ],
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 md:px-16 lg:px-32">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-orange-400">TalkOverChai</h1>
        <nav className="space-x-6">
          {/* <a
            href="#"
            className="hover:underline"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:underline"
          >
            About
          </a> */}
        </nav>
      </header>

      <section className="text-center mb-10">
        <h2 className="text-3xl font-bold text-orange-400">TalkOverChai</h2>
        <p className="text-gray-400 font-medium mb-8 mt-2">
          Desi Conversations. Global Intelligence.
        </p>
        <p className="text-gray-400 mt-2">
          Select who you'd like to chat with today
        </p>
      </section>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {buddies.map((buddy, i) => (
          <div
            key={i}
            className={`border p-6 rounded-xl border-gray-700 bg-gray-900 shadow-md flex flex-col justify-between`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-orange-400 font-semibold text-lg">
                {buddy.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {buddy.name}
                </h3>
                <p className="text-sm text-gray-400">{buddy.role}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm">{buddy.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {buddy.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-600 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigate(`/${buddy.slug}`)}
              className="bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 rounded-md text-white font-medium"
            >
              Start Chat →
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-extrabold mb-6">Comming Soon....</h2>
        <h3 className="text-lg font-semibold text-white mb-2">
          Chat with both at the same time!
        </h3>
        <p className="text-gray-400 mb-4">
          Get insights from multiple AI buddies in a single conversation
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-6 py-2 rounded-md text-white font-medium">
          Start Group Chat
        </button>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        © 2025 TalkOverChai • Created with ❤️
      </footer>
    </main>
  );
}
