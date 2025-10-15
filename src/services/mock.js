// src/services/mock.js
// Fake data to use while the API is offline

export async function fetchThoughtsMock() {
  // pretend these came from the server
  return [
    {
      _id: "1",
      message: "Mock data is working — yay!",
      hearts: 3,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      message: "You can still build even when the API is down 💪",
      hearts: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ];
}

export async function createThoughtMock(message) {
  // create a new fake thought object
  return {
    _id: crypto.randomUUID(),
    message,
    hearts: 0,
    createdAt: new Date().toISOString(),
  };
}

export async function likeThoughtMock(id) {
  // pretend the server increased hearts
  return { ok: true };
}
