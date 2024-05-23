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
  couverture: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  Categoryslug: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="rounded-[20px] flex flex-col shadow-lg overflow-hidden shrink-0 cardstyle">
    <img
      class="w-full h-[225px] object-cover"
      :src="'https://api.avecbertrand.tech/storage/uploads/' + couverture"
      alt="Sunset in the mountains" />
    <div
      class="h-full card-gradient flex p-[24px] md:p-[12px] flex-col justify-between items-start self-stretch">
      <div class="space-y-4">
        <RouterLink :to="{name: 'blog', params: {CategorySlug: Categoryslug}}" class="font-semibold">{{ catégorie }}</RouterLink>
        <h6 class="text-left">{{ replaceSpecialChars(titre) }}</h6>
      </div>
      <div class="flex flex-row justify-start md:pl-2 pt-8 pb-2 gap-6 w-full">
        <div>
          <div class="CTA3">
            <a rel="noopener noreferrer" :href="'/blog/'+Categoryslug+ '/'+slug" class=""
              >Lire
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
