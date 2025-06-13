const baseURL = "http://localhost:3000";

export async function getQuestions() {
  const response = await fetch(`${baseURL}/questions`);
  return await response.json();
}

export async function getTags() {
  const response = await fetch(`${baseURL}/tags`);
  return await response.json();
}
