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
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {tags.map((tag) => (
        <div
          className="rounded border border-gray-300 p-4 text-sm"
          key={tag.id}
        >
          {tag.description}
        </div>
      ))}
    </div>
  );
}
