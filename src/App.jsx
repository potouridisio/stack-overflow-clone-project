import { NavLink, Routes, Route } from "react-router";

import Questions from "./routes/Questions";
import Tags from "./routes/Tags";

function App() {
  return (
    <div className="mx-auto flex max-w-7xl">
      <aside className="w-40 flex-none border-r border-r-gray-300 py-6">
        <nav>
          <ul>
            {[
              ["Home", "/"],
              ["Questions", "/questions"],
              ["Tags", "/tags"],
            ].map(([title, url]) => (
              <li key={url}>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center rounded-l-lg p-2 text-sm ${isActive ? "bg-gray-100 font-bold text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
                  }
                  to={url}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <Routes>
        <Route index element={<Questions />} />
        <Route path="questions" element={<Questions />} />
        <Route path="tags" element={<Tags />} />
      </Routes>
    </div>
  );
}

export default App;
