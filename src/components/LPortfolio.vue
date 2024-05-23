
<template>
  <!--Background Animation-->
<div class="relative">
  <div class="flex flex-row portfolio-container justify-end">
    <div class="portfolio-slider">
      <div class="portfolio-slide-track2 flex flex-col h-full">
        <div v-for="index in 3">
          <div v-for="(photo, photoIndex) in portfolio" :key="`project-${photoIndex}`">
            <div v-for="repeatIndex in 4">
              <div v-for="(image, imageIndex) in photo.Images.slice(0, 4)" :key="`image-${imageIndex}`" class="slide flex justify-center">
                <img :src="'https://api.avecbertrand.tech/storage/uploads/' + image.path" class="w-[300px] h-[300px] sm:w-[100px] sm:h-[100px] object-cover my-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="portfolio-slider">
      <div class="portfolio-slide-track flex flex-col h-full">
        <div v-for="index in 3">
          <div v-for="(photo, photoIndex) in portfolio" :key="`project-${photoIndex}`">
            <div v-if="photo.Images.length >= 8">
              <div v-for="repeatIndex in 4">
                <div v-for="(image, imageIndex) in photo.Images.slice(4, 8)" :key="`image-${imageIndex}`" class="slide flex justify-center">
                  <img :src="'https://api.avecbertrand.tech/storage/uploads/' + image.path" class="w-[300px] h-[300px] object-cover my-4"/>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-for="repeatIndex in 4">
                <div v-for="(image, imageIndex) in photo.Images.slice(4)" :key="`image-${imageIndex}`" class="slide flex justify-center">
                  <img :src="'https://api.avecbertrand.tech/storage/uploads/' + image.path" class="w-[300px] h-[300px] object-cover my-4"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="portfolio-slider">
      <div class="portfolio-slide-track2 flex flex-col h-full">
        <div v-for="index in 3">
          <div v-for="(photo, photoIndex) in portfolio" :key="`project-${photoIndex}`">
            <div v-if="photo.Images.length >= 12">
              <div v-for="repeatIndex in 4">
                <div v-for="(image, imageIndex) in photo.Images.slice(8, 12)" :key="`image-${imageIndex}`" class="slide flex justify-center">
                  <img :src="'https://api.avecbertrand.tech/storage/uploads/' + image.path" class="w-[300px] h-[300px] object-cover my-4"/>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-for="repeatIndex in 4">
                <div v-for="(image, imageIndex) in photo.Images.slice(4)" :key="`image-${imageIndex}`" class="slide flex justify-center">
                  <img :src="'https://api.avecbertrand.tech/storage/uploads/' + image.path" class="w-[300px] h-[300px] object-cover my-4"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="gradient-overlay flex flex-col justify-center pl-[64px] lg:pl-[20px] lg:pr-[20px]">
    <h2 class="text-white text-5xl mb-4 leading-relaxed sm:text-2xl">L'art digital, <br/> l'Ame de la technologie</h2>
    <RouterLink to="/portfolio" class="CTA w-[130px] sm:w-full">
      Mes créations
    </RouterLink>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
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
  },
  methods: {
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
/* Carroussel Animation */
@-webkit-keyframes scrollhaut {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-300px * 7));
  }
}

@keyframes scrollhaut {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-300px * 7));
  }
}

@-webkit-keyframes scrollbas {
  100% {
    transform: translateY(0);
  }
  0% {
    transform: translateY(calc(-300px * 7));
  }
}

@keyframes scrollbas {
  100% {
    transform: translateY(0);
  }
  0% {
    transform: translateY(calc(-300px * 7)); /* Défilement initial */
  }
}

.portfolio-container {
  height: 720px;
  overflow: hidden;
  gap: 20px;
}
.portfolio-slider, .portfolio-slider2 {
  rotate: -12deg;
}
.portfolio-slider::before, .portfolio-slider::after {
  content: "";
  height: 100px;
}
.portfolio-slider::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.portfolio-slider::before {
  left: 0;
  top: 0;
}

.portfolio-slider .portfolio-slide-track {
  -webkit-animation: scrollhaut 30s linear infinite;
          animation: scrollhaut 30s linear infinite;
  display: flex;
}

.portfolio-slider .slide img{
  height: 300px;
  width:300px;
  object-fit: cover;
}

.portfolio-slider .portfolio-slide-track2 {
  -webkit-animation: scrollbas 30s linear infinite;
          animation: scrollbas 30s linear infinite;
  display: flex;
}

/* Ajoutez ces styles à votre feuille de style */

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));
}

@media screen and (max-width: 700px) {
  .portfolio-slider .slide img{
    height: 150px;
    width: 150px;
    object-fit: cover;
  }
  .portfolio-container {
  height: 500px;
  overflow: hidden;
  gap: 20px;
}
}
</style>
