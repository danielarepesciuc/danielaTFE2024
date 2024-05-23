<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="flex flex-row w-full px-[5.5%] my-[5rem] sm:mb-8  lg:px-12 sm:px-[20px] sm:flex-col">
    <div class="sm:my-2 w-1/4 sm:w-full">
      <RouterLink to="/"><img src="../assets/Images/bertrand 1.png" alt="AvecBertrand.tech" /></RouterLink>
    </div>
    <div class="sm:mt-4 sm:mb-8 flex flex-row justify-center items-center w-1/2 sm:w-auto">
      <ul class="flex sm:flex-wrap gap-4 ">
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/youtube">YouTube</RouterLink></li>
        <li><RouterLink to="/blog">Blog</RouterLink></li>
        <li><RouterLink to="/portfolio">Portfolio</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </div>
    <div class="flex flex-row w-1/4 gap-3 justify-end slide">
      <a href="https://www.youtube.com/@TechAvecBertrand" target="_blank" class="text-18 font-light leading-27 underline"> <img src="../assets/Images/Icon/YouTube.svg" alt="YouTube" class="w-6 h-6" /> </a>
      <a href="https://www.instagram.com/tech_avecbertrand/" target="_blank" class="text-18 font-light leading-27 underline"><img src="../assets/Images/Icon/Instagram.svg" alt="Instagram" class="w-6 h-6" /></a>
      <a href="https://www.linkedin.com/in/bertrand-bourgy-06a77850/" target="_blank" class="text-18 font-light leading-27 underline"><img src="../assets/Images/Icon/LinkedIn.svg" alt="LinkedIn" class=" slide w-5 h-5" /></a>
    </div>
  </div>
  <div class=" border-t-2 border-[#F8EFFA] mx-[5.5%]"></div>
  <div class="sm:px-[20px] flex flex-row justify-center text-[#F8EFFA] gap-6 mt-10 mb-[5rem] sm:flex-col">
    <p>2023, Réalisé par <a href="https://www.linkedin.com/in/daniela-repesciuc/" class="underline">Daniela</a> et <a href="https://zenisity.agency/" class="underline">Zenisity</a></p>
    <div class="flex flex-row gap-6 underline sm:flex-col ">
      <RouterLink to="/mentions-legales">Mentions légales</RouterLink>
    </div>
  </div>
</template>
