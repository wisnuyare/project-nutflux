import { defineStore } from "pinia";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    genres: [],
    selectedGenres: [],
    sortBy: "popularity.desc",
    searchQuery: "",
    currentPage: 1,
    realType: "movie",
    isLoading: false,
    error: null,
  }),

  getters: {
    pageTitle: () => {
      const route = useRoute(); // Get the current route

      if (route.query.category && route.params.type === "movies") {
        return `Movies Category: ${getGenre(parseInt(route.query.category))}`;
      }
      if (route.params.type === "movies") return "Movies";
      if (route.params.type === "tvshows") return "TV Shows";
      return "Content";
    },
  },


  actions: {
    async fetchMovies() {
      const { fetchDiscoverMovies, fetchMultiSearch } = useMovies();
      this.isLoading = true;
      try {
        if (this.searchQuery) {
          this.movies = await fetchMultiSearch(this.searchQuery);
        } else {
          this.movies = await fetchDiscoverMovies(
            this.sortBy,
            this.realType,
            this.selectedGenres.length ? this.selectedGenres.join(",") : "",
            this.currentPage
          );
        }
      } catch (err) {
        console.error(err);
        this.error = "Failed to fetch movies";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMoreMovies() {
      const { fetchDiscoverMovies } = useMovies();
      this.currentPage += 1;
      const newMovies = await fetchDiscoverMovies(
        this.sortBy,
        this.realType,
        this.selectedGenres.length ? this.selectedGenres.join(",") : "",
        this.currentPage
      );
      this.movies = [...this.movies, ...newMovies];
    },
  },
});
