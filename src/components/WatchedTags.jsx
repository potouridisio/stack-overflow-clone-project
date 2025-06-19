import { useEffect, useRef, useState } from "react";

export default function WatchedTags() {
  const divRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    });
  }, []);

  return (
    <div className="rounded border border-gray-300 p-4" ref={divRef}>
      <h2 className="mb-4 text-lg font-bold text-gray-900">Watched Tags</h2>
      {isEditing ? (
        <form className="flex">
          <input
            autoFocus
            className="grow rounded-l border-y border-l border-gray-300 px-3 py-2 text-sm"
          />
          <button
            className="rounded-r bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-700 active:bg-blue-900"
            type="submit"
          >
            Add
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-4 max-w-52 text-center text-sm text-gray-500">
            Watch tags to curate your list of questions.
          </p>
          <button
            className="rounded border border-blue-500 px-3 py-1.5 text-sm text-blue-500 hover:cursor-pointer hover:bg-blue-100 active:border-transparent active:bg-blue-300"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Watch a tag
          </button>
        </div>
      )}
    </div>
  );
}
