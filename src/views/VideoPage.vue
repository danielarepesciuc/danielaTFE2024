<script setup>
import Videos from "../components/Videos.vue";
import axios from "axios";
import Carousel from "../components/Carousel.vue";
</script>

<template>
  <div class="container flex flex-col items-end pr-8 bottom-4 right-4  z-10 fixed">
    <a href="#" class="gradient p-2 rounded"><img class="rotate-180" src="../assets/Images/Icon/chevron-down.svg"></a>
  </div>

  <div v-if="video" class="mx-[100px] sm:mx-[20px]">
      <!--Header-->
      <div class="flex flex-row lg:flex-col lg:items-end justify-between mb-4 items-center">
        <h2 class="my-5 lg:w-full w-2/3">{{ replaceSpecialChars(video.Titre) }}</h2>
        <!-- Partage -->
        <input type="text" :value="'http://localhost:5173/videos/' + getCategoryName(video.Catégorie._id) + '/' + video.slug" id="linkVideo" style="position: absolute; left: -9999px;">
        <button @click="LinkCopied()" class="CTA2">
          <img class="w-6 h-6 relative" src="../assets/Images/Icon/Link.png" >
          Partager cette vidéo
        </button>
        <div id="LinkCopied" class="fixed bottom-20 lg:bottom-0 sm:bottom-2 left-1/2 lg:left-0 lg:w-full transform -translate-x-1/2 lg:-translate-x-0 lg:my-[20px] p-2 bg-green-600 text-white px-4 sm:py-0 py-2 rounded-lg opacity-0 transition-opacity duration-500 z-50">Le lien a été copié avec succès!</div>
      </div>
      <div v-html="video.Iframe"></div>

    <!--Description de la vidéo-->
    <div v-html="addstyle(video.Description)" class="mt-10"></div>

        <!--Fichier à télécharger-->

  </div>
<div v-if="video" class="mx-[100px] lg:mx-[20px]">
    <div v-if="video.Fichiers != null" class="pb-10">
      <h4 class="pb-4">Fichiers utiles</h4>
      <div v-for="Fichier in video.Fichiers" :key="Fichier._id" class="flex flex-row items-center gap-6">
        <a class="w-10 h-10" :href="'https://api.avecbertrand.tech/storage/uploads/' + Fichier.path" download><img src="../assets/Images/Icon/Download.png" alt=""></a>
        <p class="font-normal">{{ Fichier.title }}</p>
      </div>
    </div> 
</div>


  <!-- Newsletter -->
  <!--
  <div class=" px-[100px] sm:px-[20px] py-12 justify-center items-center gap-20 sm:gap-8 flex flex-row md:flex-col">
    <div class="grow shrink basis-0 flex-col justify-start items-start  gap-6 inline-flex">
      <h2 class="sm:text-2xl">Restez a jour avec les derniers nouveautes en vous abonnant A la newsletter</h2>
    </div>
    <form class="w-1/2 sm:w-full flex-col justify-start items-start gap-4 inline-flex">
      <div class="self-stretch justify-start items-start gap-4 inline-flex sm:flex-col">
          <input type="email" placeholder="Entrez votre adresse email" class="sm:w-full bg-transparent border-gray-300 text-white focus:outline-none focus:border-blue-300 grow shrink basis-0 h-12 p-3 rounded-[3px] border justify-start items-center gap-2 flex">
          <button type="submit" class="CTA sm:w-full">S’abonner à la newsletter</button>
      </div>
      <div class="self-stretch justify-center items-start gap-4 inline-flex">
          <input type="checkbox" id="terms" class="mr-2 custom-checkbox w-6 h-6 rounded-[3px]" />
          <p class="grow shrink basis-0">Cochez la case pour accepter les termes et les conditions d’utilisation de vos données et profiter de la newsletter.</p>
      </div>
    </form>
  </div>
  -->

  <!--Carousel videos-->
  <div v-if="video">
    <Carousel :title="'Videos recentes'" :items="filteredVideos" :link="'/videos'">
      <template v-slot="{ items }">
        <div v-for="(item, index) in items" :key="index">
            <Videos 
            :titre="item.Titre"
            :url="item.URL"
            :miniature="item.Miniature.path"
            :catégorie="getCategoryName(item.Catégorie._id)"
            :categorySlug="getCategorySlug(item.Catégorie._id)"
            :URLSlug="item.slug"
             />
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        video: null,
        selectedCategory: null,
        activemenu: false,
        openedCategoryDropdown: false,
        currentIndex: 0,
        searchQuery: "",
        videos: [
          {
            Titre: "Titre de la vidéo",
            Description: "Description de la vidéo",
            Miniature: {
              path: "https://i.ytimg.com/vi/ak2sUzv_BVk/hq720.jpg",
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
        videos: [
        {
        "Titre": "",
        "URL": "",
        "Miniature": {
            "path": "",
            "title": "",
            "mime": "",
            "type": "",
            "description": "",
            "tags": [],
            "size": 12696,
            "colors": [],
            "width": 246,
            "height": 138,
            "_hash": "8cde9f7da4e64afd418dd2c80e86369e",
            "_created": 1711452761,
            "_modified": 1711452761,
            "_cby": "",
            "altText": "",
            "thumbhash": "",
            "folder": "",
            "_id": ""
        },
        "Description": "",
        "Catégorie": {
            "_model": "",
            "_id": ""
        },
        "_state": 1,
        "_modified": 1713111888,
        "_mby": "2c97cdb4336534fdbe000056",
        "_created": 1711452782,
        "_cby": "2c97cdb4336534fdbe000056",
        "_id": "c959f44d333866322b000288",
        "slug": "impression-3D",
        "Iframe": "",
        "Fichiers": [
          {
            "path": "",
                "title": "",
                "mime": "",
                "type": "",
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
          }
        ]
        }
        ],
      };
  },
  computed: {
  filteredVideos() {
      const categoryId = this.video.Catégorie._id;
      const videoId = this.video._id;
      const videosInCategory = this.videos.filter(video => video.Catégorie._id === categoryId);
      if (videosInCategory.length >= 10) {
        return videosInCategory.slice(0, 9);
      } else {
        const category = this.categories.find(category => category._id === categoryId);
        if (category._pid !== null) {
          const parentCategory = this.categories.find(parent => parent._id === category._pid);
          const VideosParentCategory = this.videos.filter(video => video.Catégorie._id === parentCategory._id);
          const videosreste = VideosParentCategory.slice(0, 9- videosInCategory.length)
          const videosCatPar = videosInCategory.concat(videosreste);
          if (videosCatPar.length >= 10) {
            return videosCatPar.slice(0, 9);
          } else {
            const subCategories = this.categories.filter(category => category._pid === parentCategory._id && category._id !== categoryId);
            if (subCategories.length > 0) {
              const subCategoriesVideos = this.videos.filter(video => {
              return subCategories.some(subCat => subCat._id === video.Catégorie._id);});              
              const videosreste2 = subCategoriesVideos.slice(0, 10 - videosCatPar.length);
              const videosSubcat = videosCatPar.concat(videosreste2);
              if (videosSubcat.length >= 10) {
                return videosSubcat.slice(0, 9);
              } else {
                const videosreste3 = this.videos.slice(0, 9 - videosSubcat.length);
                const videos12 = videosSubcat.concat(videosreste3);
                return videos12;
              }
            }
          }
        }
        else {
          const videosreste = this.videos.slice(0, 10 - videosInCategory.length)
          const videos12 = videosInCategory.concat(videosreste);
          return videos12.filter(video => video._id !== videoId);
        }
      }
  },
},
  methods: {
    addstyle(DescriptionContent) {
      // Remplacer le contenu des balises <pre> contenant des balises <iframe> par des balises <iframe>
      const processedContent = DescriptionContent.replace(/<pre>(.*?)<\/pre>/g, (match, iframeContent) => {
        return iframeContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      });

      // Ajouter du style au contenu pour la mise en page
      const modifiedContent = processedContent.replace(/<\/(?!li)[^>]+>/g, '</$&<div style="margin-bottom: 2rem;"></div>');

      return modifiedContent;
    },
    getCategoryBlog(catId) {
      const category = this.categories.find(category => category._id === catId);
      if (!category) {
        return 'Catégorie inconnue';
      }
      let categoryName = category.nomCatBlog;
      if (category._pid !== null) {
        const parentCategory = this.categories.find(parent => parent._id === category._pid);
        if (parentCategory) {
          categoryName = `${parentCategory.nomCatBlog} > ${categoryName}`;
        }
      }
      return categoryName;
    },
    getCategoryName(catId) {
      const category = this.categories.find(category => category._id === catId);
      if (!category) {
        return 'Catégorie inconnue';
      }
      return category.Nom;
    },
    getCategorySlug(categoryId) {
      const category = this.categories.find(cat => cat._id === categoryId);
      return category ? category.Slug : '';
    },
    LinkCopied() {
      var copyText = document.getElementById("linkVideo");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");

      var LinkCopied = document.getElementById("LinkCopied");
      LinkCopied.style.opacity = 1;

      setTimeout(function() {
        LinkCopied.style.opacity = 0;
      }, 3000); // Disparaît après 3 secondes (3000 ms)
    },
    replaceSpecialChars(str) {
      return str
      .replace(/[éèê]/g, 'e')
      .replace(/[àâ]/g, 'a')
      .replace(/[ûüù]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[î]/g, 'i')
      .replace(/[ô]/g, 'o')
    },
  },
  mounted() {
    axios.get('https://api.avecbertrand.tech/api/content/items/videos')
      .then(response => {
        const slug = this.$route.params.slug;
        this.video = response.data.find(video => video.slug === slug);
      });
        axios.get('https://api.avecbertrand.tech/api/content/items/videos')
        .then(response => {
          this.videos = response.data.reverse();
        });

        axios
        .get("https://api.avecbertrand.tech/api/content/items/CategoriesYouTube")
        .then((response) => {
          this.categories = response.data;
        })
  }
};
</script>
<style>
.imgCouverture {
  width: 100%;
  height: 25rem;
  object-fit: cover;
}
@media screen and (max-width: 768px){
iframe {
  width: 35rem;
  height: 19rem;
}
}
@media screen and (min-width: 1440px){
iframe {
  width: 100%;
  height: 41rem;
}
}
@media screen and (max-width: 1024px){
iframe {
  width: 100%;
  height: 30rem;
}
}
</style>