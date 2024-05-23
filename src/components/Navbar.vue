<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
    <div class="desktopmenu block md:hidden px-[64px]" @mouseleave="dropdownNavbarBlog = false, dropdownNavbarPortfolio = false, dropdownNavbarYouTube = false">
        <div class="w-full h-[100px] px-4 py-6 flex justify-between items-center bg-[../assets/Images/BGIMG.png] bg-cover bg-center">
            <RouterLink to="/"><img class="w-[164px] h-[52px]" src="../assets/Images/bertrand 1.png" /></RouterLink>
            <div class="flex gap-8">
                <RouterLink to="/" class="font-semibold">Accueil</RouterLink>
                <div class="flex gap-4 items-center">
                                        <!-- Bouton "YouTube" -->
                                        <RouterLink to="/videos" class="font-semibold" @mouseenter="toggleDropdown('youtubeDropdown')">YouTube</RouterLink>
                    <div class="w-6 h-6 relative">
                        <button @mouseenter="toggleDropdown('youtubeDropdown')" :class="{ 'rotate-180': dropdownNavbarYouTube }" >
                            <img src="../assets/Images/Icon/chevron-down.svg" alt="">
                        </button>
                        <!-- Sous-menu YouTube -->
                        <div v-show="dropdownNavbarYouTube" class="bg self-stretch pl-9 pr-1 rounded-lg justify-start items-start gap-[78px] inline-flex absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2">
                            <div class="gap-2 flex-col items-start inline-flex p-2 self-stretch">
                                <h5>Categories</h5>
                                <div
                                    v-for="category in filteredCategories"
                                    :key="category._id"
                                    class="menucat px-4 py-2 w-full"
                                >
                                    <RouterLink :to="{name: 'videos', params: {CategorySlug: category.Slug}}" class="grow shrink basis-0">{{ getCategoryName(category._id) }}</RouterLink>
                                </div>
                            </div>
                            <div class="w-[305px] h-[388px] p-4 flex-col justify-start items-start gap-4 inline-flex">
                            <h5>Dernieres videos</h5>
                            <a v-for="video in videos" :key="video._id" :href="'/videos/' + getCategorySlug(video.Catégorie._id) + '/' + video.slug" class="self-stretch flex-grow flex-shrink flex basis-0 px-6 justify-center items-center gap-2.5 inline-flex bg-cover" :style="{ backgroundImage: 'url('+'https://api.avecbertrand.tech/storage/uploads/' + video.Miniature.path + ')' }">
                            </a>
                        </div>

                        </div>
                        <!--fin sous menu youtube-->
                    </div>
                    <!-- Bouton "Blog" -->
                    <RouterLink to="/blog" class="font-semibold" @mouseenter="toggleDropdown('blogDropdown')">Blog</RouterLink>
                    <div class="w-6 h-6 relative">
                        <button @mouseenter="toggleDropdown('blogDropdown')" :class="{ 'rotate-180': dropdownNavbarBlog }" >
                            <img src="../assets/Images/Icon/chevron-down.svg" alt="">
                        </button>
                        <!--sous menu blog-->
                        <div v-show="dropdownNavbarBlog" class="bg self-stretch pl-9 pr-1 rounded-lg justify-start items-start gap-[78px] inline-flex absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2">
                            <div class="gap-4 flex-col items-start inline-flex p-4 pt-2 self-stretch">
                                <h5>Categories</h5>
                                <div
                                    v-for="category in BlogCategories"
                                    :key="category._id"
                                    class="menucat px-4 py-2 w-full"
                                >
                                    <RouterLink :to="{name: 'blog', params: {CategorySlug: category.slug}}" class="grow shrink basis-0">{{ BlogCategoryName(category._id) }}</RouterLink>
                                </div>
                            </div>
                            <div class="w-[305px] h-[388px] p-4 pt-2 flex-col justify-start items-start gap-4 inline-flex">
                            <h5>Derniers articles</h5>
                            <a v-for="article in articles" :key="article._id" :href="'/blog/' + BlogCategorySlug(article.Categorie._id) + '/' + article.slug" class="self-stretch flex-grow flex-shrink flex basis-0 px-6 justify-center items-center gap-2.5 inline-flex bg-cover" :style="{ backgroundImage: 'url('+'https://api.avecbertrand.tech/storage/uploads/' + article.Couverture.path + ')' }">
                            </a>
                            </div>
                        </div>
                        <!--fin sous menu blog-->
                    </div>

                    <!-- Bouton "Portfolio" -->
                    <RouterLink to="/portfolio" class="font-semibold" @mouseenter="toggleDropdown('portfolioDropdown')">Portfolio</RouterLink>
                    <div class="w-6 h-6 relative">
                        <button @mouseenter="toggleDropdown('portfolioDropdown')" :class="{ 'rotate-180': dropdownNavbarPortfolio }" >
                            <img src="../assets/Images/Icon/chevron-down.svg" alt="">
                        </button>
                        <!-- Sous-menu Portfolio -->
                        <div v-show="dropdownNavbarPortfolio" class="bg self-stretch px-6 rounded-lg justify-start items-start gap-[78px] inline-flex absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2">
                            <div class="gap-4 flex-col items-start inline-flex p-4 pt-2 self-stretch">
                                <h5>Categories</h5>
                                <div
                                    v-for="project in portfolio"
                                    :key="project._id"
                                    class="menucat px-4 py-2 w-full"
                                >
                                    <RouterLink :to="{name: 'portfolio', params: {slug: project.slug}}" class="grow shrink basis-0">{{ project.Titre }}</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bouton "Contact" -->
                    <RouterLink to="/Contact" class="font-semibold">Contact</RouterLink>
                </div>
            </div>
            <div class="w-[201px] h-[50px] shadow flex justify-center items-center">
                <div class="CTA">
                    <a href="https://www.youtube.com/@TechAvecBertrand" target="_blank">S’abonner sur YouTube</a>
                </div>
            </div>
        </div>
    </div>

 <!-- Menu mobile (affiché uniquement sur les écrans de petite taille) -->
<!-- Contenu du menu mobile -->
<div class="hidden lg:flex w-full ">
    <div class="w-full h-16 px-5 shadow backdrop-blur-xl bg flex justify-start items-center">
        <div class="flex-grow block flex-shrink-0 flex-basis-0 h-full py-3 justify-between items-center flex">
            <RouterLink to="/">
                <img class="w-[164px] h-[52px]" src="../assets/Images/bertrand 1.png" />
            </RouterLink>
            <button @click="toggleDropdown('menuDropdown')" class="w-8 h-8 sm:w-11 sm:h-11 px-1.5 py-2 sm:py-10.5 justify-center items-center flex">
                <img class="w-6 h-6 sm:w-8 sm:h-8" src="../assets/Images/Icon/menu.png" />
            </button>
        </div>
        <!--menu ouvert-->
        <div v-show="activemenu" class="w-full absolute top-full bg left-0 px-[20px] shadow py-10 overflow-y-auto" style="display: flex; flex-direction: column; max-height: calc(100vh - 4rem);">
            <div class="flex-col items-start">
                <RouterLink to="/" class="font-semibold w-full" @click="activemenu = false">Accueil</RouterLink>
                <div class="w-full justify-between inline-flex mt-2">
                    <RouterLink to="/videos" class="font-semibold" @click="activemenu = false">Youtube</RouterLink>
                    <div class="w-9 h-9 relative">
                        <button @click="toggleDropdown('youtubeDropdown')" :class="{ 'rotate-180': dropdownNavbarYouTube }" >
                            <img src="../assets/Images/Icon/chevron-down.svg" alt="">
                        </button>
                    </div>
                </div>
                <div v-show="dropdownNavbarYouTube">
                    <div
                        v-for="category in filteredCategories"
                        :key="category._id"
                        class="menucat pl-6 pb-4 w-full"
                        @click="activemenu = false"
                    >
                        <RouterLink :to="{name: 'videos', params: {CategorySlug: category.Slug}}" class="grow shrink basis-0">{{ getCategoryName(category._id) }}</RouterLink>
                    </div>
                </div>
                <div class="w-full gap-4 justify-between inline-flex">
                    <RouterLink to="/blog" class="font-semibold" @click="activemenu = false">Blog</RouterLink>
                    <div class="w-9 h-9 relative">
                        <button @click="toggleDropdown('blogDropdown')" :class="{ 'rotate-180': dropdownNavbarBlog }" >
                            <img src="../assets/Images/Icon/chevron-down.svg" alt="">
                        </button>
                    </div>
                </div>
                <div v-show="dropdownNavbarBlog">
                    <div
                        v-for="category in BlogCategories"
                        :key="category._id"
                        class="menucat pl-6 pb-4 w-full"
                        @click="activemenu = false"
                    >
                        <RouterLink :to="{name: 'blog', params: {CategorySlug: category.slug}}" class="grow shrink basis-0">{{ BlogCategoryName(category._id) }}</RouterLink>
                    </div>
                </div>
                <div class="w-full gap-4 justify-between inline-flex">
                    <RouterLink to="/portfolio" class="font-semibold" @click="activemenu = false">Portfolio</RouterLink>
                    <div class="w-9 h-9 relative">
                        <button @click="toggleDropdown('portfolioDropdown')" :class="{ 'rotate-180': dropdownNavbarPortfolio }" >
                            <img src="../assets/Images/Icon/chevron-down.svg" alt="">
                        </button>
                    </div>
                </div>
                <div v-show="dropdownNavbarPortfolio">
                    <div
                        v-for="project in portfolio"
                        :key="project._id"
                        class="menucat pl-6 pb-4 w-full"
                        @click="activemenu = false"
                    >
                        <RouterLink :to="{name: 'portfolio', params: {slug: project.slug}}" class="grow shrink basis-0">{{ project.Titre }}</RouterLink>
                    </div>
                </div>
                <RouterLink to="/contact" class="w-full font-semibold" @click="activemenu = false">Contact</RouterLink>
            </div>
            <div class="w-[201px] h-[50px] shadow flex justify-center items-center mt-4">
                <div class="CTA">
                    <p>S’abonner sur YouTube</p>
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
            activeCategory: null,
            dropdownNavbarBlog: false,
            dropdownNavbarYouTube: false,
            dropdownNavbarPortfolio: false,
            activemenu: false,
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
            ACategories: [
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
            artciles : [],
            portfolio: [],
        }
    },
    computed: {
      filteredCategories() {
        return this.categories.filter(category => category._pid === null);
      },
      BlogCategories() {
        return this.ACategories.filter(cat => cat._pid === null);
      },
    },
    methods: {
        toggleDropdown(target) {
            if (target === 'blogDropdown') {
                this.dropdownNavbarBlog = !this.dropdownNavbarBlog;
                this.dropdownNavbarYouTube = false;
                this.dropdownNavbarPortfolio = false;
            } else if (target === 'youtubeDropdown') {
                this.dropdownNavbarYouTube = !this.dropdownNavbarYouTube;
                this.dropdownNavbarBlog = false;
                this.dropdownNavbarPortfolio = false;
            } else if (target === 'portfolioDropdown') {
                this.dropdownNavbarPortfolio = !this.dropdownNavbarPortfolio;
                this.dropdownNavbarBlog = false;
                this.dropdownNavbarYouTube = false;
            } else if (target === 'menuDropdown') {
                this.activemenu = !this.activemenu;
            }
        },
        getCategoryName(categoryId) {
            const categoryIdStr = categoryId._id || categoryId;
            const category = this.categories.find(category => category._id === categoryIdStr);
            return category ? category.Nom : 'Catégorie inconnue';
        },
        BlogCategoryName(categoryId) {
            const categoryIdStr = categoryId._id || categoryId;
            const category = this.ACategories.find(cat => cat._id === categoryIdStr);
            return category ? category.nomCatBlog : 'Catégorie inconnue';
        },
        getCategorySlug(categoryId) {
            const category = this.categories.find(category => category._id === categoryId);
            return category ? category.Slug : '';
        },
        BlogCategorySlug(categoryId) {
            const category = this.ACategories.find(cat => cat._id === categoryId);
            return category ? category.slug : '';
        },
        replaceSpecialChars(str) {
            return str
                .replace(/[éèê]/g, 'e')
                .replace(/[àâ]/g, 'a')
                .replace(/[ûüù]/g, 'u')
                .replace(/[ç]/g, 'c')
                .replace(/[î]/g, 'i')
                .replace(/[ô]/g, 'o')
        }
    }, 
    mounted() {
      axios
      .get("https://api.avecbertrand.tech/api/content/items/videos")
      .then((response) => {
        this.videos = response.data.reverse().slice(0, 2);
      });
      axios
        .get("https://api.avecbertrand.tech/api/content/items/CategoriesYouTube")
        .then((response) => {
          this.categories = response.data;
        })
        axios.get('https://api.avecbertrand.tech/api/content/items/Article')
        .then(response => {
          this.articles = response.data.reverse().slice(0, 2); 
        })
        axios
        .get("https://api.avecbertrand.tech/api/content/items/CategoriesBlog")
        .then((response) => {
          this.ACategories = response.data;
        })
        axios
        .get("https://api.avecbertrand.tech/api/content/items/Portfolio")
        .then((response) => {
            this.portfolio = response.data.reverse();
      })
    },
};
</script>

