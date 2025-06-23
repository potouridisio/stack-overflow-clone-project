import { useEffect, useState } from "react";

import { getTags, useClickAway, useDebounce } from "../utils";

export default function WatchedTags({ onAddWatchedTag, tagMap, watchedTags }) {
  const isWatching = watchedTags.length > 0;
  const [isEditing, setIsEditing] = useState(false);
  const ref = useClickAway(() => {
    setIsEditing(false);
  });
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (debouncedSearchText) {
      (async () => {
        const { tags } = await getTags(debouncedSearchText);

        setTags(tags);
      })();
    } else {
      setTags([]);
    }
  }, [debouncedSearchText]);

  const handleAddWatchedTag = (event) => {
    event.preventDefault();

    setSelectedTag(null);

    onAddWatchedTag(selectedTag.id);
  };

  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value);
    setSelectedTag(null);
  };

  const handleClickEdit = (event) => {
    event.preventDefault();

    setIsEditing(true);
  };

  const handleClickTag = (tag) => {
    setSearchText("");
    setSelectedTag(tag);
    setTags([]);
  };

  return (
    <div className="rounded border border-gray-300 p-4" ref={ref}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Watched Tags</h2>
        {!isEditing && isWatching ? (
          <a
            className="inline-flex text-sm text-blue-500 hover:text-blue-700"
            href="#"
            onClick={handleClickEdit}
          >
            edit
          </a>
        ) : null}
      </div>
      {isWatching ? (
        <ul className="flex items-center gap-2">
          {watchedTags.map((tagId) => (
            <li className="inline-flex" key={tagId}>
              <a
                className="inline-flex items-center rounded bg-gray-100 p-1 text-xs font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                href="#"
              >
                {tagMap[tagId]?.name}
                {isEditing ? (
                  <svg
                    className="-mr-px ml-0.5 size-4 text-gray-500 hover:text-red-700"
                    fill="currentColor"
                    onClick={(event) => event.preventDefault()}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                      fillRule="evenodd"
                    />
                  </svg>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {isEditing ? (
        <form className="mt-4 flex" onSubmit={handleAddWatchedTag}>
          <div className="relative flex grow">
            <input
              autoFocus
              className="grow rounded-l border-y border-l border-gray-300 p-2 text-sm"
              onChange={handleChangeSearchText}
              value={selectedTag?.name ?? searchText}
            />
            {tags.length ? (
              <div className="absolute top-full left-1/2 z-10 w-full -translate-x-1/2 bg-white shadow">
                <ul className="py-2">
                  {tags.map((tag) => (
                    <li
                      className="p-2 text-gray-900 hover:bg-orange-500 hover:text-white"
                      onClick={() => handleClickTag(tag)}
                      key={tag.id}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <button
            className="rounded-r bg-blue-500 p-2 text-sm text-white hover:bg-blue-700 active:bg-blue-900"
            type="submit"
          >
            Add
          </button>
        </form>
      ) : null}
      {!isEditing && !isWatching ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 max-w-52 text-center text-sm text-gray-500">
            Watch tags to curate your list of questions.
          </p>
          <button
            className="rounded border border-blue-500 p-1.5 text-sm text-blue-500 hover:cursor-pointer hover:bg-blue-100 active:border-transparent active:bg-blue-300"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Watch a tag
          </button>
        </div>
      ) : null}
    </div>
  );
}
