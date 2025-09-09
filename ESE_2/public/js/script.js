class MovieCatalog {
    constructor() {
        this.movies = [];
        this.init();
    }

    async init() {
        await this.loadMovies();
        this.setupEventListeners();
    }

    async loadMovies() {
        try {
            const response = await fetch('/movies');
            this.movies = await response.json();
            this.renderMovies();
        } catch (error) {
            console.error('Error loading movies:', error);
            alert('Failed to load movies');
        }
    }

    renderMovies() {
        const moviesList = document.getElementById('moviesList');
        moviesList.innerHTML = '';

        if (this.movies.length === 0) {
            moviesList.innerHTML = '<p class="text-center text-gray-500 py-8">No movies found. Add some movies to get started!</p>';
            return;
        }

        this.movies.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            moviesList.appendChild(movieCard);
        });
    }

    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card bg-gray-50 rounded-lg p-4 border border-gray-200';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-semibold text-gray-800">${movie.title}</h3>
                <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">${movie.rating || 'N/A'}/10</span>
            </div>
            <div class="space-y-2 text-gray-600">
                <p><span class="font-medium">Director:</span> ${movie.director}</p>
                <p><span class="font-medium">Genre:</span> ${movie.genre}</p>
                <p><span class="font-medium">Year:</span> ${movie.release_year}</p>
            </div>
            <div class="flex space-x-2 mt-4">
                <button onclick="movieCatalog.editMovie(${movie.id})" class="btn-edit text-white px-4 py-2 rounded text-sm transition-all">Edit</button>
                <button onclick="movieCatalog.deleteMovie(${movie.id})" class="btn-delete text-white px-4 py-2 rounded text-sm transition-all">Delete</button>
            </div>
        `;
        return card;
    }

    async addMovie(event) {
        event.preventDefault();
        
        const movieData = {
            title: document.getElementById('title').value,
            director: document.getElementById('director').value,
            genre: document.getElementById('genre').value,
            release_year: parseInt(document.getElementById('release_year').value),
            rating: document.getElementById('rating').value ? parseFloat(document.getElementById('rating').value) : null
        };

        try {
            const response = await fetch('/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });

            if (response.ok) {
                document.getElementById('addMovieForm').reset();
                await this.loadMovies();
                alert('Movie added successfully!');
            } else {
                throw new Error('Failed to add movie');
            }
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Failed to add movie');
        }
    }

    async editMovie(id) {
        const movie = this.movies.find(m => m.id === id);
        if (!movie) return;

        const newTitle = prompt('Enter new title:', movie.title);
        const newDirector = prompt('Enter new director:', movie.director);
        const newGenre = prompt('Enter new genre:', movie.genre);
        const newYear = prompt('Enter new release year:', movie.release_year);
        const newRating = prompt('Enter new rating (0-10):', movie.rating);

        if (newTitle === null || newDirector === null || newGenre === null || newYear === null) {
            return;
        }

        const movieData = {
            title: newTitle,
            director: newDirector,
            genre: newGenre,
            release_year: parseInt(newYear),
            rating: newRating ? parseFloat(newRating) : null
        };

        try {
            const response = await fetch(`/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });

            if (response.ok) {
                await this.loadMovies();
                alert('Movie updated successfully!');
            } else {
                throw new Error('Failed to update movie');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
            alert('Failed to update movie');
        }
    }

    async deleteMovie(id) {
        if (!confirm('Are you sure you want to delete this movie?')) {
            return;
        }

        try {
            const response = await fetch(`/movies/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await this.loadMovies();
                alert('Movie deleted successfully!');
            } else {
                throw new Error('Failed to delete movie');
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Failed to delete movie');
        }
    }

    setupEventListeners() {
        document.getElementById('addMovieForm').addEventListener('submit', (e) => this.addMovie(e));
    }
}

// Initialize the application
const movieCatalog = new MovieCatalog();