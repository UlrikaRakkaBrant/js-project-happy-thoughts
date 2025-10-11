import { useEffect, useState } from "react";
import ThoughtForm from "./components/ThoughtForm/ThoughtForm.jsx";
import ThoughtCard from "./components/ThoughtCard/ThoughtCard.jsx";
import Loader from "./components/Loader/Loader.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";

export default function App() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Demo data to show layout; replace with API calls later
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setThoughts([
        { id: "a1", message: "I’m happy because we just moved into a new apartment!", hearts: 0, createdAt: new Date() },
        { id: "b2", message: "It’s my birthday!!!", hearts: 10, createdAt: new Date(Date.now() - 10 * 60 * 1000) },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  function addThought(text) {
    const t = { id: crypto.randomUUID(), message: text, hearts: 0, createdAt: new Date() };
    setThoughts((prev) => [t, ...prev]);
  }

  function likeThought(id) {
    setThoughts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, hearts: t.hearts + 1 } : t))
    );
  }

  return (
    <>
      <GlobalStyles />
      <main>
        <ThoughtForm onSubmit={addThought} />
        <Loader show={loading} />
        {thoughts.map((t) => (
          <ThoughtCard
            key={t.id}
            message={t.message}
            hearts={t.hearts}
            createdAt={t.createdAt}
            onHeart={() => likeThought(t.id)}
          />
        ))}
      </main>
    </>
  );
}
