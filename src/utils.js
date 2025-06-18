export async function getQuestions() {
  const response = await fetch("http://localhost:3000/questions");

  return await response.json();
}

export async function getTags() {
  const response = await fetch("http://localhost:3000/tags");

  return await response.json();
}
