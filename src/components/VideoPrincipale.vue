<script setup>
defineProps({
  titre: {
    type: String,
    required: true,
  },
  catégorie: {
    type: String,
    required: true,
  },
  miniature: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  URLSlug: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="rounded-[20px] flex flex-row md:flex-col  shadow-lg overflow-hidden shrink-0 w-full lg:h-auto h-[20rem]">
    <img
      class="md:w-auto w-1/2"
      :src="'https://api.avecbertrand.tech/storage/uploads/' + miniature"
      alt="Sunset in the mountains" />
    <div
      class="w-full flex p-[24px] md:p-[16px] flex-col justify-between items-start card-gradient">
      <div class="space-y-4">
        <RouterLink :to="{name: 'videos', params: {CategorySlug: categorySlug}}" class="font-semibold">{{ catégorie }}</RouterLink>
        <h6 class="text-left">{{ replaceSpecialChars(titre) }}</h6>
      </div>
      <div class="flex flex-row pb-2 md:flex-col md:w-full items-start">
        <div class="CTA3 ">
          <a rel="noopener noreferrer" :href="'/videos/'+categorySlug+ '/'+URLSlug" class="">
            Regarder la vidéo
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">
            <!-- Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.!-->
            <path
              fill="#ffffff"
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  function replaceSpecialChars(str) {
    return str
    .replace(/[éèê]/g, 'e')
    .replace(/[àâ]/g, 'a')
    .replace(/[ûüù]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[î]/g, 'i')
    .replace(/[ô]/g, 'o')
}
</script>

<style>
</style>
