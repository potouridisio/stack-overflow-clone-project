import { useEffect, useRef } from "react";

export async function getQuestions() {
  const response = await fetch("http://localhost:3000/questions");

  return await response.json();
}

export async function getTags() {
  const response = await fetch("http://localhost:3000/tags");

  return await response.json();
}

export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");

  return await response.json();
}

export function useClickAway(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [callback]);

  return ref;
}
