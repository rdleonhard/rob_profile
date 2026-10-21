export default function NotFound() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <main className="not-found">
      <p className="kicker">Not of record</p>
      <h1>There is no page at this address.</h1>
      <p className="doc-links">
        <a href={`${basePath}/`}>Return to the record ↑</a>
      </p>
    </main>
  );
}
