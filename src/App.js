import "./styles/styles.scss";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import useToggle from "./hooks/useToggle";
import { useLocalStorage } from "./hooks/useStorage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import { useWindowSize } from "usehooks-ts";

const Home = () => <div className="btn-outline">Home</div>;
const Item1 = () => <div className="btn-outline">Item 1</div>;
const Item2 = () => <div className="btn-outline">Item 2</div>;
const Item3 = () => <div className="btn-outline">Item 3</div>;
const Item4 = () => <div className="btn-outline">Item 4</div>;
const Item5 = () => <div className="btn-outline">Item 5</div>;
const Item6 = () => <div className="btn-outline">Item 6</div>;

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
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/tasks" element={<Item1 />}></Route>
            <Route path="/budgets" element={<Item2 />}></Route>
            <Route path="/music" element={<Item3 />}></Route>
            <Route path="/cooking" element={<Item4 />}></Route>
            <Route path="/github-activity" element={<Item5 />}></Route>
          </Routes>
          <div className="icon-btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </section>
      </main>
    </Router>
  );
}
