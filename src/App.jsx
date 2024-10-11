import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState('#FF5733');

  // Predefined list of 10 colors
  const colors = [
    '#FF5733', // Red-orange
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33A6', // Pink
    '#FFC733', // Yellow
    '#33FFF1', // Cyan
    '#FF3380', // Bright Pink
    '#8033FF', // Purple
    '#33FF8F', // Light Green
    '#FF5733', // Orange-red
  ];

  const API_KEY = 'hpfl6Gc6i/MildzkdSpBkA==Znf5AAjhXknaWmr5';

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }

      const result = await response.json();
      setData(result[0]);
      console.log({ result });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeBgColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setBgColor(colors[randomIndex]);
  };

  const handleNewQuote = () => {
    fetchData();
    setLoading(true);
    changeBgColor();
  };

  if (error) return <div>Error: {error}</div>;
  console.log({ data });
  return (
    <main className="poppins-regular" style={{ backgroundColor: bgColor }}>
      <div>
        <div id="quote-box">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div>
              <div id="text">{data?.quote}</div>
              <div id="author">{data?.author}</div>
            </div>
          )}

          <div className="wrap">
            <a
              id="tweet-quote"
              href="twitter.com/intent/tweet"
              style={{ backgroundColor: bgColor }}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="2xl"
                style={{ color: '#ffffff' }}
              />
            </a>
            <button
              id="new-quote"
              onClick={handleNewQuote}
              style={{ backgroundColor: bgColor }}
            >
              New Quote
            </button>
          </div>
        </div>
        <p>by Kholid</p>
      </div>
    </main>
  );
};

export default App;
