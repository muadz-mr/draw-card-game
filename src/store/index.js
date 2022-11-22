import Vue from 'vue'
import Vuex from 'vuex'
import deckOfCards from '../data/cards'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initiateGame: true,
    playersReady: false,
    gameEnded: false,
    initialDeckOfCards: deckOfCards,
    randomizedDeck: [],
    latestDrawnCard: null,
    player1: {
      name: "",
      score: 0,
      currentDrawnCard: null,
    },
    player2: {
      name: "",
      score: 0,
      currentDrawnCard: null,
    },
    gameWinner: null,
  },
  mutations: {
    setInitiateGame(state, value) {
      state.initiateGame = value;
    },
    setPlayersReady(state, value) {
      state.playersReady = value;
    },
    setRandomizedDeck(state) {
      let cards = [...state.initialDeckOfCards];

      for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [cards[i], cards[j]] = [cards[j], cards[i]];
      }

      state.randomizedDeck = cards;
    },
    setPlayer1Name(state, value) {
      state.player1.name = value;
    },
    setPlayer2Name(state, value) {
      state.player2.name = value;
    },
    setPlayer1Score(state, value) {
      state.player1.score += value;
    },
    setPlayer2Score(state, value) {
      state.player2.score += value;
    },
    resetPlayerScore(state, value) {
      state.player1.score = value;
      state.player2.score = value;
    },
    setPlayer1CurrentDrawnCard(state, value) {
      state.player1.currentDrawnCard = value;
    },
    setPlayer2CurrentDrawnCard(state, value) {
      state.player2.currentDrawnCard = value;
    },
    setGameEnded(state, value) {
      state.gameEnded = value;
    },
    setGameWinner(state, value) {
      state.gameWinner = value;
    },
  },
  actions: {
    drawACardFromDeck({ state, commit }, playerTurn) {
      if (!playerTurn) return;

      const drawnCard = this.state.randomizedDeck.shift();

      if (playerTurn == 1) {
        commit('setPlayer1CurrentDrawnCard', drawnCard);
      } else {
        commit('setPlayer2CurrentDrawnCard', drawnCard);
      }
      drawnCard['drawnBy'] = playerTurn;
      state.latestDrawnCard = drawnCard;
    },
    resetPlayers({ commit }) {
      commit('setRandomizedDeck');
      commit('resetPlayerScore', 0);
      commit('setPlayer1CurrentDrawnCard', null);
      commit('setPlayer2CurrentDrawnCard', null);
    }
  },
  modules: {
  }
})
