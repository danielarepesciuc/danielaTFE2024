<template>
  <div class="flex justify-center flex-col items-center gap-4 mt-10">
    <h1 class="text-7xl">Oups</h1>
    <p>La page que vous cherchez n'exite pas.</p>
    <RouterLink to="/" class="CTA2 w-[180px] mt-10">
      Revenir à l'accueil
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
