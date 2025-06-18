import { useEffect, useState } from "react";

import { getTags } from "../utils";

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const startFetching = async () => {
      const { tags } = await getTags();

      setTags(tags);
    };

    startFetching();
  }, []);

  return (
    <>
      <h1 className="mb-4 grow text-3xl">Tags</h1>
      <p className="mb-4 max-w-2xl">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>
      <div className="grid grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div
            className="flex flex-col items-start space-y-2 rounded border border-gray-300 p-4 text-sm text-gray-900"
            key={tag.id}
          >
            <a
              className="inline-flex h-6 items-center rounded bg-gray-100 px-2 text-xs font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-900"
              href="#"
            >
              {tag.name}
            </a>
            <p className="line-clamp-4 grow">{tag.description}</p>
            <span className="text-xs text-gray-700">
              {tag.occurrenceCount} question
              {tag.occurrenceCount === 1 ? "" : "s"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
