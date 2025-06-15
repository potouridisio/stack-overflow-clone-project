import { useEffect, useState } from "react";

import { getQuestions, getTags, getUsers } from "./utils";

function App() {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getQuestions().then(setQuestions);
    getTags().then((data) => setTags(data.tags));
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="divide-y divide-gray-300 rounded border border-gray-300">
      {questions.map((question) => (
        <div className="flex gap-4 p-4" key={question.id}>
          <div className="w-32 flex-none">
            <ul className="flex flex-col items-end gap-2 py-1 text-sm">
              <li>{question.voteCount} votes</li>
              <li>
                {/* TODO: 0 answers -> No chip */}
                <div className="inline-flex h-6 items-center rounded border border-green-700 px-1 text-green-700">
                  {question.answerCount} answer
                  {question.answerCount === 1 ? "" : "s"}
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 text-xl">
              <a className="text-blue-500 hover:text-blue-700" href="#">
                {question.title}
              </a>
            </h3>
            <p className="mb-2 text-gray-700">{question.body}</p>
            <ul className="flex gap-2">
              {question.tagIds.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);

                return (
                  <div className="inline-flex h-6 items-center rounded bg-gray-100 px-1 font-bold text-gray-900 hover:bg-gray-300">
                    {tag.name}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
