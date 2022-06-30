import Calendar from "./components/Calendar/Calendar";
import "./App.css";
import days from "./days";

function App() {
  return (
    <div className="App">
      <Calendar days={days} />
    </div>
  );
}

export default App;
