import React, { useState } from "react";
import axios from "axios";

function VideoSummary() {
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarizeLink = async () => {
    if (!link) {
      alert("Please enter a YouTube link.");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const response = await axios.post("http://localhost:5000/api/summarize", {
        link: link,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
      setSummary("⚠️ Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        🎬 YouTube Video Summarizer
      </h1>

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">
          📎 Summarize YouTube Link
        </h2>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          className="border p-2 rounded w-full mb-3"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          onClick={handleSummarizeLink}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
        >
          🧠 Generate Summary
        </button>
      </div>

      {loading && <p className="text-white">⏳ Generating summary...</p>}

      {summary && (
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-2xl mt-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-2">📝 Summary:</h2>
          <div
            className="prose prose-sm"
            dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, "<br>") }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default VideoSummary;
