// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = async ({
  page = 1,
  name = "",
  status = "",
  species = "",
} = {}) => {
  const params = new URLSearchParams({ page: String(page) });

  if (name) params.set("name", name);
  if (status) params.set("status", status);
  if (species) params.set("species", species);

  const response = await fetch(`${BASE_URL}/character/?${params.toString()}`);

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "No se encontraron personajes con ese criterio de búsqueda."
        : "Ocurrió un error al consultar la API. Inténtalo de nuevo."
    );
  }

  return response.json();
};