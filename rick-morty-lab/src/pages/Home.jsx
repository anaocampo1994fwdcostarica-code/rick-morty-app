// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { getCharacters } from "../services/api";
import { CardList } from "../components/CardList";
import { SearchBar } from "../components/SearchBar";
import { Loader } from "../components/Loader";
import { DetailModal } from "../components/DetailModal";

const LOGO_URL = "https://rickandmortyapi.com/icons/icon-512x512.png";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    let isCurrent = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters(page, debouncedSearchTerm);
        if (isCurrent) {
          setCharacters(data.results);
          setInfo(data.info);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
          setCharacters([]);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCurrent = false;
    };
  }, [page, debouncedSearchTerm]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <>
      <header className="app-header">
        <div className="logo-container">
          <img src={LOGO_URL} alt="Rick and Morty" />
        </div>
        <nav>
          <a href="#characters">Characters</a>
        </nav>
      </header>

      <section className="hero-section">
        <h1>Rick and Morty Lab</h1>
      </section>

      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />

      <main className="main-content">
        {loading && <Loader />}
        {error && <div className="error-message">⚠️ {error}</div>}
        {!loading && !error && (
          <CardList
            characters={characters}
            onCardClick={setSelectedCharacter}
            page={page}
            setPage={setPage}
            info={info}
          />
        )}
      </main>

      <DetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </>
  );
};