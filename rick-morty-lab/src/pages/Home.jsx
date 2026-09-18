// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { getCharacters } from "../services/api";
import { CardList } from "../components/CardList";
import { SearchBar } from "../components/SearchBar";
import { Loader } from "../components/Loader";
import { DetailModal } from "../components/DetailModal";
import { FilterBar } from "../components/FilterBar";
import { ThemeToggle } from "../components/ThemeToggle";

const LOGO_URL = "https://rickandmortyapi.com/icons/icon-512x512.png";
const FAVORITES_KEY = "ricklab-favorites";
const THEME_KEY = "ricklab-theme";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [view, setView] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (view === "favorites") return;

    let isCurrent = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters({
          page,
          name: debouncedSearchTerm,
          status,
          species,
        });
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
  }, [page, debouncedSearchTerm, status, species, view]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSpeciesChange = (value) => {
    setSpecies(value);
    setPage(1);
  };

  const toggleFavorite = (character) => {
    setFavorites((prev) =>
      prev.some((c) => c.id === character.id)
        ? prev.filter((c) => c.id !== character.id)
        : [...prev, character]
    );
  };

  const isFavorite = (id) => favorites.some((c) => c.id === id);

  const showFavoritesView = view === "favorites";
  const visibleCharacters = showFavoritesView ? favorites : characters;

  return (
    <>
      <header className="app-header">
        <div className="logo-container">
          <img src={LOGO_URL} alt="Rick and Morty" />
        </div>
        <nav>
          <a href="#characters">Characters</a>
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <span className="coin-badge">Insert Coin</span>
        </nav>
      </header>

      <section className="hero-section">
        <h1>Rick and Morty Lab</h1>
      </section>

      <FilterBar
        view={view}
        onViewChange={setView}
        favoritesCount={favorites.length}
        showFilters={!showFavoritesView}
        status={status}
        onStatusChange={handleStatusChange}
        species={species}
        onSpeciesChange={handleSpeciesChange}
      />

      {!showFavoritesView && (
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      )}

      <main className="main-content">
        {!showFavoritesView && loading && <Loader />}
        {!showFavoritesView && error && (
          <div className="error-message">⚠️ {error}</div>
        )}
        {showFavoritesView && favorites.length === 0 && (
          <div className="empty-state">
            Todavía no tienes personajes favoritos.
            Toca el corazón de una tarjeta para guardarlo aquí.
          </div>
        )}
        {!error && visibleCharacters.length > 0 && (
          <CardList
            characters={visibleCharacters}
            onCardClick={setSelectedCharacter}
            page={page}
            setPage={setPage}
            info={info}
            hidePagination={showFavoritesView}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
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