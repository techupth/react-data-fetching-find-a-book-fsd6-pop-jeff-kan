import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [book, setBook] = useState([]);

  useEffect(() => {
    findBook();
  },[text]);

  const findBook = async () => {
    try {
      {
        const result = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}`
        );
        setBook(result.data.items);
      }
    } catch (error) {
      console.error("Fail to search");
    }
  };

  return (
    <div className="App">
      <h1>Find a book</h1>
      <label className="SearchTab">
        <input
          type="text"
          placeholder="Search here"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </label>
      <div className="SearchResult">
        <ul className="SearchList">
          
          {book.map((item, index) => {
            return <li className="List" key={index}>{item.volumeInfo.title}</li>;
          })}

        </ul>
      </div>
    </div>
  );
}

export default App;
