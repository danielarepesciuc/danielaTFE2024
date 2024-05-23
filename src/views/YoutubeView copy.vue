<template>
  <div v-for="video in videos">
    <h1>{{ video.Titre }}</h1>
  </div>
</template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        videos: [
          {
            Titre: "Titre de la vidéo",
          },
        ],
      };
    },
    computed: {
      // fonctions calculées
    },
    methods: {
      // fonctions Javascript
    },
    mounted() {
      axios
      .get("https://api.avecbertrand.tech/api/content/items/videos")
      .then((response) => {
        this.videos = response.data.reverse();
      });
    },
  };
</script>