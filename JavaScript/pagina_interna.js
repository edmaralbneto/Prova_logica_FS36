const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
const apiKey = 'aa811dd7b48eacd983287c674de0c3df';
const token = 'eyJhbGciOiJIUzI1NiJ9yJhdWQiOiJhYTgxMWRkN2I0OGVhY2Q5ODMyODdjNjc0ZGUwYzNkZiIsIm5iZiI6MTcyNjc4OTkyMy4xMzk1NTgsInN1YiI6IjY2ZWNiNzUyY2RkMTA4ZWQ5MzIyOWI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B9vamBCoIOT3w5y0b4Yw2hUlhx2Yd1oiXc_bwkVHoYU';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; // URL base para as imagens dos filmes

async function fetchMovies() {
    const response = await fetch(`${apiUrl}?api_key=${apiKey}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar os filmes');
    }
    const data = await response.json();
    return data.results;
}

let movies = [];

async function initialize() {
    try {
        movies = await fetchMovies();
        renderMovies();
    } catch (error) {
        console.error(error);
    }
}

function renderMovies(filter = '', sort = 'default') {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = '';

    const filteredMovies = movies
        .filter(movie => movie.title.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'name') return a.title.localeCompare(b.title);
            return 0;
        });

    filteredMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        
        // Adiciona a imagem do pôster com a URL completa
        const poster = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'placeholder.jpg'; // Usar imagem genérica se não houver pôster
        
        movieDiv.innerHTML = `
            <img src="${poster}" alt="${movie.title} poster" style="width: 100%; border-radius: 5px;">
            <h2>${movie.title}</h2>
            <p><strong>Data de lançamento:</strong> ${movie.release_date}</p>
            <p>${movie.overview}</p>
        `;
        moviesList.appendChild(movieDiv);
    });
}

document.getElementById('filter').addEventListener('input', (e) => {
    renderMovies(e.target.value, document.getElementById('sort').value);
});

document.getElementById('sort').addEventListener('change', (e) => {
    renderMovies(document.getElementById('filter').value, e.target.value);
});

initialize();
