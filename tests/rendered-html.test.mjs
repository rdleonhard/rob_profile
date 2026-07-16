import assert from "node:assert/strict";
import test from "node:test";

const metaTag = (name, content) =>
  new RegExp(
    `<meta(?=[^>]*(?:name|property)=["']${name}["'])(?=[^>]*content=["'][^"']*${content}[^"']*["'])[^>]*>`,
    "i",
  );

test("renders Robert Leonhard brand and sharing metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("https://robert-leonhard.ethlawyer.chatgpt.site/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Robert D\. Leonhard \| Attorney, Advisor &amp; Technologist<\/title>/i,
  );
  assert.match(html, metaTag("description", "Pennsylvania attorney"));
  assert.match(html, metaTag("og:title", "Robert D\\. Leonhard"));
  assert.match(html, metaTag("twitter:card", "summary_large_image"));
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /Starter Project/i);
});
