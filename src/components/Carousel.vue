<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="lg:px-[20px] px-[64px] py-[48px] flex flex-col gap-[2rem] md:gap-[1.5rem]" @touchstart="onTouchStart"
    @touchmove="onTouchMove">
    <div class="flex flex-row w-full justify-between sm:flex-col">
      <h2 class="pl-12 sm:pl-0">{{ title }}</h2>
      <RouterLink class="CTA2 flex justify-end text-white sm:hidden" :to="link">Voir plus</RouterLink>
    </div>
    <div class="flex flex-row items-center justify-between sm:justify-center cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="25"
        width="16"
        viewBox="0 0 320 512"
        class="mr-[24px] sm:hidden"

        @click="prevItem">
        <path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
        <slot :items="itemsToShow" :class="{ 'scroll-right': currentIndex < prevIndex, 'scroll-left': currentIndex > prevIndex }"></slot> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="25"
        width="16"
        class="ml-[24px] sm:hidden cursor-pointer"
        viewBox="0 0 320 512"
        @click="nextItem">
        <path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
      </svg>
    </div>
    <div class="flex flex-row gap-3 m-auto items-center">
      <div
        v-for="(pairIndex, index) in Math.ceil(items.length / itemsPerRow)"
        :key="index"
        class="border rounded-2xl flex items-center justify-center"
        :class="{
          'border-2 border-white w-5 h-5 ': index * itemsPerRow === currentIndex || (index === 0 && currentIndex === 0),
          'border border-gray-400 w-3 h-3 ': index * itemsPerRow !== currentIndex && !(index === 0 && currentIndex === 0)
        }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    link: {
      type: String,
      required: false
    }
  },
  data(){
    return {
      currentIndex: 0,
      itemsPerRow: 3,
      prevIndex: 0,
    }
  },
  methods: {
    handleResize() {
      this.isSmallScreen = window.innerWidth < 426;
      if (window.innerWidth < 1025 && window.innerWidth >= 426) {
        this.itemsPerRow = 2;
      } else if (window.innerWidth < 426) {
        this.itemsPerRow = 1;
      } else {
        this.itemsPerRow = 3;
      }
    },
    nextItem() {
      const newIndex = this.currentIndex + this.itemsPerRow;
    if (newIndex < this.items.length) {
      this.prevIndex = this.currentIndex;
      this.currentIndex = newIndex;
    } else {
      this.prevIndex = this.currentIndex;
      this.currentIndex = 0;
    }
    },
    prevItem() {
      const newIndex = this.currentIndex - this.itemsPerRow;
    if (newIndex >= 0) {
      this.prevIndex = this.currentIndex;
      this.currentIndex = newIndex;
    }
    },
    onTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    onTouchMove(event) {
      if (!this.isSmallScreen) return;
      if (!this.touchStartX) return;
      const touchMoveX = event.touches[0].clientX;
      const diff = touchMoveX - this.touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.prevItem();
        } else {
          this.nextItem();
        }
        this.touchStartX = null; // Réinitialiser la position de départ
      }
    },
  },
  computed: {
    itemsToShow() {
      const startIndex = this.currentIndex;
      const endIndex = Math.min(startIndex + this.itemsPerRow, this.items.length);
      return this.items.slice(startIndex, endIndex);
    }
  },
  mounted() {
  window.addEventListener('resize', this.handleResize);
  this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
@media screen and (min-width: 1024px){
.paddeskop{
  padding:0 64px;
}
}

</style>






