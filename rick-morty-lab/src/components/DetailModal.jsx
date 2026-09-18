// src/components/DetailModal.jsx
import { useEffect } from "react";

export const DetailModal = ({ character, onClose }) => {
  useEffect(() => {
    if (!character) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [character, onClose]);

  if (!character) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${character.name}`}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">&times;</button>
        <img src={character.image} alt={character.name} className="modal-image" />
        <h2>{character.name}</h2>
        <div className="modal-details">
          <p><strong>Estado:</strong> {character.status}</p>
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          <p><strong>Origen:</strong> {character.origin.name}</p>
          <p><strong>Ubicación actual:</strong> {character.location.name}</p>
        </div>
      </div>
    </div>
  );
};