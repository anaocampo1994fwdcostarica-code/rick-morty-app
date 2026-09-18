// src/components/Card.jsx
export const Card = ({ character, playerIndex, onClick, isFavorite, onToggleFavorite }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "alive": return "#22c55e";
      case "dead": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const getHp = (status) => {
    switch (status.toLowerCase()) {
      case "alive": return 5;
      case "dead": return 1;
      default: return 3;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(character);
    }
  };

  const playerId = `P${String(playerIndex + 1).padStart(2, "0")}`;
  const hp = getHp(character.status);

  return (
    <div
      className="rick-card"
      role="button"
      tabIndex={0}
      onClick={() => onClick(character)}
      onKeyDown={handleKeyDown}
    >
      <div className="card-image-frame">
        <img src={character.image} alt={character.name} className="card-image" />
        <button
          type="button"
          className={`heart-btn${isFavorite ? " favorite" : ""}`}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(character);
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          ♥
        </button>
      </div>

      <div className="card-content">
        <div className="fighter-header">
          <span className="fighter-code">{playerId}</span>
          <span className="fighter-hp">HP {hp}/5</span>
        </div>

        <h3>{character.name}</h3>

        <p className="card-info">
          <span
            className="status-dot"
            style={{ backgroundColor: getStatusColor(character.status) }}
          />
          {character.status} - {character.species}
        </p>

        <div className="health-bar-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`hp-segment${i < hp ? " active" : ""}`} />
          ))}
        </div>

        <p className="card-section-title">Last known location</p>
        <p className="card-section-value">{character.location.name}</p>
      </div>
    </div>
  );
};