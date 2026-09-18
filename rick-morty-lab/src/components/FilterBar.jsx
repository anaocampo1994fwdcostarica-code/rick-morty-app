// src/components/FilterBar.jsx
export const FilterBar = ({
  view,
  onViewChange,
  favoritesCount,
  showFilters,
  status,
  onStatusChange,
  species,
  onSpeciesChange,
}) => {
  return (
    <div className="controls">
      <div className="view-tabs">
        <button
          type="button"
          className={`tab-btn${view === "all" ? " active" : ""}`}
          onClick={() => onViewChange("all")}
        >
          Todos
        </button>
        <button
          type="button"
          className={`tab-btn${view === "favorites" ? " active" : ""}`}
          onClick={() => onViewChange("favorites")}
        >
          Favoritos{favoritesCount > 0 ? ` (${favoritesCount})` : ""}
        </button>
      </div>

      {showFilters && (
        <div className="filter-bar">
          <label className="filter-group">
            <span className="filter-label">Estado</span>
            <select
              className="filter-select"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>
          </label>

          <label className="filter-group">
            <span className="filter-label">Especie</span>
            <select
              className="filter-select"
              value={species}
              onChange={(e) => onSpeciesChange(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="human">Humano</option>
              <option value="alien">Alienígena</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};