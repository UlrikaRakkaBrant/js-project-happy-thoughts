//export const App = () => {
//return (
//<h1>Happy Thoughts</h1>
//)
//}

import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ThoughtForm from './components/ThoughtForm/ThoughtForm';
import ThoughtCard from './components/ThoughtCard/ThoughtCard';

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Courier New', monospace; background: #f2f2f2; color: #333; }
`;

const AppWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 16px;
`;

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .finally(() => setLoading(false));
  }, []);

  const addThought = (newThought) => {
    setThoughts((prev) => [newThought, ...prev]);
  };

  const incrementHeart = (id) => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`, {
      method: 'POST'
    }).then(() => {
      setThoughts((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, hearts: t.hearts + 1 } : t
        )
      );
    });
  };

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <h1>Happy Thoughts 😊</h1>
        <ThoughtForm onSubmit={addThought} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          thoughts.map((t) => (
            <ThoughtCard
              key={t._id}
              thought={t}
              onLike={() => incrementHeart(t._id)}
            />
          ))
        )}
      </AppWrapper>
    </>
  );
}

export default App;