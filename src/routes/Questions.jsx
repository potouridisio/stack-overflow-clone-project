import { useEffect, useState } from "react";

import { getQuestions, getTags } from "../utils";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const startFetching = async () => {
      const [questions, { tags }] = await Promise.all([
        getQuestions(),
        getTags(),
      ]);

      setQuestions(questions);
      setTags(tags.reduce((tagMap, tag) => ({ ...tagMap, [tag.id]: tag }), {}));
    };

    startFetching();
  }, []);

  return (
    <main className="grow py-6">
      <div className="mb-4 flex items-center justify-between pl-6">
        <h1 className="text-3xl text-gray-900">Newest Questions</h1>
        <a
          className="rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-700 active:bg-blue-900"
          href="#"
        >
          Ask Question
        </a>
      </div>
      <div className="mb-4 flex items-center justify-between pl-6">
        <p className="text-lg text-gray-900">
          {questions.length} question{questions.length === 1 ? "" : "s"}
        </p>
        <button
          className="rounded border border-blue-500 px-3 py-1.5 text-sm text-blue-500 hover:cursor-pointer hover:bg-blue-100"
          type="button"
        >
          Filter
        </button>
      </div>
      <div className="divide-y divide-gray-300 border-y border-gray-300">
        {questions.map((question) => (
          <div className="flex gap-4 p-4" key={question.id}>
            <div className="w-32 flex-none">
              <ul className="flex flex-col items-end gap-2 py-1 text-sm text-gray-900">
                <li>{question.voteCount} votes</li>
                <li>
                  {question.answerCount > 0 ? (
                    <div className="inline-flex h-6 items-center rounded border border-green-700 px-1.5 text-xs text-green-700">
                      {question.answerCount} answer
                      {question.answerCount === 1 ? "" : "s"}
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
                {question.tagIds.map((tagId) => (
                  <li className="inline-flex" key={tagId}>
                    <a
                      className="inline-flex h-6 items-center rounded bg-gray-100 px-1.5 text-xs font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                      href="#"
                    >
                      {tags[tagId].name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
