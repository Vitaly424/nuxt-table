export const state = () => ({
  comments: [],
  isLoading: true,
});

export const mutations = {
  COMMENTS(state, comments) {
    state.comments = comments;
    state.isLoading = false;
  },
  SORT_COMMENTS(state, comments) {
    state.comments = comments;
  },
};

export const actions = {
  async getComments({ commit }) {
    const { data } = await this.$axios.get("/comments");
    commit("COMMENTS", data);
  },
  async sortComments({ commit }, isSort) {
    if (isSort) {
      const { data } = await this.$axios.get("/comments");
      data.sort((a, b) => b.id - a.id);
      commit("SORT_COMMENTS", data);
    } else {
      const { data } = await this.$axios.get("/comments");
      data.sort((a, b) => a.id - b.id);
      commit("SORT_COMMENTS", data);
    }
  },
};

export const getters = {
  getComments(state) {
    return state.comments;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
};
