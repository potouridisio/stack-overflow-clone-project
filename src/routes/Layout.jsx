import { NavLink, Outlet } from "react-router";

export default function Layout() {
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
      <Outlet />
    </div>
  );
}
