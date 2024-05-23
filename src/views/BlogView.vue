<script setup>
  import Articles from "../components/ArticleCard.vue";
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import axios from "axios";
  import { RouterLink } from "vue-router";

</script>
  <template>
    <div class="container flex flex-col items-end pr-8 bottom-4 right-4  z-10 fixed">
      <a href="#" class="gradient p-2 rounded"><img class="rotate-180" src="../assets/Images/Icon/chevron-down.svg"></a>
    </div>
    <!--Recherche-->
    <section class="container mx-auto flex flex-col justify-center items-center text-white px-[5.5%] lg:px-12 sm-px-5 gap-12">
      <div class="flex flex-col items-center w-768 gap-4">
        <div class="flex flex-col items-center gap-6 self-stretch">
          <h2>Restez A jour sur le monde numerique</h2>
          <p>Découvrez des articles couvrant une variété de sujets liés à la technologie. Explorez mes conseils pratiques et mes réflexions inspirantes pour rester informé et inspiré dans l'univers en constante évolution de la technologie.</p>
        </div>
        <div class="flex items-center bg-custom rounded-md w-1/2 lg:w-full">
          <input type="text" v-model="searchQuery" @input="searchArticles" placeholder="Rechercher" class="rounded-md py-2  px-4 text-black w-full bg-custom" />
          <img src="../assets/Images/Icon/Barre-recherche.svg" alt="Search Icon" class=" ml-auto w-4 h-4 mx-2" />
        </div>  
      </div>
    </section>
    
    <!-- Catégories deskop -->
    <section class="desktopmenu flex justify-center items-center" @mouseleave="dropdownCategory = false">
      <div class="flex m-6 relative">
        <div class="flex">
          <div class="flex">
            <div class="flex sm:flex-col">
              <button class="text-white text-left mx-6 py-2 px-3 sm:mx-0" @click="deselectCategory()" :class="{ 'gradient rounded': !selectedCategory && filteredArticles.length === articles.length }"><RouterLink :to="{ path: '/blog' }">Tous</RouterLink></button>
                <div v-for="category in filteredCategories" :key="category._id" class="flex flex-col relative py-2 px-3" :class="{ 'gradient rounded': selectedCategory === category._id, 'gradient rounded': isCategorySelected(category.slug) }">
                <div class="flex items-center">
                  <button class="text-white" @click="selectCategory(category._id)" @mouseenter="toggleDropdown(category._id)"><RouterLink :to="{ name: 'blog', params: { CategorySlug: category.slug } }">{{ getCategoryName(category._id) }}</RouterLink></button>
                  <button v-if="getSubcategories(category._id) != 0" class="ml-2">
                    <img src="../assets/Images/Icon/chevron-down.svg" alt="Arrow Icon" class="w-6 h-6" />
                  </button>
                </div>
                <div v-if="dropdownCategory === category._id" class="absolute top-full left-0 bg rounded w-[100px]" >
                  <div class="p-4 flex flex-col justify-start">
                    <button v-for="subcategory in getSubcategories(category._id)" :key="subcategory._id" @click="selectCategory(subcategory._id)" class="text-white my-2 align-left"><RouterLink :to="{ name: 'blog', params: { CategorySlug: subcategory.slug }}">{{ subcategory.nomCatBlog }}</RouterLink></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Categories mobiles-->
    <section class="menumobile py-5 px-10">
      <div class="flex justify-end">
        <button @click="toggleMenu" class="CTA2 flex justify-end text-white"><img src="../assets/Images/Icon/Filter.png" class="w-5">Catégories</button>
      </div>
      <div v-if="activemenu" class="absolute w-full left-0 text-white bg rounded-xl shadow-md px-5 py-5">
        <button class="text-white text-left mx-6 py-2 px-3 sm:mx-0 lg:mx-0 md:mx-0" @click="deselectCategory(), activemenu = false"><RouterLink :to="{ path: '/blog' }">Tous</RouterLink></button>
        <div v-for="category in filteredCategories" :key="category._id" class="flex flex-col relative py-2 px-3">
          <div class="flex items-center justify-between">
            <button class="text-white" @click="selectCategory(category._id), activemenu = false"><RouterLink :to="{ name: 'blog', params: { CategorySlug: category.slug } }">{{ getCategoryName(category._id) }}</RouterLink></button>
            <button v-if="getSubcategories(category._id) !=0" @click="toggleDropdown(category._id)" class="ml-2" :class="{ 'rotate-180': dropdownCategory === category._id }">
              <img src="../assets/Images/Icon/chevron-down.svg" alt="Arrow Icon" class="w-6 h-6"/>
            </button>
          </div>
          <div v-if="dropdownCategory === category._id" class="">
            <div class="p-4">
              <button v-for="subcategory in getSubcategories(category._id)" :key="subcategory._id" @click="selectCategory(subcategory._id), activemenu = false" class="text-white my-2 align-left flex flex-col" ><RouterLink :to="{ name: 'blog', params: { CategorySlug: subcategory.slug }}">{{ subcategory.nomCatBlog }}</RouterLink></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  <!-- Videos -->
  <div class="container flex flex-wrap lg:px-[20px] xl:px-[64px]">
    <div class="container my-5" v-if="filteredArticles.length === 0">
      <h5 class="my-5">Aucun resultat trouve.</h5>
      <p class="">Essayez de rechercher un autre mot-clé ou vérifier l'ortographe de la requête introduite.</p>
      <div class="flex flex-wrap my-4">
      </div>
    </div> 
    <div v-for="(article, index) in filteredArticles" :key="index" class="mx-auto my-4 flex justify-start">
      <Articles
        :titre="article.Titre"
        :couverture="article.Couverture.path"
        :catégorie="getCategoryName(article.Categorie._id)"
        :Categoryslug="getCategorySlug(article.Categorie._id)"
        :slug="article.slug" />
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
        activemenu: false,
        openedCategoryDropdown: false,
        currentIndex: 0,
        searchQuery: "",
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
      filteredCategories() {
        return this.categories.filter(category => category._pid === null);
      },
      filteredArticles() {
        let filteredArticles = this.articles;

      // Filtrer par catégorie si un slug de catégorie est présent dans les paramètres d'URL
      const categorySlug = this.$route.params.CategorySlug;
      if (categorySlug) {
        const categoryId = this.categories.find(cat => cat.slug === categorySlug)?._id;
        if (categoryId) {
          const subCategories = this.categories.filter(cat => cat._pid === categoryId && cat._id !== categoryId);
          filteredArticles = filteredArticles.filter(article => {
            return article.Categorie._id === categoryId || subCategories.some(subCat => subCat._id === article.Categorie._id);
          });
        }
      }

      // Rechercher les vidéos si une requête de recherche est spécifiée
      if (this.searchQuery.trim() !== "" && this.searchQuery.trim().length > 0){
        const query = this.searchQuery.trim().toLowerCase();
        filteredArticles = filteredArticles.filter(article => article.Titre.toLowerCase().includes(query));
      }

      return filteredArticles;
      },
    },
    methods: {
      getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat._id === categoryId);
        return category ? category.nomCatBlog : 'Catégorie inconnue';
      },
      toggleMenu() {
      this.activemenu = !this.activemenu;
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
          return category ? category.nomCatBlog : 'Catégorie inconnue';
        },
      getCategorySlug(categoryid) {
        const category = this.categories.find(cat => cat._id === categoryid);
        return category ? category.slug : '';
      },
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
      },
      deselectCategory(){
        this.selectedCategory = null;
      },
      isCategorySelected(categorySlug) {
        return this.$route.params.CategorySlug === categorySlug;
      },
    },
    mounted() {
      axios.get('https://api.avecbertrand.tech/api/content/items/Article')
        .then(response => {
          this.articles = response.data.reverse(); 
        })
        axios
        .get("https://api.avecbertrand.tech/api/content/items/CategoriesBlog")
        .then((response) => {
          this.categories = response.data;
        })
    },
  };
</script>

<style>
.bg-custom{
  opacity: 0.85;
  background: var(--violet-violet-50, #F8EFFA);
}
</style>