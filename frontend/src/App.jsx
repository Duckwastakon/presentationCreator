import { useState, useEffect } from "react";

function App() {
  const [testString, updateTestString] = useState("");

  useEffect(() => {
    fetch("/API")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        updateTestString(data.message)});
  }, []);

  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <h1>This is main file</h1>
      <p>hello world: {testString}</p>
    </div>
  );
}

export default App;
