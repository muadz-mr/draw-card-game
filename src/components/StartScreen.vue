<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" lg="4">
        <v-card>
          <v-card-text>
            <v-form class="pa-6">
              <v-text-field
                v-model="player1Name"
                label="Player 1 Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="player2Name"
                label="Player 2 Name"
                required
              ></v-text-field>

              <v-btn
                :disabled="
                  !player1Name ||
                  !player2Name ||
                  !player1Name.trim() ||
                  !player2Name.trim()
                "
                block
                color="primary"
                class="mr-4"
                @click="start"
              >
                Start!
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StartScreen",

  data: () => ({
    player1Name: "",
    player2Name: "",
    playersReady: false,
  }),
  methods: {
    start() {
      this.$store.commit(
        "setPlayer1Name",
        this.player1Name ? this.player1Name : "Guest1"
      );
      this.$store.commit(
        "setPlayer2Name",
        this.player2Name ? this.player2Name : "Guest2"
      );

      if (this.player1Name && this.player2Name) {
        this.$store.commit("setRandomizedDeck");
        this.playersReady = true;
        this.$emit("playersReady", this.playersReady);
      }
    },
  },
};
</script>
