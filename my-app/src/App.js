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
  // Total number of books in "Want To Read"
  const [wantToReadTotal, setWantToReadTotal] = useState(0);
  const incrementWantToReadTotal = () => setWantToReadTotal(wantToReadTotal + 1);
  const decrementWantToReadTotal = () => setWantToReadTotal(wantToReadTotal - 1);

  // Books in "Want To Read"
  const [wantToReadBooks, setWantToReadBooks] = useState(new Set());
  const addToWantToReadBooks = (newBook) => setWantToReadBooks(new Set([... wantToReadBooks, newBook]))
  const removeFromWantToReadBooks = (bookToRemove) => setWantToReadBooks(new Set([... wantToReadBooks].filter((book) => book !== bookToRemove)));

  // Genre Filters
  const [fantasyFilterOn, setFantasyFilterOn] = useState(false);
  const [romanceFilterOn, setRomanceFilterOn] = useState(false);
  const [selfHelpFilterOn, setSelfHelpFilterOn] = useState(false);
  const [scienceFictionFilterOn, setScienceFictionFilterOn] = useState(false);
  const [horrorFilterOn, setHorrorFilterOn] = useState(false);
  const [historicalFictionFilterOn, setHistoricalFictionFilterOn] = useState(false);
  const [nonFictionFilterOn, setNonFictionFilterOn] = useState(false);
  const [thrillerFilterOn, setThrillerFilterOn] = useState(false);

  // Stars Filters
  const [lessThanFourStarsFilterOn, setLessThanFourStarsFilterOn] = useState(false);
  const [fourStarsOrMoreFilterOn, setFourStarsOrMoreFilterOn] = useState(false);

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

  // Function to sort book items by star ranking (high to low)
  const sortByStars = () => {
    const sortedBookItems = [...bookItems].sort((a, b) => b.stars - a.stars);
    setBookItems(sortedBookItems);
  }

  // Function to reset book items to their original order
  const resetSorting = () => {
    const sortedBookItems = [...bookItems].sort((a, b) => a.key - b.key);
    setBookItems(sortedBookItems);
    setFantasyFilterOn(false);
    setRomanceFilterOn(false);
    setSelfHelpFilterOn(false);
    setScienceFictionFilterOn(false);
    setHorrorFilterOn(false);
    setHistoricalFictionFilterOn(false);
    setNonFictionFilterOn(false);
    setThrillerFilterOn(false);
    setLessThanFourStarsFilterOn(false);
    setFourStarsOrMoreFilterOn(false);
  }

  return (
    <div className="App">
      <header id="Library">
        <h1>Library</h1>
        {bookItems.filter((item) => (!fantasyFilterOn || item.genre === "Fantasy") && (!romanceFilterOn || item.genre === "Romance") && (!selfHelpFilterOn || item.genre === "Self-Help") && (!scienceFictionFilterOn || item.genre === "Science Fiction") && (!horrorFilterOn || item.genre === "Horror") && (!historicalFictionFilterOn || item.genre === "Historical Fiction") && (!nonFictionFilterOn || item.genre === "Non-Fiction") && (!thrillerFilterOn || item.genre === "Thriller") && (!lessThanFourStarsFilterOn || item.stars < 4) && (!fourStarsOrMoreFilterOn || item.stars >= 4) )
          .map((item) => (
            <BookItem
              key={item.key}
              title={item.title}
              author={item.author}
              genre={item.genre}
              stars={item.stars}
              length={item.length}
              image={item.image} 
              incrementWantToReadTotal={incrementWantToReadTotal} 
              decrementWantToReadTotal={decrementWantToReadTotal} 
              addToWantToReadBooks={(newBook) => addToWantToReadBooks(newBook)} 
              removeFromWantToReadBooks={(bookToRemove) => removeFromWantToReadBooks(bookToRemove)}
            />
        ))}
      </header>
      <header id="Guide">
        <h1>Filters</h1>
        <button onClick={sortByLength}>Sort by Length (shortest to longest)</button>
        <button onClick={sortByStars}>Sort by Stars (highest to lowest)</button>
        <button onClick={resetSorting}>Reset Sorting</button>
        <button onClick={() => setFantasyFilterOn(true)}>Fantasy</button>
        <button onClick={() => setRomanceFilterOn(true)}>Romance</button>
        <button onClick={() => setSelfHelpFilterOn(true)}>Self-Help</button>
        <button onClick={() => setScienceFictionFilterOn(true)}>Science Fiction</button>
        <button onClick={() => setHorrorFilterOn(true)}>Horror</button>
        <button onClick={() => setHistoricalFictionFilterOn(true)}>Historical Fiction</button>
        <button onClick={() => setNonFictionFilterOn(true)}>Non-Fiction</button>
        <button onClick={() => setThrillerFilterOn(true)}>Thriller</button>
        <button onClick={() => setLessThanFourStarsFilterOn(true)}>Less Than 4 Stars</button>
        <button onClick={() => setFourStarsOrMoreFilterOn(true)}>4 Stars or More</button>
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