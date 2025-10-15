import { useEffect, useState } from "react";
import ThoughtForm from "./components/ThoughtForm/ThoughtForm.jsx";
import ThoughtCard from "./components/ThoughtCard/ThoughtCard.jsx";
import Loader from "./components/Loader/Loader.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import { fetchThoughts, createThought, likeThought } from "./services/api.js";

export default function App() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);      // initial page loader
  const [submitting, setSubmitting] = useState(false); // form submit loader
  const [likingIds, setLikingIds] = useState(new Set()); // per-card like loader

  // ---- Lifecycle: run once on mount (componentDidMount)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchThoughts();
        // latest first (API already does this, but keep it explicit)
        setThoughts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (e) {
        console.error(e);
        alert(
          "The Happy Thoughts API is currently unavailable (503). You can keep working with mock data — flip USE_MOCK to true in src/services/apiBase.js."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // ---- Create a new thought (validate maintained by your form)
  async function addThought(text) {
    try {
      setSubmitting(true);
      const newThought = await createThought(text);
      setThoughts(prev => [newThought, ...prev]); // prepend (optimistic via API response)
    } catch (e) {
      console.error(e);
      alert(e.message || "Could not post your thought.");
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Like a thought (optimistic UI + rollback on error)
  async function handleHeart(id) {
    // optimistic bump
    setThoughts(prev => prev.map(t => (t._id === id ? { ...t, hearts: t.hearts + 1 } : t)));
    setLikingIds(prev => new Set(prev).add(id));

    try {
      await likeThought(id);
      // If API returns updated doc you could merge it here (not required)
    } catch (e) {
      console.error(e);
      // rollback
      setThoughts(prev => prev.map(t => (t._id === id ? { ...t, hearts: t.hearts - 1 } : t)));
      alert("Could not send a heart. Try again.");
    } finally {
      setLikingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <>
      <GlobalStyles />
      <main>
        <ThoughtForm onSubmit={addThought} submitting={submitting} />
        <Loader show={loading} />
        {!loading &&
          thoughts.map((t) => (
            <ThoughtCard
              key={t._id}
              message={t.message}
              hearts={t.hearts}
              createdAt={t.createdAt}
              onHeart={() => handleHeart(t._id)}
              disabled={likingIds.has(t._id)}
            />
          ))}
      </main>
    </>
  );
}
