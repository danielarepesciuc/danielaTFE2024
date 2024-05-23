<template>
  <div class="container flex flex-col items-end pr-8 bottom-4 right-4  z-10 fixed">
    <a href="#" class="gradient p-2 rounded"><img class="rotate-180" src="../assets/Images/Icon/chevron-down.svg"></a>
  </div>
<div class="w-full flex-col justify-center items-center flex gap-2 mt-6">
    <h2>Mon portfolio</h2>
    <p class="lg:px-[20px]">Découvrez mon portfolio, où je partage ma passion pour la technologie, ainsi que des projets personnels,</p>
</div>

  <!-- Catégories mobile -->
  <section class="menumobile py-5 px-10">
      <div class="flex justify-end">
        <button @click="toggleMenu" class="CTA2 flex justify-end text-white"><img src="../assets/Images/Icon/Filter.png" class="w-5">Projets</button>
      </div>
      <div v-if="activemenu" class="menumobile py-5 px-10 absolute w-full left-0 text-white bg rounded-xl shadow-md px-5 py-5 z-10">
      <button class="text-white w-full text-left py-2 px-3 " @click="deselectProject(), activemenu = false" :class="{ 'gradient rounded': filteredProjects.length === portfolio.length }"><RouterLink :to="{ path: '/portfolio' }">Tous</RouterLink></button>
      <div v-for="project in portfolio" :key="project._id" class="" :class="{ 'gradient rounded': selectedProject === project._id, 'gradient rounded': isProjectSelected(project.slug) }">
        <button class="text-white text-left py-2 px-3" @click="selectProject(project._id), activemenu = false"><RouterLink :to="{ name: 'portfolio', params: { slug: project.slug } }">{{ project.Titre }}</RouterLink></button>
      </div>
    </div>
  </section>
<div class="flex flex-row lg:flex-col mx-[64px] lg:mx-[20px] gap-4">
  <!-- Catégories deskop -->
  <section class="lg:hidden w-1/3">
    <div class="">
      <h6 class="text-left">Mes projets</h6>
      <button class="text-white w-full text-left py-2 px-3 " @click="deselectProject()" :class="{ 'gradient rounded': filteredProjects.length === portfolio.length }"><RouterLink :to="{ path: '/portfolio' }">Tous</RouterLink></button>
      <div v-for="project in portfolio" :key="project._id" class="" :class="{ 'gradient rounded': selectedProject === project._id, 'gradient rounded': isProjectSelected(project.slug) }">
        <button class="text-white text-left py-2 px-3" @click="selectProject(project._id)"><RouterLink :to="{ name: 'portfolio', params: { slug: project.slug } }">{{ project.Titre }}</RouterLink></button>
      </div>
    </div>
  </section>
  <!--Projets-->
  <div class="flex flex-col w-full">
    <div v-for="project in filteredProjects" :key="project._id" class="flex justify-end mb-20 lg:mb-10">
    <div class="portfolio-gradient w-full lg:w-full bg-opacity-50  rounded-[20px] backdrop-blur-[20px] flex-col justify-start items-start inline-flex">
      <div class="self-stretch px-6 py-12  flex-col justify-start items-start gap-6 flex">
          <div class="self-stretch flex-col h-auto justify-center items-start gap-2 flex">
              <p>{{ project.Categorie }}</p>
              <div class="self-stretch h-16 flex-col justify-start items-start gap-2 flex">
                  <div class="self-stretch justify-start items-center gap-2 inline-flex">
                      <h6 class="text-left">{{replaceSpecialChars(project.Titre)}}</h6>
                      <div class="w-6 h-6 relative"></div>
                  </div>
                  <p>{{project.Description}}</p>
              </div>
          </div>
      </div>
      <div v-for="(image, index) in project.Images" :key="image._id">
        <img :class="['self-stretch', 'w-full', 'cover', {'rounded-b-[20px]': index === project.Images.length - 1}]"
            :src="'https://api.avecbertrand.tech/storage/uploads/' + image.path"
            :alt="image.title" />
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activemenu: false,
      portfolio: [
      {
        "Titre": "",
        "Images": [
        {
            "path": "",
            "title": "",
            "mime": "image/avif",
            "type": "unknown",
            "description": "",
            "tags": [],
            "size": 1474087,
            "colors": null,
            "width": null,
            "height": null,
            "_hash": "79f428991f4db6b60fa2e135c735ec87",
            "_created": 1712683502,
            "_modified": 1712683502,
            "_cby": "2c97cdb4336534fdbe000056",
            "folder": "9ca962c4396531f4b3000055",
            "_id": "a6eafb60346663660d000089"
        },
        {
            "path": "",
            "title": "",
            "mime": "image/avif",
            "type": "unknown",
            "description": "",
            "tags": [],
            "size": 145142,
            "colors": null,
            "width": null,
            "height": null,
            "_hash": "",
            "_created": 1712684664,
            "_modified": 1712684664,
            "_cby": "2c97cdb4336534fdbe000056",
            "folder": "9ca962c4396531f4b3000055",
            "_id": "a79c52dc34393252f00001c9"
        }
        ],
        "Description": "",
        "slug": "jeu-video",
        "Categorie": "Jeu Video",
        "_state": 1,
        "_modified": 1713859255,
        "_mby": "2c97cdb4336534fdbe000056",
        "_created": 1713859222,
        "_cby": "2c97cdb4336534fdbe000056",
        "_id": "63b3956330343518cd0001bc"
      }
      ]
    };
  },
  computed: {
    filteredProjects() {
      let filteredProjects = this.portfolio;

      const ProjectSlug = this.$route.params.slug;
      if (ProjectSlug) {
        filteredProjects = filteredProjects.filter(project => project.slug === ProjectSlug);
      }
      return filteredProjects;
    },
  },
  methods: {
    toggleMenu() {
      this.activemenu = !this.activemenu;
      },
    deselectProject(){
      this.selectedProject = null;
    },
    isProjectSelected(ProjectSlug) {
      return this.$route.params.slug === ProjectSlug;
    },
    selectProject(ProjectId) {
      this.selectedProject = ProjectId;
    },
    replaceSpecialChars(str) {
      return str
        .replace(/[éèê]/g, 'e')
        .replace(/[àâ]/g, 'a')
        .replace(/[ç]/g, 'c')
        .replace(/[ùû]/g, 'u')
        .replace(/[î]/g, 'i')
        .replace(/[ô]/g, 'o');
    },
  },
  mounted() {
    axios
      .get("https://api.avecbertrand.tech/api/content/items/Portfolio")
      .then((response) => {
        this.portfolio = response.data.reverse();
      })
  },
}
</script>

<style>

</style>

