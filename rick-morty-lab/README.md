# Rick and Morty Lab 🪐

Aplicación en **React** que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/) mediante peticiones asíncronas con `fetch` + `async/await`, procesa los datos JSON externos y los renderiza dinámicamente en una interfaz temática espacial/neón.

## Objetivo del laboratorio

Cumplir con los cuatro criterios de evaluación:

1. **Manejo de React y Hooks:** `useState` para datos, estados de carga (`loading`) y de error (`error`); `useEffect` dispara las peticiones HTTP respetando el ciclo de vida.
2. **Peticiones HTTP asíncronas:** Conexión con la API usando `fetch` con `async/await` y manejo de la paginación mediante la propiedad `info` (`prev`/`next`) que entrega la propia API.
3. **Arquitectura limpia y componentización:** Responsabilidades divididas en componentes reutilizables (`Card`, `CardList`, `SearchBar`, `Loader`, `DetailModal`) y flujo estricto de capas:

   ```
   components/ → pages/ → App.jsx → main.jsx → index.html
   ```

4. **Coherencia estética:** Estética *Retro Arcade Cabinet* inspirada en la máquina arcade y la web oficial de la API: paleta oscura de cabina (`#0b0e14`) con acentos neón —verde portal `#39ff14`, cian `#00f0ff`, amarillo moneda `#facc15`—, tipografías pixel/HUD/legible (`Press Start 2P`, `Share Tech Mono`, `Space Grotesk`), efecto CRT con líneas de escaneo, tarjetas estilo *fighter* con barra de HP, buscador con glow, loader de portal y modal arcade.

## Stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- JavaScript (JSX) + CSS propio
- [Rick and Morty API](https://rickandmortyapi.com/)

## Estructura del proyecto

```
rick-morty-lab/
├── index.html                  # Punto de entrada: div#root + script de main.jsx
├── vite.config.js              # Configuración de Vite con plugin de React
├── src/
│   ├── main.jsx                # ReactDOM.createRoot + <App/> en <StrictMode>
│   ├── App.jsx                 # Caparazón: compone la página <Home/>
│   ├── index.css               # Reset global y variables de tema (neón/espacial)
│   ├── App.css                 # Estilos de todos los componentes
│   ├── pages/
│   │   └── Home.jsx            # Orquestador: useState/useEffect, fetch y render condicional
│   ├── components/
│   │   ├── Card.jsx            # Tarjeta individual (imagen, nombre, estado/especie)
│   │   ├── CardList.jsx        # Grid de tarjetas + paginación (info.prev/info.next)
│   │   ├── SearchBar.jsx       # Input controlado para filtrado en tiempo real
│   │   ├── Loader.jsx          # Loader con spinner de portal
│   │   └── DetailModal.jsx     # Modal de detalle del personaje
│   └── services/
│       └── api.js              # Capa centralizada de peticiones HTTP (fetch)
└── public/
    └── favicon.svg             # Favicon de la aplicación
```

**Reglas respetadas:**
- Los componentes no conocen la API: solo reciben props y emiten eventos hacia arriba.
- Toda petición HTTP vive en `services/api.js` (renders libres de `fetch`).
- `Home.jsx` es la única capa que combina estado global de la vista y datos.

## Funcionalidades

- **Listado de personajes:** Grid responsive de tarjetas con imagen, nombre y dato distintivo (estado codificado por color + especie).
- **Buscador en tiempo real:** Filtra por nombre contra la API con *debounce* de 300 ms y reinicia a la página 1 al buscar.
- **Paginación:** Navegación Anterior/Siguiente usando `info.prev` y `info.next`; los botones se deshabilitan en los extremos.
- **Modal de detalle:** Al hacer clic en una tarjeta se abre el detalle completo (estado, especie, género, origen, ubicación). Cierra con el botón ✕, al hacer clic fuera o con la tecla `Esc`.
- **Estados de carga y error:** Loader animado mientras se peticiona y mensaje de error controlado si la petición falla (404 sin resultados u otros errores HTTP).

## Comandos

```bash
npm install        # Instala dependencias
npm run dev        # Entorno de desarrollo con HMR
npm run build      # Build de producción (genera dist/)
npm run preview    # Previsualiza el build de producción
npm run lint       # Valida el código con ESLint (react-hooks incluido)
```

## Cómo se consume la API

La capa `src/services/api.js` expone una única función:

```js
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
```

Se invoca desde `pages/Home.jsx` dentro de un `useEffect` con `async/await` y bloque `try/catch/finally`, actualizando los estados `characters`, `info`, `loading` y `error`.