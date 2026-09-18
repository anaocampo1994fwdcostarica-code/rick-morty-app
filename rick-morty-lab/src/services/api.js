// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = async (page = 1, name = "") => {
  const response = await fetch(`${BASE_URL}/character/?page=${page}&name=${name}`);

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "No se encontraron personajes con ese criterio de búsqueda."
        : "Ocurrió un error al consultar la API. Inténtalo de nuevo."
    );
  }

  return response.json();
};