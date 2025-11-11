import { useEffect, useState } from "react";

function App() {
  //const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => console.log(data));
      // .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>React + Node.js</h1>
    </div>
  );
}

export default App;
