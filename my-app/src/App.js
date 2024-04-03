import './App.css';
import { useState } from 'react';
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
  const addToWantToReadBooks = (newTitle) => setWantToReadBooks(new Set([... wantToReadBooks, newTitle]));
  const removeFromWantToReadBooks = (removeTitle) => setWantToReadBooks(new Set([... wantToReadBooks].filter((book) => book !== removeTitle)));
  
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
  const reset = () => {
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

  const filteredBookItems = bookItems.filter((item) => 
  (!fantasyFilterOn || item.genre === "Fantasy") && 
  (!romanceFilterOn || item.genre === "Romance") && 
  (!selfHelpFilterOn || item.genre === "Self-Help") && 
  (!scienceFictionFilterOn || item.genre === "Science Fiction") && 
  (!horrorFilterOn || item.genre === "Horror") && 
  (!historicalFictionFilterOn || item.genre === "Historical Fiction") && 
  (!nonFictionFilterOn || item.genre === "Non-Fiction") && 
  (!thrillerFilterOn || item.genre === "Thriller") && 
  (!lessThanFourStarsFilterOn || item.stars < 4) && 
  (!fourStarsOrMoreFilterOn || item.stars >= 4));

  const itemsPerRow = 6;
  const topRowItems = filteredBookItems.slice(0, itemsPerRow);
  const bottomRowItems = filteredBookItems.slice(itemsPerRow); 

  return (
    <div className="App">
      <header id="Body">
        <h1>Library</h1>
        <header id="BodyOrganization">
          <header id="Functionality">
            
            <div class="ButtonsAndHeader">
              <h6>Sorting</h6>
              <button onClick={sortByLength}>Sort by Length (shortest to longest)</button>
              <button onClick={sortByStars}>Sort by Stars (highest to lowest)</button>
            </div>
            <div class="ButtonsAndHeader">
              <h6>Genre Filtering</h6>
              <button onClick={() => setFantasyFilterOn(true)}>Fantasy</button>
              <button onClick={() => setRomanceFilterOn(true)}>Romance</button>
              <button onClick={() => setSelfHelpFilterOn(true)}>Self-Help</button>
              <button onClick={() => setScienceFictionFilterOn(true)}>Science Fiction</button>
              <button onClick={() => setHorrorFilterOn(true)}>Horror</button>
              <button onClick={() => setHistoricalFictionFilterOn(true)}>Historical Fiction</button>
              <button onClick={() => setNonFictionFilterOn(true)}>Non-Fiction</button>
              <button onClick={() => setThrillerFilterOn(true)}>Thriller</button>
            </div>
            <div class="ButtonsAndHeader">
              <h6>Stars Filtering</h6>
              <button onClick={() => setLessThanFourStarsFilterOn(true)}>Less Than 4 Stars</button>
              <button onClick={() => setFourStarsOrMoreFilterOn(true)}>4 Stars or More</button>
            </div>
            <div class="ButtonsAndHeader">
              <h6>Reset</h6>
              <button onClick={reset}>Reset</button>
            </div>

          </header>

          <header id="Library">
            <div className="topRow">
              {topRowItems.map((item) => (
                <BookItem
                  key={item.key}
                  title={item.title}
                  author={item.author}
                  genre={item.genre}
                  stars={item.stars}
                  length={item.length}
                  image={item.image}
                  inWantToRead={wantToReadBooks.has(item.title)}
                  incrementWantToReadTotal={incrementWantToReadTotal} 
                  decrementWantToReadTotal={decrementWantToReadTotal} 
                  addToWantToReadBooks={(newTitle) => addToWantToReadBooks(newTitle)} 
                  removeFromWantToReadBooks={(removeTitle) => removeFromWantToReadBooks(removeTitle)}
                />
              ))}
            </div>
            <div className="bottomRow">
              {bottomRowItems.map((item) => (
                <BookItem
                  key={item.key}
                  title={item.title}
                  author={item.author}
                  genre={item.genre}
                  stars={item.stars}
                  length={item.length}
                  image={item.image} 
                  inWantToRead={wantToReadBooks.has(item.title)}
                  incrementWantToReadTotal={incrementWantToReadTotal} 
                  decrementWantToReadTotal={decrementWantToReadTotal} 
                  addToWantToReadBooks={(newTitle) => addToWantToReadBooks(newTitle)} 
                  removeFromWantToReadBooks={(removeTitle) => removeFromWantToReadBooks(removeTitle)}
                />
              ))}
            </div>
          </header>
        </header>
      </header>
    <header id="Want_To_Read">
      <h1>Want To Read</h1>
      <h2>Books in list: {Array.from(wantToReadBooks).join(', ')}</h2>
      <h3>Total books: {wantToReadTotal}</h3>
    </header>
   </div>
  );
}

export default App;