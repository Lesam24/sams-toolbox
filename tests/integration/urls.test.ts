import { describe, expect, it } from "vitest";

import { POST } from "../../src/app/api/urls/route";

describe("URL shortener API", () => {
  it("creates a short URL", async () => {
    const request = new Request(
      "http://localhost:3000/api/urls",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://example.com",
        }),
      }
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.code).toHaveLength(6);
    expect(body.shorturl).toContain(body.code);
  });

  it("rejects an invalid URL", async () => {
    const request = new Request(
      "http://localhost:3000/api/urls",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "not-a-url",
        }),
      }
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid URL");
  });
});