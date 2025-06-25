import { NavLink, Outlet } from "react-router";

function HomeIcon() {
  return (
    <svg
      className="size-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function QuestionsIcon() {
  return (
    <svg
      className="size-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function Layout() {
  return (
    <>
      <header className="h-14 border-t-3 border-b border-t-orange-500 border-b-gray-300"></header>
      <div className="mx-auto flex max-w-7xl">
        <aside className="w-40 flex-none border-r border-r-gray-300 py-6">
          <nav>
            <ul>
              {[
                ["Home", "/", <HomeIcon />],
                ["Questions", "/questions", <QuestionsIcon />],
                ["Tags", "/tags", null],
              ].map(([title, url, Icon]) => (
                <li key={url}>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center rounded-l-lg p-2 text-sm ${isActive ? "bg-gray-100 font-bold text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`
                    }
                    to={url}
                  >
                    {Icon}
                    <span className="pl-2">{title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <Outlet />
      </div>
    </>
  );
}
