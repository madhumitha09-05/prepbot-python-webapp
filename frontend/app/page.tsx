"use client";

import { useState, useEffect } from "react";
import { Bot, Send, Sparkles, Sun, Moon } from "lucide-react";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [questionType, setQuestionType] = useState("Both");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tagline, setTagline] = useState("");

  const fullTagline = "Get Ready. Get Hired. Get Confident.";

  // Typing animation for tagline
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTagline(fullTagline.slice(0, i++));
      if (i > fullTagline.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Toggle light/dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_description: jobDescription, question_type: questionType }),
      });

      const data = await res.json();
      setResponse(data.response || data.error);
    } catch {
      setResponse("Error connecting to API.");
    }

    setLoading(false);
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center ${
        darkMode ? "bg-zinc-900" : "bg-zinc-50"
      } font-sans p-4 transition-colors duration-500`}
    >
      <main className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-zinc-800 relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-5 right-5 text-gray-600 dark:text-gray-300 hover:text-yellow-400 transition"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Header with PrepBot Branding */}
        <div className="text-center mt-2">
          <div className="flex justify-center items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
            <Bot size={34} />
            <h1 className="text-3xl font-bold tracking-tight">PrepBot</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm h-6">{tagline}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <textarea
            placeholder="Enter job title or description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Question Type Buttons */}
          <div className="flex gap-3 justify-center mt-2">
            {["Technical", "Behavioral", "Both"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setQuestionType(type)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  questionType === type
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "border-gray-300 dark:border-zinc-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-1"
          >
            {loading ? (
              <>
                <Sparkles className="animate-spin" size={18} /> Generating...
              </>
            ) : (
              <>
                <Send size={18} /> Generate Questions
              </>
            )}
          </button>
        </form>

        {/* Response Box */}
        {response && (
          <div className="whitespace-pre-wrap p-4 border border-gray-300 rounded-md dark:border-zinc-700 dark:text-white bg-zinc-50 dark:bg-zinc-800 mt-4 text-sm leading-relaxed shadow-inner">
            {response}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-6 text-center text-gray-400 text-xs flex flex-col items-center gap-1">
          <Bot size={14} className="text-blue-500" />
          <p>
            <span className="font-semibold text-blue-600 dark:text-blue-400">PrepBot</span> - 
            Your AI-powered interview partner for smarter preparation and confident answers.
          </p>
        </footer>
      </main>
    </div>
  );
}
