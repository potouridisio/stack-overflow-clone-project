import { useEffect, useRef, useState } from "react";

export async function getQuestions() {
  const response = await fetch("http://localhost:3000/questions");

  return await response.json();
}

export async function getTags(searchText) {
  const response = await fetch(
    `http://localhost:3000/tags${searchText ? `?q=${searchText}` : ""}`,
  );

  return await response.json();
}

export async function getUsers() {
  const response = await fetch("http://localhost:3000/users");

  return await response.json();
}

export async function getWatchedTags() {
  const response = await fetch("http://localhost:3000/users/1/watchedTags");

  return await response.json();
}

export async function saveWatchedTags(watchedTags) {
  const response = await fetch("http://localhost:3000/users/1/watchedTags", {
    body: JSON.stringify(watchedTags),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });

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

export function useDebounce(value, delay) {
  const timeoutID = useRef(0);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    clearTimeout(timeoutID.current);

    timeoutID.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [delay, value]);

  return debouncedValue;
}
export function IsWatched(question, watchedTags) {
            for (let i = 0; i < question.tagIds.length; i++) {
              for (let j = 0; j < watchedTags.length; j++) {
                if (question.tagIds[i] === watchedTags[j]) {
                  return true;
                }
              }
            }
            return false;
          }
export function HighlightTag(tagId, watchedTags) {
  const redo = [];
            for (let j = 0; j < watchedTags.length; j++) {
              if (tagId === watchedTags[j] && watchedTags[j] != redo[j]) { 
                redo.push(tagId)
                return true;
              }
              else if (tagId === watchedTags[j] && watchedTags[j] === redo[j]){
                continue;
              }
            }
            return false; 
          }
