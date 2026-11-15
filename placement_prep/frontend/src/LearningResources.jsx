import { useState } from "react";
import { KEYS, useStored } from "./storage.js";
import { resources, resourceCategories } from "./data/resourcesData.js";

export default function LearningResources() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [bookmarks, setBookmarks] = useStored(KEYS.bookmarks, []);

  const q = query.trim().toLowerCase();
  const list = resources.filter(
    (r) =>
      (category === "All" || r.category === category) &&
      (!savedOnly || bookmarks.includes(r.id)) &&
      (!q || `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(q))
  );

  function toggle(id) {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI LIBRARY</p>
          <h1>Learning Resources</h1>
          <p>Trusted free platforms for coding, core CS, aptitude and career prep. Save your favourites.</p>
        </div>
        <div className="coding-progress">
          <strong>{bookmarks.length}</strong>
          <span>saved resources</span>
        </div>
      </div>

      <div className="m-toolbar">
        <label className="m-search">
          <span className="m-label">Search</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try SQL, DSA, aptitude..." />
        </label>
        <label className="m-check m-inline">
          <input type="checkbox" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} />
          <span>Saved only</span>
        </label>
      </div>

      <div className="m-row m-wrap m-gap">
        {["All", ...resourceCategories].map((c) => (
          <button key={c} className={`m-pill ${category === c ? "on" : ""}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="m-empty">No resources match. Try another category or clear the search.</p>
      ) : (
        <div className="m-grid">
          {list.map((r) => (
            <article className="m-card" key={r.id}>
              <div className="m-row m-space">
                <span className="m-tag">{r.category}</span>
                <button
                  className={`m-star ${bookmarks.includes(r.id) ? "on" : ""}`}
                  onClick={() => toggle(r.id)}
                  aria-pressed={bookmarks.includes(r.id)}
                  aria-label={`${bookmarks.includes(r.id) ? "Remove" : "Save"} ${r.title}`}
                >
                  {bookmarks.includes(r.id) ? "★" : "☆"}
                </button>
              </div>
              <h3>{r.title}</h3>
              <p className="m-muted-text">{r.description}</p>
              <div className="m-row m-space">
                <span className="m-muted">{r.cost}</span>
                <a className="m-link" href={r.url} target="_blank" rel="noopener noreferrer">Open site ↗</a>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="m-muted">These links open external websites. Availability and pricing can change.</p>
    </div>
  );
}
