import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

import WatchedTags from "../components/WatchedTags";
import { getQuestions, getTags, getUsers, getWatchedTags, IsWatched, HighlightTag, } from "../utils";

dayjs.extend(relativeTime);

export default function Questions() {
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [tagMap, setTagMap] = useState({});
  const [userMap, setUserMap] = useState({});
  const [watchedTags, setWatchedTags] = useState([]);

  useEffect(() => {
    const startFetching = async () => {
      const [questions, { tags }, users, watchedTags] = await Promise.all([
        getQuestions(),
        getTags(),
        getUsers(),
        getWatchedTags(),
      ]);

      setQuestions(questions);
      setTagMap(
        tags.reduce((tagMap, tag) => ({ ...tagMap, [tag.id]: tag }), {}),
      );
      setUserMap(
        users.reduce((userMap, user) => ({ ...userMap, [user.id]: user }), {}),
      );
      setWatchedTags(watchedTags);
    };

    startFetching();
  }, []);

  return (
    <main className="flex grow py-6">
      <div>
        <div className="mb-4 flex items-center justify-between pl-6">
          <h1 className="text-3xl text-gray-900">Newest Questions</h1>
          <a
            className="rounded bg-blue-500 p-2 text-sm text-white hover:bg-blue-700 active:bg-blue-900"
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
            className={`rounded border border-blue-500 p-1.5 text-sm text-blue-500 hover:cursor-pointer active:border-transparent active:bg-blue-300 ${isOpen ? "bg-blue-300 text-blue-700" : "hover:bg-blue-100"}`}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            Filter
          </button>
        </div>
        <div className="divide-y divide-gray-300 border-y border-gray-300">
          {questions.map((question) => {
            const questionUser = userMap[question.userId];
            return (
              <div className={`flex gap-4 p-4 ${IsWatched(question, watchedTags) ? "bg-yellow-100" : "" }`} key={question.id}>
                <div className="w-32 flex-none">
                  <ul className="flex flex-col items-end gap-2 py-1 text-sm text-gray-900">
                    <li>{question.voteCount} votes</li>
                    <li>
                      {question.answerCount > 0 ? (
                        <div className="rounded border border-green-700 p-1 text-xs text-green-700">
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
                  <p className="mb-2 line-clamp-2 text-gray-700">
                    {question.body}
                  </p>
                  <div className="flex justify-between">
                    <ul className="flex items-center gap-2">
                      {question.tagIds.map((tagId) => (
                        <li className="inline-flex" key={tagId}>
                          <a
                            className="flex items-center gap-1 rounded bg-gray-100 p-1 text-xs font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                            href="#"
                          >
                            {HighlightTag(tagId, watchedTags) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                              :null}
                            {tagMap[tagId].name} 
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1 text-xs">
                      <a
                        className="block text-blue-500 hover:text-blue-700"
                        href="#"
                      >
                        {questionUser.name}
                      </a>
                      <span className="font-bold text-gray-700">
                        {questionUser.reputation}
                      </span>
                      <span className="text-gray-500">
                        asked {dayjs().to(dayjs(question.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ml-6 w-80 flex-none">
        <WatchedTags
          onAdd={(tagId) => setWatchedTags([...watchedTags, tagId])}
          onRemove={(updatedTags) => setWatchedTags(updatedTags)}
          tagMap={tagMap}
          watchedTags={watchedTags}
        />
      </div>
    </main>
  );
}
