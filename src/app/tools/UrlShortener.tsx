"use client";

import { FormEvent, useState } from "react";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      setShortUrl(data.shortUrl);
    } catch {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="tool-panel">
      <div className="tool-panel-header">
        <p className="eyebrow">Tool</p>
        <h1>URL Shortener</h1>
        <p>
          Turn a long URL into a short, shareable link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="tool-form">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <p className="tool-error">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="tool-result">
          <p>Your shortened URL</p>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </section>
  );
}