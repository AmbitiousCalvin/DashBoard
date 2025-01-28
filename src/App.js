import "./styles/styles.scss";
import { Header } from "./layout/header";
import { Sidebar } from "./layout/sidebar";
import Loading from "./layout/loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks_Page from "./pages/tasks";
import { lazy, Suspense, useState, useEffect } from "react";
import { LayoutContextProvider } from "./contexts/layoutContext";

const wait = (fn, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), delay);
  });
};

const Home_Page = lazy(() => wait(() => import("./pages/home"), 0));
// const Tasks_Page = lazy(() => wait(() => import("./pages/tasks"), 2500));
const Budgets_Page = lazy(() => wait(() => import("./pages/budgets"), 0));
const Music_Page = lazy(() => wait(() => import("./pages/music"), 0));
const Github_Activity_Page = lazy(() => wait(() => import("./pages/github_activity"), 0));

export default function App() {
  return (
    <LayoutContextProvider>
      <Suspense fallback={<Loading />}>
        <Router>
          <Header />

          {/* ============================================= */}

          <main className="layout">
            <Sidebar />

            {/* ============================================= */}

            <section className="content-container">
              <Routes>
                <Route path="/" element={<Home_Page />} />
                <Route path="/tasks" element={<Tasks_Page />} />
                <Route path="/budgets" element={<Budgets_Page />} />
                <Route path="/music" element={<Music_Page />} />
                <Route path="/cooking" element={<Github_Activity_Page />} />
              </Routes>
            </section>

            {/* ============================================= */}
          </main>
        </Router>
      </Suspense>
    </LayoutContextProvider>
  );
}
