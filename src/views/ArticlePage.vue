<script setup>
import Articles from "../components/ArticleCard.vue";
import axios from "axios";
import Carousel from "../components/Carousel.vue";


</script>

<template>
  <div class="container flex flex-col items-end pr-8 bottom-4 right-4  z-10 fixed">
    <a href="#" class="gradient p-2 rounded"><img class="rotate-180" src="../assets/Images/Icon/chevron-down.svg"></a>
  </div>
  <!--Header de l'article-->
  <div v-if="article" class="mx-[64px] sm:mx-[20px] flex gap-20 justify-between md:flex-col md:flex sm:flex-col">
    <div class="flex flex-col">
      <div class="mb-auto"> 
        <div class="flex flex-row gap-3 py-5">
          <div v-if="getParentCategory(article.Categorie._id) !== 'Parent inconnu'" class="flex flex-row items-center gap-3">
            <RouterLink :to="{name: 'blog', params: {CategorySlug: getParentSlug(article.Categorie._id)}}">{{ getParentCategory(article.Categorie._id) }}</RouterLink>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">
              <!-- Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.!-->
              <path
                fill="#ffffff"
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </div>
          <RouterLink :to="{name: 'blog', params: {CategorySlug: getCategorySlug(article.Categorie._id)}}">{{ getCategory(article.Categorie._id) }}</RouterLink>
        </div>
        <h2>{{ replaceSpecialChars(article.Titre) }}<br /></h2>
      </div>
      <!-- Partage -->
      <div class="mt-auto ">
        <input type="text" :value="'http://localhost:5173/blog/' +getCategorySlug(article.Categorie._id) + '/' + article.slug" id="linkInput" style="position: absolute; left: -9999px;">
        <button @click="copyLink()" class="CTA2">
          <img class="w-6 h-6 relative" src="../assets/Images/Icon/Link.png" >
          Partager ce post
        </button>
        <div id="successMessage" class="fixed bottom-20 lg:bottom-0 sm:bottom-2 left-1/2 lg:left-0 lg:w-full transform -translate-x-1/2 lg:-translate-x-0 lg:my-[20px] p-2 bg-green-600 text-white px-4 sm:py-0 py-2 rounded-lg opacity-0 transition-opacity duration-500 z-50">Le lien a été copié avec succès!</div>
      </div>

      
    </div>
    <img class="w-full h-[25rem] rounded-xl object-cover" :src="'https://api.avecbertrand.tech/storage/uploads/' + article.Couverture.path" />
  </div>
  
  <!--Corps de l'article-->
  <div class="mx-[100px] sm:mx-[20px] article mt-20">
    <div v-if="article">
      <div v-html="addstyle(article.Article)"></div>
    </div>
  </div>

<!-- Newsletter -->
<!--
<div class="px-16 sm:px-[20px] pt-28 justify-center items-center gap-20 sm:gap-8 flex flex-row md:flex-col mb-10">
    <div class="grow shrink basis-0 flex-col justify-start items-start  gap-6 inline-flex">
        <h2>Restez a jour avec les derniers nouveautes en vous abonnant A la newsletter</h2>
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

  <!--Carousel articles-->
  <div v-if="article">
    <Carousel :title="'Derniers articles'" :items="filteredArticles" :link="'/blog'">
      <template v-slot="{ items }">
        <div v-for="(item, index) in items" :key="index">
          <Articles
            :titre="item.Titre"
            :couverture="item.Couverture.path"
            :catégorie="getCategory(item.Categorie._id)"
            :Categoryslug="getCategorySlug(item.Categorie._id)" 
            :slug="item.slug"/>
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
      article: null,
      categories: [
          {
            "nomCatBlog": "Bureatique",
            "_pid": null,
            "_o": 1,
            "_state": 1,
            "_modified": 1712655304,
            "_mby": "2c97cdb4336534fdbe000056",
            "_created": 1712652930,
            "_cby": "2c97cdb4336534fdbe000056",
            "_id": "94b212a8613734bea80001d0",
            "slug": "bureautique"
          },
        ],
      articles: [
      {
        "Article": "",
        "_state": 1,
        "_modified": 1712684728,
        "_mby": "2c97cdb4336534fdbe000056",
        "_created": 1712573930,
        "_cby": "2c97cdb4336534fdbe000056",
        "_id": "659b94a8613066de06000105",
        "slug": "site-web-gratuit",
        "Categorie": {
            "_model": "CategoriesBlog",
            "_id": "94d792706136304fff0003a6"
        },
        "Titre": "Comment creer un site web gratuit?",
        "Couverture": {
            "path": "/2024/04/09/photo-1488590528505-98d2b5aba04b_uid_661536f23a761.avif",
            "title": "Photo 1488590528505 98d2b5aba04b",
            "mime": "image/avif",
            "type": "unknown",
            "description": "",
            "tags": [],
            "size": 160546,
            "colors": null,
            "width": null,
            "height": null,
            "_hash": "53147424f31e747fb89f5fe1cde2e954",
            "_created": 1712666354,
            "_modified": 1712666354,
            "_cby": "2c97cdb4336534fdbe000056",
            "folder": "9ca962c4396531f4b3000055",
            "_id": "9cb256a9376333715b000199"
        }
    },
      ],
    };
  },
  computed: {
filteredArticles() {
      const categoryId = this.article.Categorie._id;
      const articleID = this.article._id;
      const articlesInCategory = this.articles.filter(article => article.Categorie._id === categoryId);
      if (articlesInCategory.length >= 9) {
        return articlesInCategory.slice(0, 9);
      } else {
        const category = this.categories.find(category => category._id === categoryId);
        if (category._pid !== null) {
          const parentCategory = this.categories.find(parent => parent._id === category._pid);
          const articlesParentCategory = this.articles.filter(article => article.Categorie._id === parentCategory._id);
          const articlesreste = articlesParentCategory.slice(0, 9- articlesInCategory.length)
          const articlesCatPar = articlesInCategory.concat(articlesreste);
          if (articlesCatPar.length >= 9) {
            return articlesCatPar.filter(article => article._id !== articleID).slice(0, 9);
          } else {
            const subCategories = this.categories.filter(category => category._pid === parentCategory._id && category._id !== categoryId);
            if (subCategories) {
              const subCategoriesarticles = this.articles.filter(article => {
              return subCategories.some(subCat => subCat._id === article.Categorie._id);});              
              const articlesreste2 = subCategoriesarticles.slice(0, 9 - articlesCatPar.length);
              const articlesSubcat = articlesCatPar.concat(articlesreste2);
              if (articlesSubcat.length >= 9) {
                return articlesSubcat.filter(article => article._id !== articleID && article.Categorie._id !== parentCategory._id).slice(0, 9);
              } else {
                const articlesreste3 = this.articles.filter(article => article.Categorie._id !== categoryId && article.Categorie._id !== parentCategory._id).slice(0, 9 - articlesSubcat.length);
                return articlesSubcat.concat(articlesreste3).filter(article => article._id !== articleID);
              }
            }
            }
          }
          else {
          const articlesreste = this.articles.filter(article => article.Categorie._id !== categoryId).slice(0, 11 - articlesInCategory.length)
          const articlesfinals = articlesInCategory.concat(articlesreste);
          return articlesfinals.filter(article => article._id !== articleID);
        }
    }
  },
  },
  methods: {
    addstyle(articleContent) {
      // Remplacer le contenu des balises <pre> contenant des balises <iframe> par des balises <iframe>
      const processedContent = articleContent.replace(/<pre>(.*?)<\/pre>/g, (match, iframeContent) => {
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
    getCategory(catId) {
      const category = this.categories.find(category => category._id === catId);
      if (!category) {
        return 'Catégorie inconnue';
      }
      return category.nomCatBlog;
    },
    getParentCategory(catId) {
      const category = this.categories.find(category => category._id === catId);
      if (!category) {
        return 'Catégorie inconnue';
      }
      if (category._pid !== null) {
        const parentCategory = this.categories.find(parent => parent._id === category._pid);
        if (parentCategory) {
          return parentCategory.nomCatBlog;
        }
      }
      return 'Parent inconnu';
    },

    getCategorySlug(categoryid) {
        const category = this.categories.find(category => category._id === categoryid);
        return category ? category.slug : '';
      },
      getParentSlug(catId) {
      const category = this.categories.find(category => category._id === catId);
      if (!category) {
        return 'Catégorie inconnue';
      }
      if (category._pid !== null) {
        const parentCategory = this.categories.find(parent => parent._id === category._pid);
        if (parentCategory) {
          return parentCategory.slug;
        }
      }
      return 'Parent inconnu';
    },
    copyLink() {
  var copyText = document.getElementById("linkInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");

  var successMessage = document.getElementById("successMessage");
  successMessage.style.opacity = 1;

  setTimeout(function() {
    successMessage.style.opacity = 0;
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
    axios.get('https://api.avecbertrand.tech/api/content/items/Article')
      .then(response => {
        const slug = this.$route.params.slug;
        this.article = response.data.find(article => article.slug === slug);
      });
        axios.get('https://api.avecbertrand.tech/api/content/items/Article')
        .then(response => {
          this.articles = response.data;
        })
        axios
        .get("https://api.avecbertrand.tech/api/content/items/CategoriesBlog")
        .then((response) => {
          this.categories = response.data;
        })
  }
};
</script>
<style>
@media screen and (max-width: 768px){
iframe {
  width: 560px;
  height: 315px;
}
}
@media screen and (min-width: 1024px){
iframe {
  width: 800px;
  height: 455px;
}
}
.success-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: green;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1000;
}

</style>