import "./App.css";
import CarsPage from "./page/CarPage";


function App() {
  return (
     <main className="app-container">
      <header className="app-header">
        <div className="brand">

          <div>
            <strong>HAUPCAR</strong>
            <span>CAR MANAGEMENT</span>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot" />
          System Online
        </div>
      </header>

      <CarsPage />
    </main>
  );
}

export default App;
