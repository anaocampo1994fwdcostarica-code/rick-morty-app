// src/components/CardList.jsx
import { Card } from "./Card";

export const CardList = ({ characters, onCardClick, page, setPage, info }) => {
  return (
    <>
      <div className="grid-container" id="characters">
        {characters.map((char, index) => (
          <Card key={char.id} character={char} playerIndex={index} onClick={onCardClick} />
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={!info.prev}
          className="portal-btn"
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={!info.next}
          className="portal-btn"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};