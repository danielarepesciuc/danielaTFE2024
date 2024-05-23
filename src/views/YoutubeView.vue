<script setup>
  import Videos from "../components/Videos.vue";
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import axios from "axios";
  import { RouterLink, RouterView } from "vue-router";
  import VideoPrincipale from "../components/VideoPrincipale.vue";
</script>
<template>
  <div class="container flex flex-col items-end pr-8 bottom-4 right-4  z-10 fixed">
    <a href="#" class="gradient p-2 rounded"><img class="rotate-180" src="../assets/Images/Icon/chevron-down.svg"></a>
  </div>
    <!--Recherche-->
    <section class="container flex flex-col items-center text-white lg:px-12 lg:py-4  sm:px-5 gap-12 mt-2">
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-'' self-stretch">
          <h2>Videos YouTube</h2>
          <p>Découvrez des tutoriels pratiques pour développer vos compétences et découvrir des nouveaux domaines à explorer.</p>
        </div>
        <div class="flex items-center bg-custom rounded-md w-full">
          <input type="text" v-model="searchQuery" @input="searchVideos" placeholder="Rechercher" class="rounded-md py-2  px-4 text-black w-full bg-custom" />
          <img src="../assets/Images/Icon/Barre-recherche.svg" alt="Search Icon" class=" ml-auto w-4 h-4 mx-2" />
        </div>  
      </div>
    </section>
    
    <!-- Catégories deskop -->
    <section class="desktopmenu lg:hidden flex justify-center items-center" @mouseleave="dropdownCategory = false">
      <div class="flex m-4 relative">
        <div class="flex">
          <div class="flex">
            <div class="flex sm:flex-col">
              <button class="text-white text-left mx-6 py-2 px-3 sm:mx-0" @click="deselectCategory()" :class="{ 'gradient rounded': !selectedCategory && filteredVideos.length === videos.length}"><RouterLink :to="{ path: '/videos' }">Tous</RouterLink></button>
                <div v-for="category in filteredCategories" :key="category._id" class="flex flex-col relative py-2 px-3" :class="{ 'gradient rounded': selectedCategory === category._id, 'gradient rounded': isCategorySelected(category.Slug)}">
                <div class="flex items-center">
                  <button 
                    class="text-white" 
                    @click="selectCategory(category._id)"
                    @mouseenter="toggleDropdown(category._id)">
                    <RouterLink 
                      :to="{ name: 'videos', params: { CategorySlug: category.Slug } }">
                      {{ getCategoryName(category._id) }}
                    </RouterLink>
                  </button>
                  <button v-if="getSubcategories(category._id) !=0" class="ml-2">
                    <img src="../assets/Images/Icon/chevron-down.svg" alt="Arrow Icon" class="w-6 h-6" />
                  </button>
                </div>
                <div v-if="dropdownCategory === category._id" class="absolute top-full left-0 bg rounded" >
                  <div class="p-4 flex flex-col">
                    <button v-for="subcategory in getSubcategories(category._id)" :key="subcategory._id" @click="selectCategory(subcategory._id)" class="text-white my-2 align-left"><RouterLink :to="{ name: 'videos', params: { CategorySlug: subcategory.Slug }}">{{ subcategory.Nom }}</RouterLink></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Categories mobiles-->
    <section class="menumobile px-10 pb-4">
      <div class="flex justify-end">
        <button @click="toggleMenu" class="CTA2 flex justify-end text-white"><img src="../assets/Images/Icon/Filter.png" class="w-5">Catégories</button>
      </div>
      <div v-if="activemenu" class="absolute w-full left-0 text-white bg rounded-xl shadow-md px-5 py-5">
        <button class="text-white text-left mx-6 py-2 px-3 sm:mx-0 lg:mx-0 md:mx-0" @click="deselectCategory(), activemenu = false"><RouterLink :to="{ path: '/videos' }">Tous</RouterLink></button>
        <div v-for="category in filteredCategories" :key="category._id" class="flex flex-col relative py-2 px-3">
          <div class="flex items-center justify-between">
            <button class="text-white" @click="selectCategory(category._id), activemenu = false"><RouterLink :to="{ name: 'videos', params: { CategorySlug: category.Slug } }">{{ getCategoryName(category._id) }}</RouterLink></button>
            <button v-if="getSubcategories(category._id) !=0" @click="toggleDropdown(category._id)" class="ml-2" :class="{ 'rotate-180': dropdownCategory === category._id }">
              <img src="../assets/Images/Icon/chevron-down.svg" alt="Arrow Icon" class="w-6 h-6"/>
            </button>
          </div>
          <div v-if="dropdownCategory === category._id" class="">
            <div class="p-4">
              <button v-for="subcategory in getSubcategories(category._id)" :key="subcategory._id" @click="selectCategory(subcategory._id), activemenu = false" class="text-white my-2 align-left flex flex-col" ><RouterLink :to="{ name: 'videos', params: { CategorySlug: subcategory.Slug }}">{{ subcategory.Nom }}</RouterLink></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  <!-- Videos -->
  <div class="container flex flex-wrap px-20 lg:px-[20px] px-[64px]">
  <div class="container my-5" v-if="filteredVideos.length === 0">
    <h5 class="my-5">Aucun resultat trouve.</h5>
    <p class="">Essayez de rechercher un autre mot-clé ou vérifiez l'orthographe de la requête introduite.</p>
    <div class="flex flex-wrap my-4">
    </div>
  </div> 

  <!-- Afficher d'abord la vidéo principale -->
  <div v-for="(video, index) in filteredVideos" :key="index" class="mx-auto flex justify-start w-full sm:px-[20px]">
    <div v-if="video.VideoPrincipale && getCategorySlug(video.Catégorie._id) === $route.params.CategorySlug" class="mx-auto flex flex-col justify-start w-full sm:pt-2">
      <h2 class="mb-4 sm:mt-4 sm:text-2xl">{{ getCategoryTitle(video.Catégorie._id) }}</h2>
      <VideoPrincipale
        :titre="video.Titre"
        :url="video.URL"
        :miniature="video.Miniature.path"
        :catégorie="getCategoryName(video.Catégorie._id)"
        :categorySlug="getCategorySlug(video.Catégorie._id)"
        :URLSlug="video.slug"
      />
      <h4 class="mt-12 sm:mb-2 sm:text-2xl">Aller plus loin</h4>
    </div>
  </div>

  <!-- Ensuite, afficher les autres vidéos -->
  <div v-for="(video, index) in filteredVideos" :key="index" class="mx-auto mb-4 flex justify-start">
    <div v-if="!video.VideoPrincipale ||  getCategorySlug(video.Catégorie._id) !== $route.params.CategorySlug" class="mx-auto my-4 sm:mt-1 flex justify-start">
      <Videos 
        :titre="video.Titre"
        :url="video.URL"
        :miniature="video.Miniature.path"
        :catégorie="getCategoryName(video.Catégorie._id)"
        :categorySlug="getCategorySlug(video.Catégorie._id)"
        :URLSlug="video.slug"
      />
    </div>
  </div>
</div>
</template>
  <script>
  import axios from "axios";
  import { RouterLink } from "vue-router";
  import { ref, onMounted, onBeforeUnmount } from "vue";
  const isWideScreen = ref(window.innerWidth > 1024);

  const dropdownCategory = ref(null);

  const handleResize = () => {
    isWideScreen.value = window.innerWidth > 1024;
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  export default {
    data() {
      return {
        selectedCategory: null,
        showButton: false,
        activemenu: false,
        openedCategoryDropdown: false,
        currentIndex: 0,
        searchQuery: "",
        videos: [
          {
            Titre: "Titre de la vidéo",
            Description: "Description de la vidéo",
            Miniature: {
              path: "",
            },
            URL: "URL de la vidéo",
            Catégorie:{ _model: "CategoriesYouTube", _id: "a5cb0384353666176400024f" },
            _id: "1",
          },
        ],
        categories: [
          {
            "Nom": "3D",
            "Slug": "3d",
            "_pid": null,
            "_o": 0,
            "_modified": 1710963474,
            "_mby": "2c97cdb4336534fdbe000056",
            "_created": 1710963471,
            "_state": 1,
            "_cby": "2c97cdb4336534fdbe000056",
            "_id": "a5b307243165364995000273"
            },
        ],
      };
    },
    computed: {
      filteredCategories() {
        return this.categories.filter(category => category._pid === null);
      },
      filteredVideos() {
        let filteredVideos = this.videos;

      const CategorySlug = this.$route.params.CategorySlug;
      if (CategorySlug) {
        const categoryId = this.categories.find(cat => cat.Slug === CategorySlug)?._id;
        if (categoryId) {
          const subCategories = this.categories.filter(cat => cat._pid === categoryId && cat._id !== categoryId);
          filteredVideos = filteredVideos.filter(video => {
            return video.Catégorie._id === categoryId || subCategories.some(subCat => subCat._id === video.Catégorie._id);
          });
        }
      }

      // Rechercher les vidéos si une requête de recherche est spécifiée
      if (this.searchQuery.trim() !== "" && this.searchQuery.trim().length > 0){
        const query = this.searchQuery.trim().toLowerCase();
        filteredVideos = filteredVideos.filter(video => video.Titre.toLowerCase().includes(query));
      }

      return filteredVideos;
      },
    },
    methods: {
      toggleMenu() {
      this.activemenu = !this.activemenu;
      },
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat._id === categoryId);
        return category ? category.Nom : 'Catégorie inconnue';
      },
      getCategoryTitle(categoryId) {
        const category = this.categories.find(cat => cat._id === categoryId);
        return category ? category.Titre : 'Titre inconnu';
      },
      toggleDropdown(categoryId){
        dropdownCategory.value = dropdownCategory.value === categoryId ? null : categoryId;
      },
      getSubcategories(parentId) {
        return this.categories.filter(category => category._pid === parentId);
      },
      getCategoryName(categoryId) {
          const categoryIdStr = categoryId._id || categoryId; // Si categoryId est un objet, utilisez son _id, sinon utilisez categoryId directement
          const category = this.categories.find(cat => cat._id === categoryIdStr);
          return category ? category.Nom : 'Catégorie inconnue';
        },
        getCategorySlug(categoryId) {
        const category = this.categories.find(cat => cat._id === categoryId);
        return category ? category.Slug : '';
      },
      getParentCategory(subcategoryId) {
        const subcategory = this.categories.find(cat => cat._id === subcategoryId);
        return subcategory ? subcategory._pid : null;
      },
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
      },
      deselectCategory(){
      this.selectedCategory = null;
      },
      isCategorySelected(CategorySlug) {
        return this.$route.params.CategorySlug === CategorySlug;
      },
          // Fonction pour remonter en haut de la page
    },
    mounted() {
      axios
      .get("https://api.avecbertrand.tech/api/content/items/videos")
      .then((response) => {
        this.videos = response.data.reverse();
      });
      axios
        .get("https://api.avecbertrand.tech/api/content/items/CategoriesYouTube")
        .then((response) => {
          this.categories = response.data;
        })
    },
  };
</script>