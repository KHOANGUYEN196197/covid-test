import { createStore } from "vuex";

export default createStore({
  state: {
    countries: [],
    currentPage: 1,
    perPage: 40,
    loading: false,
    sortBy: "TotalConfirmed",
    slugCountry: "",
    countryDetail: [],
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries.sort(
        (a, b) => b[state.sortBy] - a[state.sortBy]
      );
      state.pageCount = Math.ceil(countries.length / state.perPage);
      state.loading = false;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setSortBy(state, sortBy) {
      state.sortBy = sortBy;
    },
    setCountry(state, countryDetail) {
      state.countryDetail = countryDetail;
    },
  },
  actions: {
    async getCovidData({ commit, state }) {
      state.loading = true;
      try {
        const response = await fetch("https://api.covid19api.com/summary");
        const data = await response.json();
        commit("setCountries", data.Countries);
      } catch (error) {
        console.error(error);
        state.loading = false;
      } finally {
        state.loading = false;
      }
    },
    async getDetailCountry({ commit }, slug) {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${slug}?fullText=true`
        );
        const data = await res.json();
        commit("setCountry", data);
      } catch (error) {
        commit("setCountry", error);
      }
    },
    setCurrentPage({ commit, state }, page) {
      if (page > 0 && page <= state.pageCount) {
        commit("setCurrentPage", page);
      }
    },
    setSortBy({ commit, dispatch }, sortBy) {
      commit("setSortBy", sortBy);
      dispatch("getCovidData");
    },
  },
});
