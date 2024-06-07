import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const googleSearch = async () => {
    try {
      if (input !== "") {
        const allBooks = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=" + input
        );
        setBooks(allBooks.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    googleSearch();
  }, [input]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <form>
        <label htmlFor="input" />
        <input
          type="text"
          name="input"
          id="input"
          placeholder="search here..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <ul>
        {input !== ""
          ? books.map((book, value) => (
              <li key={value}>{book.volumeInfo.title}</li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;
