<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="d-flex text-center justify-center align-center card-area">
        <div class="card-place left">
          <img
            v-if="player1CurrentCard"
            class="card mt-8"
            :src="player1CurrentCard ? player1CurrentCard.asset : null"
            width="120"
          />
        </div>

        <div
          class="card-deck primary white--text"
          :class="{ 'empty-deck': randomizedDeck.length === 0 }"
        >
          DECK
        </div>

        <div class="card-place right">
          <img
            v-if="player2CurrentCard"
            class="card mt-8"
            :src="player2CurrentCard ? player2CurrentCard.asset : null"
            width="120"
          />
        </div>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="text-center">
      <v-col cols="6">
        <p>
          Points: <span class="primary--text text-h2">{{ player1.score }}</span>
        </p>
        <h3 class="text-h4">{{ player1.name }}</h3>
        <v-btn
          :disabled="currentTurn != 1"
          class="px-8 my-8"
          color="primary"
          @click="drawACard(1)"
        >
          Draw
        </v-btn>
      </v-col>
      <v-col cols="6">
        <p>
          Points: <span class="primary--text text-h2">{{ player2.score }}</span>
        </p>
        <h3 class="text-h4">{{ player2.name }}</h3>
        <v-btn
          :disabled="currentTurn != 2"
          class="px-8 my-8"
          color="primary"
          @click="drawACard(2)"
        >
          Draw
        </v-btn>
      </v-col>
    </v-row>

    <pop-up-modal v-if="result" @rematch="rematch">
      <template #title>Game Ended</template>
      <template #body v-if="result === 3">
        <p class="text-h3 font-weight-semibold">Draw!</p>
      </template>
      <template #body v-else-if="result === 1">
        <p class="text-h3 font-weight-semibold">{{ player1.name }} win!</p>
      </template>
      <template #body v-else-if="result === 2">
        <p class="text-h3 font-weight-semibold">{{ player2.name }} win!</p>
      </template>
    </pop-up-modal>
  </v-container>
</template>

<script>
import PopUpModal from "./PopUpModal.vue";

export default {
  name: "PlayingScreen",

  components: {
    PopUpModal,
  },
  data: () => ({
    currentTurn: 1,
    nextTurn: 2,
    isNewTurn: true,
    latestDrawnCard: null,
    player1CurrentCard: null,
    player2CurrentCard: null,
    showDialog: false,
  }),
  computed: {
    player1() {
      return this.$store.state.player1;
    },
    player2() {
      return this.$store.state.player2;
    },
    randomizedDeck() {
      return this.$store.state.randomizedDeck;
    },
    result() {
      if (this.player1.score > this.player2.score) {
        return 1;
      } else if (this.player1.score < this.player2.score) {
        return 2;
      } else if (this.player1.score === this.player2.score) {
        return 3;
      } else {
        return null;
      }
    },
  },
  watch: {
    latestDrawnCard(value) {
      if (!value) return;

      if (value.drawnBy === 1) {
        this.player1CurrentCard = value;
        this.player2CurrentCard = null;
      } else {
        this.player2CurrentCard = value;

        this.calculatePoints(
          this.player1CurrentCard.value,
          this.player2CurrentCard.value
        );
      }
    },
  },
  methods: {
    rematch() {
      this.currentTurn = 1;
      this.nextTurn = 2;
      this.isNewTurn = true;
      this.latestDrawnCard = null;
      this.player1CurrentCard = null;
      this.player2CurrentCard = null;
    },
    calculatePoints(value1, value2) {
      if (value1 > value2) this.$store.commit("setPlayer1Score", 1);
      else if (value1 < value2) this.$store.commit("setPlayer2Score", 1);
    },
    drawACard(playerTurn) {
      if (this.randomizedDeck.length === 0) {
        alert("All cards have been drawn!");
        this.$store.commit("setGameEnded", true);
        this.$store.commit("setGameWinner", this.result);
        return;
      }

      if (playerTurn === this.currentTurn) {
        this.currentTurn = this.nextTurn;
        this.nextTurn = playerTurn;
      } else {
        return;
      }

      this.$store.dispatch("drawACardFromDeck", playerTurn);
      this.latestDrawnCard = this.$store.state.latestDrawnCard;

      if (playerTurn === 2) {
        this.isNewTurn = true;
      } else {
        this.isNewTurn = false;
      }
    },
  },
};
</script>

<style scoped>
.card-area {
  background-color: rgb(243, 243, 243);
  border-radius: 1rem;
  overflow: hidden;
  height: 400px;
}
.card-deck {
  display: grid;
  place-items: center;
  width: 140px;
  height: 180px;
  border-radius: 0.5rem;
}
.empty-deck {
  visibility: hidden;
}
.refilled-deck {
  visibility: visible;
}
.card {
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 20px;
}
.card-place {
  width: 120px;
  height: 180px;
}
.card-place.left {
  margin-right: 1rem;
}
.card-place.right {
  margin-left: 1rem;
}
</style>
