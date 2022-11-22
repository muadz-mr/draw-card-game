<template>
  <v-dialog v-model="ended" max-width="480" persistent>
    <v-card>
      <v-card-title class="text-h5">
        <slot name="title" />
      </v-card-title>

      <v-card-text>
        <slot name="body" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="secondary darken-1"
          text
          @click="$store.commit('setGameEnded', false)"
          >Stop playing</v-btn
        >

        <v-btn color="green darken-1" @click="rematch">Rematch</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PopUpDialog",

  data: () => {
    return {};
  },
  computed: {
    ended() {
      return this.$store.state.gameEnded;
    },
  },
  methods: {
    rematch() {
      this.$emit("rematch");
      this.$store.dispatch("resetPlayers");
      this.$store.commit("setGameEnded", false);
    },
  },
};
</script>

<style scoped></style>
