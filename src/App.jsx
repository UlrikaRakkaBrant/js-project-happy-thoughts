// src/App.jsx
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
import MockBanner from "./components/MockBanner/MockBanner.jsx";
import AuthForm from "./components/Auth/AuthForm.jsx";
import { useAuth } from "./hooks/useAuth.js";

export default function App() {
  const { user, isLoggedIn } = useAuth();

  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likingIds, setLikingIds] = useState(new Set());

  // ----------------------------
  // FETCH THOUGHTS ON LOAD
  // ----------------------------
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const results = await fetchThoughts(); // already returns data.results
        setThoughts(
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (e) {
        console.error(e);
        alert(
          "Could not load thoughts. The API may be unavailable. Try again later."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ----------------------------
  // CREATE THOUGHT
  // ----------------------------
  async function addThought(message) {
    if (!isLoggedIn) {
      alert("You must be logged in to post a thought.");
      return;
    }

    try {
      setSubmitting(true);
      const newThought = await createThought(message);
      setThoughts((prev) => [newThought, ...prev]);
    } catch (e) {
      console.error(e);
      alert(e.message || "Could not post your thought.");
    } finally {
      setSubmitting(false);
    }
  }

  // ----------------------------
  // LIKE THOUGHT
  // ----------------------------
  async function handleHeart(id) {
    if (!isLoggedIn) {
      alert("You must be logged in to like thoughts.");
      return;
    }

    // optimistic update
    setThoughts((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, hearts: t.hearts + 1 } : t
      )
    );
    setLikingIds((prev) => new Set(prev).add(id));

    try {
      await likeThought(id);
    } catch (e) {
      console.error(e);
      // rollback
      setThoughts((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, hearts: t.hearts - 1 } : t
        )
      );
      alert("Could not send a heart. Try again.");
    } finally {
      setLikingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  // ----------------------------
  // DELETE THOUGHT
  // ----------------------------
  async function handleDelete(id) {
    if (!isLoggedIn) return;

    const ok = window.confirm("Delete this thought?");
    if (!ok) return;

    try {
      await deleteThought(id);
      setThoughts((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      alert(e.message || "Could not delete thought.");
    }
  }

  // ----------------------------
  // EDIT THOUGHT (simple version)
  // ----------------------------
  async function handleEdit(id) {
    const current = thoughts.find((t) => t._id === id);
    const newMessage = window.prompt("Edit your message:", current.message);

    if (!newMessage || newMessage.length < 5) {
      alert("Message must be at least 5 characters.");
      return;
    }

    try {
      const updated = await updateThought(id, { message: newMessage });
      setThoughts((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );
    } catch (e) {
      alert(e.message || "Could not update thought.");
    }
  }

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <>
      <GlobalStyles />
      <MockBanner />

      {/* Authentication box (login/signup/logout) */}
      <AuthForm />

      <main>
        {/* Only logged-in users can post */}
        <ThoughtForm onSubmit={addThought} submitting={submitting} disabled={!isLoggedIn} />

        <Loader show={loading} />

        {!loading &&
          thoughts.map((t) => (
            <ThoughtCard
              key={t._id}
              message={t.message}
              hearts={t.hearts}
              createdAt={t.createdAt}
              author={t.author}
              onHeart={() => handleHeart(t._id)}
              disabled={likingIds.has(t._id)}
              canEdit={isLoggedIn && t.owner === user?.userId}
              onEdit={() => handleEdit(t._id)}
              onDelete={() => handleDelete(t._id)}
            />
          ))}
      </main>
    </>
  );
}
