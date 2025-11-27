import { useEffect, useState } from "react";
import ThoughtForm from "./components/ThoughtForm/ThoughtForm.jsx";
import ThoughtCard from "./components/ThoughtCard/ThoughtCard.jsx";
import Loader from "./components/Loader/Loader.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import {
  fetchThoughts,
  createThought,
  likeThought,
  updateThought,
  deleteThought,
} from "./services/api.js";
import AuthForm from "./components/Auth/AuthForm.jsx";
import { useAuth } from "./hooks/useAuth.js";

export default function App() {
  const { isLoggedIn, user } = useAuth();
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likingIds, setLikingIds] = useState(new Set());
  const [error, setError] = useState("");

  // Load thoughts
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchThoughts();
        setThoughts(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (e) {
        console.error(e);
        setError(e.message || "Could not load thoughts.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Create new thought
  async function addThought(text) {
    if (!isLoggedIn) {
      alert("You need to be logged in to post a thought.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const newThought = await createThought(text);
      setThoughts((prev) => [newThought, ...prev]);
    } catch (e) {
      console.error(e);
      setError(e.message || "Could not post your thought.");
    } finally {
      setSubmitting(false);
    }
  }

  // Like a thought
  async function handleHeart(id) {
    if (!isLoggedIn) {
      alert("You need to be logged in to like a thought.");
      return;
    }

    setThoughts((prev) =>
      prev.map((t) => (t._id === id ? { ...t, hearts: t.hearts + 1 } : t))
    );
    setLikingIds((prev) => new Set(prev).add(id));

    try {
      await likeThought(id);
    } catch (e) {
      console.error(e);
      setError(e.message || "Could not send a heart.");
      // rollback
      setThoughts((prev) =>
        prev.map((t) => (t._id === id ? { ...t, hearts: t.hearts - 1 } : t))
      );
    } finally {
      setLikingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  // Delete thought
  async function handleDelete(id) {
    if (!window.confirm("Delete this thought?")) return;

    const previous = thoughts;
    setThoughts((prev) => prev.filter((t) => t._id !== id));

    try {
      await deleteThought(id);
    } catch (e) {
      console.error(e);
      setError(e.message || "Could not delete thought.");
      // rollback
      setThoughts(previous);
    }
  }

  // (Optional) Edit thought – here a simple prompt, you can later make a proper UI
  async function handleEdit(id, currentMessage) {
    const newMessage = window.prompt("Edit your thought:", currentMessage);
    if (!newMessage || newMessage === currentMessage) return;

    try {
      const updated = await updateThought(id, { message: newMessage });
      setThoughts((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );
    } catch (e) {
      console.error(e);
      setError(e.message || "Could not update thought.");
    }
  }

  return (
    <>
      <GlobalStyles />
      <main>
        {/* Auth section */}
        <AuthForm />

        {/* Error display */}
        {error && <p style={{ color: "#c00" }}>{error}</p>}

        {/* Thought form – disable if not logged in */}
        <ThoughtForm
          onSubmit={addThought}
          submitting={submitting}
          disabled={!isLoggedIn}
        />

        <Loader show={loading} />

        {!loading &&
          thoughts.map((t) => {
            const canEdit = isLoggedIn && user?.userId && t.owner === user.userId;
            return (
              <ThoughtCard
                key={t._id}
                message={t.message}
                hearts={t.hearts}
                createdAt={t.createdAt}
                author={t.author}
                onHeart={() => handleHeart(t._id)}
                disabled={likingIds.has(t._id)}
                canEdit={canEdit}
                onDelete={canEdit ? () => handleDelete(t._id) : undefined}
                onEdit={canEdit ? () => handleEdit(t._id, t.message) : undefined}
              />
            );
          })}
      </main>
    </>
  );
}
