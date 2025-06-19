import { useState } from "react";

import { useClickAway } from "../utils";

export default function WatchedTags() {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useClickAway(() => {
    setIsEditing(false);
  });

  return (
    <div className="rounded border border-gray-300 p-4" ref={ref}>
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
