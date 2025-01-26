import "./styles/styles.scss";
import { Header } from "./layout/header";
import { Sidebar } from "./layout/sidebar";
import Loading from "./layout/loading";
import useToggle from "./hooks/useToggle";
import { useLocalStorage } from "./hooks/useStorage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCallback, useState, useEffect, lazy, Suspense } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
import Tasks_Page from "./pages/tasks";

const wait = (fn, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), delay);
  });
};

const Home_Page = lazy(() => wait(() => import("./pages/home"), 1000));
// const Tasks_Page = lazy(() => wait(() => import("./pages/tasks"), 2500));
const Budgets_Page = lazy(() => wait(() => import("./pages/budgets"), 2500));
const Music_Page = lazy(() => wait(() => import("./pages/music"), 2500));
const Github_Activity_Page = lazy(() =>
  wait(() => import("./pages/github_activity"), 2500)
);

export default function App() {
  const [isMiniMode, setIsMiniMode] = useLocalStorage(
    "desktop_sidebar_mini",
    "true"
  );

  const [isMobileMiniMode, toggleMobileMiniMode] = useToggle(false);
  const [isMobile, setIsMobile] = useState(false);
  const size = useWindowSize();

  const toggleMiniMode = useCallback(
    (value) => {
      if (!isMobile) {
        setIsMiniMode((prevState) => {
          return typeof value === "boolean" ? value : !prevState;
        });
      }
    },
    [setIsMiniMode, isMobile]
  );

  useEffect(() => {
    if (size.width <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size.width]);

  return (
    <Router>
      <Header
        isMobile={isMobile}
        isMiniMode={isMiniMode}
        toggleMiniMode={toggleMiniMode}
        isMobileMiniMode={isMobileMiniMode}
        toggleMobileMiniMode={toggleMobileMiniMode}
      />
      <main className="layout">
        <Sidebar
          isMobile={isMobile}
          isMiniMode={isMiniMode}
          toggleMiniMode={toggleMiniMode}
          isMobileMiniMode={isMobileMiniMode}
          toggleMobileMiniMode={toggleMobileMiniMode}
        />
        <section className="content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home_Page />} key="home" />
              <Route path="/tasks" element={<Tasks_Page />} key="tasks" />
              <Route path="/budgets" element={<Budgets_Page />} key="budgets" />
              <Route path="/music" element={<Music_Page />} key="music" />
              <Route
                path="/cooking"
                element={<Github_Activity_Page />}
                key="cooking"
              />
            </Routes>
          </Suspense>
        </section>
      </main>
    </Router>
  );
}
