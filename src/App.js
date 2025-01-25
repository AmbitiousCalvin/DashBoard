import "./styles/styles.scss";
import { Header } from "./components/header";
import Sidebar from "./components/sidebar";
import useToggle from "./hooks/useToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => <div className="btn-outline">Home</div>;
const Item1 = () => <div className="btn-outline">Item 1</div>;
const Item2 = () => <div className="btn-outline">Item 2</div>;
const Item3 = () => <div className="btn-outline">Item 3</div>;

export default function App() {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);

  return (
    <Router>
      <Header toggleSidebar={toggleSidebar} />
      <main className="layout">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <section className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/item_1" element={<Item1 />}></Route>
            <Route path="/item_2" element={<Item2 />}></Route>
            <Route path="/item_3" element={<Item3 />}></Route>
          </Routes>
          <div className="icon-btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </section>
      </main>
    </Router>
  );
}
