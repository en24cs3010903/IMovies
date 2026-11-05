
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
const [quantity, setQuantity] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://https://imovies-backendmongo-uri.onrender.com/api/movies/api/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movies load nahi hui');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Backend connect nahi hua. Server check karo.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <h2>🎬 IMovies</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <p className="tag">WELCOME TO IMOVIES</p>
        <h1>Your Movie Night,<br />
          <span>Made Magical.</span>
        </h1>
        <p>Discover movies, explore showtimes and plan your next cinema experience.</p>
        <a className="book-btn" href="#movies">Explore Movies →</a>
      </section>

      <section className="movies" id="movies">
        <p className="tag">FIND YOUR NEXT FAVOURITE</p>
        <h2>Popular Movies</h2>

        {loading && <p>Loading movies...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="movie-grid">
            
{movies.map((movie) => (
  <article key={movie.id ?? movie._id ?? movie.title}>
    <div className="poster">🎬</div>
    <h3>{movie.title}</h3>
    <p>{movie.genre}</p>
    <p>Ticket Price: ₹{movie.price}</p>


<button
  type="button"
  onClick={async() => {
    console.log("Confirm Booking clicked!");
    setSelectedMovie(movie);
    setQuantity(1);
  }}
>
  Book Ticket
</button>











  </article>
))}

          </div>
        )}
        
{selectedMovie && (
  <div className="booking-box">
    <h2>Book Your Ticket 🎟️</h2>

    <p>Movie: {selectedMovie.title}</p>
    <p>Price per ticket: ₹{selectedMovie.price}</p>

    <label htmlFor="ticketQuantity">Number of tickets:</label>

    <select
      id="ticketQuantity"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
        <option key={number} value={number}>
          {number}
        </option>
      ))}
    </select>

    <h3>Total: ₹{quantity * Number(selectedMovie.price)}</h3>
<button
  type="button"
  onClick={async () => {
    try {
      const response = await fetch('http://https://imovies-backendmongo-uri.onrender.com/api/movies/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movieTitle: selectedMovie.title,
          tickets: quantity
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Booking save nahi hui.');
        return;
      }

      alert(
        `Booking Confirmed!\nMovie: ${data.booking.movieTitle}\nTickets: ${data.booking.tickets}\nTotal: ₹${data.booking.totalPrice}`
      );

      setSelectedMovie(null);
    } catch (error) {
      alert('Backend se connect nahi ho raha. Server check karo.');
    }
  }}
>
  Confirm Booking
</button>



    <button type="button" onClick={() => setSelectedMovie(null)}>
      Cancel
    </button>
  </div>
)}




      </section>

      <footer id="about">
        <h2>🎬 IMovies</h2>
        <p>Your next favourite movie awaits.</p>
        <small>© 2026 IMovies Student Project</small>
      </footer>
    </div>
  );
}

export default App;


