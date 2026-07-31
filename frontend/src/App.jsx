import { useState, useEffect } from "react";
import "./styling/appStyle.css";

function App() {
  const [imageUrl, updateimageUrl] = useState("");

  function getNewImage(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const query = formData.get("query");

    fetchImage(query);
  }

  function fetchImage(query) {
    fetch(`/API?query=${query}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateimageUrl(data);
      });
  }

  useEffect(() => {}, []);

  return (
    <div className="container">
      <p className="headerText">This is main file</p>
      <img src={imageUrl} />
      <p className="infoText">input imageName</p>
      <form onSubmit={getNewImage}>
        <input name="query" type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
