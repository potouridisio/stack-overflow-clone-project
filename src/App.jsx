import { useEffect, useState } from "react";

import { getQuestions, getTags } from "./utils";

function App() {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    Promise.all([getQuestions(), getTags()]).then(([questions, { tags }]) => {
      setQuestions(questions);
      setTags(tags);
    });
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <button
          // prettier-ignore
          className={`flex items-center rounded-lg border border-blue-500${open ? " bg-blue-300" : ""} px-3 py-1.5 font-medium text-blue-500 hover:cursor-pointer hover:bg-blue-100`}
          onClick={() => setOpen(!open)}
          type="button"
        >
          <svg
            className="mr-1 size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filter
        </button>
      </div>
      {/* TODO: move to a new component */}
      <div className="divide-y divide-gray-300 rounded border border-gray-300">
        {questions.map((question) => (
          <div className="flex gap-4 p-4" key={question.id}>
            <div className="w-32 flex-none">
              <ul className="flex flex-col items-end gap-2 py-1 text-sm">
                <li>{question.voteCount} votes</li>
                <li>
                  {question.answerCount > 0 ? (
                    <div className="inline-flex h-6 items-center rounded border border-green-700 text-green-700">
                      <span className="px-1">
                        {question.answerCount} answer
                        {question.answerCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-500">0 answers</div>
                  )}
                </li>
              </ul>
            </div>
            <div>
              <a
                className="mb-1 block text-xl text-blue-500 hover:text-blue-700"
                href="#"
              >
                {question.title}
              </a>
              <p className="mb-2 line-clamp-2 text-gray-700">{question.body}</p>
              <ul className="flex items-center gap-2">
                {question.tagIds.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);

                  return (
                    <li className="inline-flex" key={tagId}>
                      <a
                        className="inline-flex h-5 items-center rounded bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                        href="#"
                      >
                        <span className="px-1"> {tag.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
