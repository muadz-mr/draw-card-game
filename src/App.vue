<template>
  <v-app>
    <v-app-bar app color="primary" elevation="2" dark>
      <v-app-bar-title>Draw It Game</v-app-bar-title>
    </v-app-bar>

    <v-main class="main-bg">
      <start-screen v-if="initiate" @playersReady="startGame" />
      <playing-screen v-if="playersReady" />
    </v-main>
  </v-app>
</template>

<script>
import StartScreen from "./components/StartScreen.vue";
import PlayingScreen from "./components/PlayingScreen.vue";

export default {
  name: "App",

  components: {
    StartScreen,
    PlayingScreen,
  },

  data: () => ({}),
  computed: {
    initiate() {
      return this.$store.state.initiateGame;
    },
    playersReady() {
      return this.$store.state.playersReady;
    },
  },
  methods: {
    startGame(isPlayersReady) {
      if (!isPlayersReady) {
        return;
      }

      // this.initiate = false;
      // this.playersReady = isPlayersReady;
      this.$store.commit("setInitiateGame", false);
      this.$store.commit("setPlayersReady", isPlayersReady);
      this.$store.commit("setRandomizedDeck");
    },
  },
};
</script>
