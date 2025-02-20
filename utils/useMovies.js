export default function useMovies() {
  const config = useRuntimeConfig();
  const API_TOKEN = config.public.tmdbApiKey; 
  const BASE_URL = "https://api.themoviedb.org/3";

  const fetchTrendingMovies = async () => {
    try {
      const url = `${BASE_URL}/trending/movie/week`;
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`, 
        },
      });
      return response.results || [];
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return [];
    }
  };

  const fetchDiscoverMovies = async (
    sortBy = "popularity.desc",
    type = "movie",
    genre,
    page = 1
  ) => {
    try {
      const withGenre = genre ? `&with_genres=${genre}` : "";
      const validSortOptions = [
        "popularity.desc",
        "primary_release_date.desc",
        "vote_average.desc",
        "popularity.asc",
        "primary_release_date.asc",
        "vote_average.asc",
      ];
      if (!validSortOptions.includes(sortBy)) {
        console.warn(`Invalid sortBy: "${sortBy}", defaulting to "popularity.desc"`);
        sortBy = "popularity.desc";
      }
  
      const validTypes = ["movie", "tv"];
      if (!validTypes.includes(type)) {
        console.warn(`Invalid type: "${type}", defaulting to "movie"`);
        type = "movie";
      }
  
      const url = `${BASE_URL}/discover/${type}?sort_by=${sortBy}${withGenre}&page=${page}`;
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
  
      return response.results || [];
    } catch (error) {
      console.error("Error fetching discover movies:", error);
      return [];
    }
  };

  const fetchSearchByKeyword = async (query) => {
    if (!query.trim()) {
      searchResults.value = [];
      return;
    }
    try {
      const url = `${BASE_URL}/search/keyword?query=${query}`;
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      console.log(response)
      return response.results || {};
    } catch (error) {
      console.error("Error fetching discover movies:", error);
      return [];
    }
  };
  
  

  const fetchMoviesDetail = async (movieID) => {
    try {
      const url = `${BASE_URL}/movie/${movieID}`;
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      console.log(response)
      return response || {};
    } catch (error) {
      console.error("Error fetching discover movies:", error);
      return [];
    }
  };

  const fetchMultiSearch = async (query) => {
    try {
      const url = `${BASE_URL}/search/multi?query=${query}`;
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      return response.results || [];
    } catch (error) {
      console.error("Error fetching discover movies:", error);
      return [];
    }
  };

  const fetchMoviesRecommendations = async (movieID) => {
    try {
      const url = `${BASE_URL}/movie/${movieID}/recommendations`;
      const response = await $fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      return response.results || [];
    } catch (error) {
      console.error("Error fetching discover movies:", error);
      return [];
    }
  };

  

  return { fetchTrendingMovies, fetchDiscoverMovies, fetchMoviesDetail, fetchMoviesRecommendations, fetchMultiSearch, fetchSearchByKeyword };
}
