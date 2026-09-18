// src/components/Card.jsx
export const Card = ({ character, onClick }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "alive": return "#55cc44";
      case "dead": return "#ff5555";
      default: return "#9e9e9e";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(character);
    }
  };

  return (
    <div
      className="rick-card"
      role="button"
      tabIndex={0}
      onClick={() => onClick(character)}
      onKeyDown={handleKeyDown}
    >
      <img src={character.image} alt={character.name} className="card-image" />
      <div className="card-content">
        <h3>{character.name}</h3>
        <p className="card-info">
          <span
            className="status-dot"
            style={{ backgroundColor: getStatusColor(character.status) }}
          />
          {character.status} - {character.species}
        </p>
        <p className="card-section-title">Last known location</p>
        <p className="card-section-value">{character.location.name}</p>
      </div>
    </div>
  );
};