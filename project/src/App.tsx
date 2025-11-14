import { useEffect } from "react";

function App() {

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => console.log("Данные с сервера:", data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + Node + Supabase</h1>
    </div>
  );
}

export default App;

