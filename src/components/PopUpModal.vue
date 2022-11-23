<template>
  <v-dialog v-model="ended" max-width="480" persistent>
    <v-card class="text-center">
      <v-card-title class="text-h5 justify-center">
        <slot name="title" />
      </v-card-title>

      <v-card-text>
        <slot name="body" />
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="primary" class="px-4" @click="rematch">Rematch</v-btn>
        <v-btn
          color="secondary"
          class="px-4"
          text
          @click="$store.commit('setGameEnded', false)"
          >Stop playing</v-btn
        >
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
