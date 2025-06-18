import { useEffect, useRef, useState } from "react";

export default function WatchedTags() {
  const divRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    });
  }, []);

  return (
    <div
      className="flex h-40 flex-col items-center rounded border border-gray-300 p-4"
      ref={divRef}
    >
      <h2 className="mb-4 self-start text-xl font-bold text-gray-900">
        Watched Tags
      </h2>
      {isOpen ? (
        <form className="flex">
          <input
            autoFocus
            className="rounded-l border-y border-l border-gray-300 px-3 py-2"
          />
          <button
            className="rounded-r bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-700 active:bg-blue-900"
            type="submit"
          >
            Add
          </button>
        </form>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-700">
            Watch tags to curate your list of questions.
          </p>
          <button
            className="rounded border border-blue-500 px-3 py-1.5 text-sm text-blue-500 hover:cursor-pointer hover:bg-blue-100 active:bg-blue-300"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            Watch a tag
          </button>
        </>
      )}
    </div>
  );
}
