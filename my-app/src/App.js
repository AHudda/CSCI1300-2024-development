import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import bookData from "./assets/book-data.json";
import BookItem from "./components/BookItem";

/* Make the image URLs Work */
bookData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [wantToReadTotal, setWantToReadTotal] = useState(0);
  const incrementWantToReadTotal = () => setWantToReadTotal(wantToReadTotal + 1);
  const decrementWantToReadTotal = () => setWantToReadTotal(wantToReadTotal - 1);

  const [wantToReadBooks, setWantToReadBooks] = useState(new Set());
  const addToWantToReadBooks = (newBook) => setWantToReadBooks(new Set([... wantToReadBooks, newBook]))
  const removeFromWantToReadBooks = (bookToRemove) => setWantToReadBooks(new Set([... wantToReadBooks].filter((book) => book !== bookToRemove)));

  // Using useState to ensure that BookItem(s) can maintain their internal state when re-rendered
  const [bookItems, setBookItems] = useState(bookData.map((item, index) => ({
    key: index,
    title: item.title,
    author: item.author,
    genre: item.genre,
    stars: item.stars,
    length: item.length,
    image: item.image,
  })));

  // Function to sort book items by number of pages (low to high)
  const sortByLength = () => {
    const sortedBookItems = [...bookItems].sort((a, b) => a.length - b.length);
    setBookItems(sortedBookItems);
  }

  // Function to reset book items to their original order
  const resetSorting = () => {
    const sortedBookItems = [...bookItems].sort((a, b) => a.key - b.key);
    setBookItems(sortedBookItems);
  }

  return (
    <div className="App">
      <header id="Library">
        <h1>Library</h1>
        {bookItems.map((item) => (
          <BookItem key={item.key} title={item.title} author={item.author} genre={item.genre} stars={item.stars} length={item.length} image={item.image} 
            incrementWantToReadTotal={incrementWantToReadTotal} 
            decrementWantToReadTotal={decrementWantToReadTotal} 
            addToWantToReadBooks={(newBook) => addToWantToReadBooks(newBook)} 
            removeFromWantToReadBooks={(bookToRemove) => removeFromWantToReadBooks(bookToRemove)}
          />
        ))}
      </header>
      <header id="Filters">
        <h1>Filters</h1>
        <button onClick={sortByLength}>Sort by Length</button>
        <button onClick={resetSorting}>Reset Sorting</button>
      </header>
      <header id="Want_To_Read">
        <h1>Want To Read</h1>
        <h2>Books in list: {wantToReadBooks}</h2>
        <h2>Total books: {wantToReadTotal}</h2>
      </header>
    </div>
  );
}

export default App;