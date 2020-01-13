/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from "vue";
import Vuex from "vuex";

// Store functionality
import modules from "./modules";

Vue.use(Vuex);

// Create a new store
const store = new Vuex.Store({
  modules
});

export default store;
