import "./styles/styles.scss";
import { Header } from "./components/header";
import Sidebar from "./components/sidebar";

export default function App() {
  return (
    <>
      <Header />
      <main className="layout">
        <Sidebar />
        <section className="content">
          <div className="btn">Click me</div>
          <div className="btn-outline rounded-pill">Click me</div>
          <div className="icon-btn">
            <i className="fa-solid fa-bars"></i>
          </div>
        </section>
      </main>
    </>
  );
}
