<script setup>
import Videos from "../components/Videos.vue";
import Articles from "../components/ArticleCard.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import PreuveSociale from "../components/PreuveSociale.vue";
import { RouterLink, RouterView } from "vue-router";
import Carousel from "../components/Carousel.vue";
import LPortofolio from "../components/LPortfolio.vue";
</script>

<template>
  <!-- Bouton de retour en haut de la page -->
  <div class="container flex flex-col items-end pr-8 bottom-4 right-4  z-10 fixed">
    <a href="#" class="gradient p-2 rounded"><img class="rotate-180" src="../assets/Images/Icon/chevron-down.svg"></a>
  </div>

  <!-- Hero Section -->
  <section class="px-[64px] sm:px-[20px]">
    <div class="container flex flex-row lg:flex-col jutify-between">
      <div class="self-stretch gap-16 lg:gap-10 flex-col justify-center items-start flex w-3/4 lg:w-full">
        <!-- Animation Titre -->
        <div class="card w-full">
          <h1 class="text-7xl sm:text-5xl lg:mt-12">Bertrand Bourgy
            <div class="scroller text-5xl lg:text-4xl mt-2 lg:mt-6 lg:w-full h-auto ">
              <span>
                <span class="text-4xl">createur numerique</span><br/>
                tech addict<br/>
                enseignant<br/>
                <span class="text-4xl">createur numerique</span><br/>
              </span>
            </div>
          </h1>
        </div>
        <div class="flex gap-x-4 sm:items-center sm:flex-row sm:space-y-0 lg:justify-start flex-wrap gap-y-3 heroCTA">
          <div class="CTA sm:w-full">
            <a href="https://www.youtube.com/@TechAvecBertrand" target="_blank">S’abonner sur YouTube</a>
          </div>
          <RouterLink to="/portfolio" class="CTA2 sm:w-full">
            Mes créations
          </RouterLink>
        </div>
      </div>
      <div class="flex items-end justify-end w-5/6 lg:w-full lg:mt-4">
        <img
          src="../assets/Images/bertrand.png"
          alt="Bertrand Bourgy"
          class="overflow-hidden" />
      </div>
    </div>
  </section>
    <!-- Social Proof Section -->
    <section class="mt-20">
      <div class=" px-[64px] sm:px-[20px] flex flex-col gap-y-20 mb-16">
        <div class="flex flex-col gap-y-6 Avantage">
          <div class="text-center md:text-left ">
            <h1 class="pb-4 leading-10">Ensemble mettons la puissance de la tech entre vos mains</h1>
            <p>
              Rejoignez ma chaîne dédiée à la formation et embarquez dans un voyage enrichissant.
              Débutez avec confiance en développement web, 3D, infographie et plus globalement tout
              ce que l’on peut faire grâce à la technologie. Plongez dans cette aventure numérique
              grâce à la Tech avec Bertrand !
            </p>
          </div>
          <div class="flex gap-x-4 items-center justify-center sm:flex-row sm:space-y-0 flex-wrap gap-y-3 mt-6">
            <a href="https://www.youtube.com/@TechAvecBertrand" target="_blank" class="CTA sm:w-full">S'abonner sur Youtube</a>
            <RouterLink to="/youtube"
              class="CTA2 sm:w-full"
              >Mes dernières vidéos
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="w-screen">
          <PreuveSociale />
      </div>
    </section>

    <!--Carousel Videos-->
    <section class="mt-14">
    <Carousel :title="'Videos recentes'" :items="videos" :link="'/videos'">
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
    </section>

    <!--Avantages-->
    <section class="px-[100px] sm:px-[20px] py-[3.81rem]">
      <h2 class="text-center pb-10 sm:text-2xl">
        Boostez vos competences technologiques et ouvrez les portes de l'avenir numerique !
      </h2>
      <div class="flex flex-row lg:flex-col gap-[3rem] justify-center lg:items-center">
        <div class="flex flex-col items-center gap-2 w-1/3 lg:w-full Avantage">
          <img src="../assets/Images/Book_icon.png" alt="" />
          <h5 class="text-center">Adaptes au debutants</h5>
          <p class="text-center">
            Suis des tutoriels adaptés aux débutants avec des cas pratiques et concrets. Ici, on ne
            s'embête pas avec trop de théorie.
          </p>
        </div>
        <div class="flex flex-col items-center gap-2 w-1/3 lg:w-full Avantage">
          <img src="../assets/Images/Flame_Icon.png" alt="" />
          <h5 class="text-center">Source abondante d'inspiration</h5>
          <p class="text-center text-[#F8EFFA]">
            Découvre des nouveaux outils que tu n’aurais jamais pensé que cela existait. Elargis tes
            connaissances et éveille ta curiosité.
          </p>
        </div>
        <div class="flex flex-col items-center gap-2 w-1/3 lg:w-full  Avantage">
          <img src="../assets/Images/Community_icon.png" alt="" class="enseignant-img" />
          <h5 class="text-center">Communaute active</h5>
          <p class="text-center text-[#F8EFFA]">
            Interagissez avec d'autres passionnés de technologie, échangez vos idées, poser vos
            questions, ...
          </p>
        </div>
      </div>
    </section>

    <!--Section Portfolio-->
    <LPortofolio />

    <!-- Enseignant en Haute Ecole -->
    <section
      class=" px-[100px] sm:px-[20px] py-[3.75rem] flex flex-row lg:flex-col items-center gap-[3.5rem] text-[#F8EFFA]">
      <div>
        <h2>
          Enseignant en haute ecole
        </h2>
        <p class="mt-4">
          J'ai toujours aimé l'informatique. Aussi, apprendre et transmettre sur ce sujet est une véritable passion. C'est donc tout naturellement que je me suis dirigé vers l'enseignement. J'ai ensuite créé ma chaîne pour pouvoir aller encore plus loin à ce niveau ! 
        </p>
      </div>
      <img src="../assets/Images/Enseignant_desktop.png" alt="" class="enseignant rounded-2xl" />
    </section>
      <!--Carousel articles-->
      <section>
    <Carousel :title="'Articles recents'" :items="articles" :link="'/blog'">
      <template v-slot="{ items }">
        <div v-for="(item, index) in items" :key="index">
          <Articles
            :titre="item.Titre"
            :couverture="item.Couverture.path"
            :catégorie="getCategoryBlog(item.Categorie._id)"
            :slug="item.slug"
            :Categoryslug="getCategorySlug(item.Categorie._id)" />
        </div>
      </template>
    </Carousel>
    </section>
    <!--CTA section-->
    <section class="py-[64px] px-[100px] sm:px-[20px] text-center flex flex-col items-center gap-12 Avantage">
      <div>
        <h2>
          Ensemble, rendons la tech disponible a tous
        </h2>
        <p class="mt-4">
          Si un sujet te passionne et que tu aimerais que cela soit le sujet de ma prochaine video,
          ou alors t’as envie de réaliser une collaboration et que ton produit apparraisse dans
          l’une de mes vidéos, remplis le formulaire de contact. Et sourtout pas, n’oublie pas de
          t’abonner à ma chaîne YouTube
        </p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <div
          class="flex gap-x-4 sm:items-center sm:flex-row sm:space-y-0 lg:justify-start flex-wrap gap-y-3">
          <a href="https://www.youtube.com/@TechAvecBertrand" target="_blank" class="CTA sm:w-full">S’abonner sur YouTube</a>
          <RouterLink to="/portfolio" class="CTA2 sm:w-full">Mes créations</RouterLink>
        </div>
      </div>
    </section>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
let intersectionObserver;

onMounted(() => {
  window.addEventListener("resize", handleResize);
  observeAvantageElement();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  intersectionObserver.disconnect();
});
export default {
  data() {
    return {
      currentId: 0,
      currentIndex: 0,
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
      articles: [
      {
        "Article": "",
        "_state": 1,
        "_modified": 1712666391,
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
            "path": "/2024/04/09/photo-1550745165-9bc0b252726f_uid_661536f243dd1.avif",
            "title": "Photo 1550745165 9bc0b252726f",
            "mime": "image/avif",
            "type": "unknown",
            "description": "",
            "tags": [],
            "size": 208846,
            "colors": null,
            "width": null,
            "height": null,
            "_hash": "2f77fd203ff1a7681e72994cf053d478",
            "_created": 1712666354,
            "_modified": 1712666354,
            "_cby": "2c97cdb4336534fdbe000056",
            "folder": "9ca962c4396531f4b3000055",
            "_id": "9cb25818363565c1ba0003db"
        }
      },
      ],
      categoriesBlog: [
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
    };
  },
  computed: {
    currentVideos() {
      if (isWideScreen.value) {
        const startIndex = this.currentIndex;
        const endIndex = Math.min(startIndex + 3, this.videos.length);
        return this.videos.slice(startIndex, endIndex);
      } else {
        return [this.videos[this.currentIndex]];
      }
    },
    currentArticles() {
      if (isWideScreen.value) {
        const startIndex = this.currentIndex;
        const endIndex = Math.min(startIndex + 3, this.articles.length);
        return this.articles.slice(startIndex, endIndex);
      } else {
        return [this.articles[this.currentIndex]];
      }
    },
  },
  methods: {
    getCategoryName(categoryId) {
      const categoryIdStr = categoryId._id || categoryId; // Si categoryId est un objet, utilisez son _id, sinon utilisez categoryId directement
      const category = this.categories.find(cat => cat._id === categoryIdStr);
      return category ? category.Nom : 'Catégorie inconnue';
    },
    getCategoryBlog(catId) {
      const category = this.categoriesBlog.find(category => category._id === catId);

      if (!category) {
        return 'Catégorie inconnue';
      }
      return category.nomCatBlog;
    },
    getCategorySlug(categoryId) {
      const category = this.categories.find(cat => cat._id === categoryId);
      return category ? category.Slug : '';
    },
    BlogCategorySlug(categoryId) {
      const category = this.categoriesBlog.find(cat => cat._id === categoryId);
      return category ? category.slug : '';
    },
    observeAvantageElements() {
  const avantageElements = document.querySelectorAll(".Avantage");

  if (!avantageElements) return;

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-avantage");
        // Observer la fin de l'animation
        entry.target.addEventListener("animationend", () => {
          entry.target.style.opacity = 1; // Ajuster l'opacité à 100% une fois l'animation terminée
        }, { once: true }); // Une fois que l'animation est terminée, nous n'avons plus besoin d'écouter cet événement
        intersectionObserver.unobserve(entry.target);
      }
    });
  });

  avantageElements.forEach((element) => {
    intersectionObserver.observe(element);
  });
},

  },
  mounted() {
    this.currentIndex = 0;
    axios
    .get("https://api.avecbertrand.tech/api/content/items/videos")
    .then((response) => {
      // Inverse l'ordre des vidéos
      this.videos = response.data.reverse().slice(0,9);
    });
    axios
      .get("https://api.avecbertrand.tech/api/content/items/CategoriesYouTube")
      .then((response) => {
        this.categories = response.data;
      })
   axios.get("https://api.avecbertrand.tech/api/content/items/Article").then((response) => {
      this.articles = response.data; 
    });
    axios
      .get("https://api.avecbertrand.tech/api/content/items/CategoriesBlog")
      .then((response) => {
        this.categoriesBlog = response.data;
      })
      this.observeAvantageElements()
  },
};
</script>

<style>
@media screen and (max-width: 1104px) {
  .cartes {
    margin: auto;
  }
}

/* Titre Hero Section Animation */
* {
  box-sizing: border-box;
}
.note::after {
  content: '';
  height: 2px;
  position: absolute;
  top: -1.8em;
  left: 0;
}
.note {
  font-size: 0.8em;
  position: relative;
  margin-top: 4em;
}

.scroller {
  height: 1.2em;
  line-height: 1.2em;
  position: relative;
  overflow: hidden;
  width: auto;
}
.scroller > span {
  position: absolute;
  top: 0;
  animation: slide 7s  infinite ;
}
@keyframes slide {
  0% {
    top: -3,6em;
  }
  25% {
    top: -1.2em;
  }
  50% {
    top: -2.4em;
  }
  100% {
    top: -3.6em;
  }
}
/* Hero Section CTA animation*/
.heroCTA{
  animation: heroCTA 1s ease-in 0s 1 normal none;
}
@keyframes heroCTA {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
/* Avantages animation */

.Avantage{
  opacity: 0;
}
.animate-avantage {
  animation: Avantage 1s ease-out 1s 1 normal none;
}

@keyframes Avantage {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.Avantage:nth-child(1) {
  animation-delay: 0s; /* Démarre l'animation de 1 seconde après le début */
}

.Avantage:nth-child(2) {
  animation-delay: 0.5s; /* Démarre l'animation de 2 secondes après le début */
}

.Avantage:nth-child(3) {
  animation-delay: 1s; /* Démarre l'animation de 3 secondes après le début */
}

</style>