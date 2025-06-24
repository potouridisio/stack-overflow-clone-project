import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./routes/Layout";
import Questions from "./routes/Questions";
import Tags from "./routes/Tags";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Questions />} />
        <Route path="questions">
          <Route index element={<Questions />} />
          <Route path="tagged/:tagName" element={<Questions />} />
        </Route>
        <Route path="tags" element={<Tags />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
