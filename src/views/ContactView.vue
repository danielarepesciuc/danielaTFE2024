<script setup>
  import PreuveSociale from "../components/PreuveSociale.vue";
  import { RouterLink } from "vue-router";
</script>
<template>

  <div class="container flex flex-col justify-center items-start text-white px-[64px] lg:px-[20px] lg:my-6 gap-8 mt-6">
    <!--Intro-->
    <div class="flex flex-row items-start w-full gap-4 ">
      <div class="flex flex-col items-start gap-4">
      <h2>Me contacter</h2>
      <p>Contactez-moi si vous avez une question par rapport à un de mes contenus, si vous desirez de collaborer ou pour toute autre question</p>
      </div>
    </div>
    <div class="flex lg:flex-col flex-row items-start w-full gap-20 self-stretch">
      <!-- Div contenant le formulaire (aligné à gauche) -->
      <div class="w-1/2 lg:w-full">
      <form class=" text-left" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block mb-2">Nom</label>
          <input type="text" id="name" v-model="name" required class="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white bg-transparent" />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input type="email" id="email" v-model="email" required class="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white bg-transparent" />
        </div>
        <div class="mb-4">
          <label for="message" class="block mb-2">Message</label>
          <textarea id="message" v-model="message" required placeholder="Entrez votre message" class="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white bg-transparent"></textarea>
        </div>
        <div class="mb-4 flex items center">
          <input type="checkbox" id="terms" v-model="termsAccepted" class="mr-2 custom-checkbox" />
          <label for="terms" class="font-light">J’accepte les <RouterLink to="/mentions-legales" target="_blank" class="text-18 leading-27 underline"> Termes et Conditions</RouterLink></label>
        </div>
        <p v-if="submitClicked && !termsAccepted" class="text-red-400 my-2">Veuillez accepter les termes et conditions.</p>
        <button type="submit" class="CTA sm:w-full" @click="checkTerms">Envoyer</button>
        <div id="successMessage" class="fixed bottom-20 lg:bottom-0 sm:bottom-2 left-1/2 lg:left-0 lg:w-full transform -translate-x-1/2 lg:-translate-x-0 lg:my-[20px] p-2 bg-green-600 text-white px-4 sm:py-0 py-2 rounded-lg opacity-0 transition-opacity duration-500 z-50">Merci ! Votre message a été envoyé avec succès. Je vous repondrai dès que possible.</div>
      </form>
    </div>

      <!-- Div contenant les réseaux sociaux (à droite) -->
    <div class="flex flex-wrap items-start lg:gap-auto lg:m-0 gap-20 mt-6 w-1/2 lg:w-full lg:items-center lg:justify-center">
        <div class="flex flex-col items-start gap-1 lg:w-auto w-1/3 lg:items-center lg:justify-center">
          <img src="../assets/Images/Icon/YouTube.svg" alt="YouTube" class="w-8 h-8 mb-4" />
            <h6>YouTube</h6>
            <a href="https://www.youtube.com/@TechAvecBertrand" target="_blank" class="text-18 font-light leading-27 underline w-full text-start">Bertrand.Tech</a>
        </div>
        <div class="flex flex-col items-start gap-1 lg:w-auto lg:items-center lg:justify-center">
          <img src="../assets/Images/Icon/Instagram.svg" alt="Instagram" class="w-8 h-8 mb-4" />
            <h6 class="font-[Clesmont]">Instagram</h6>
            <a href="https://www.instagram.com/tech_avecbertrand/" target="_blank" class="text-18 font-light leading-27 underline w-full text-start">@techavecbertrand</a>
          </div>
      <div class="flex flex-col items-start gap-1 w-full lg:w-auto lg:items-center lg:justify-center">
        <img src="../assets/Images/Icon/LinkedIn.svg" alt="LinkedIn" class="w-8 h-8 mb-4" />
          <h6 class="font-[Clesmont]">Linkedin</h6>
          <a href="https://www.linkedin.com/in/bertrand-bourgy-06a77850/" target="_blank" class="text-18 font-light leading-27 underline w-full text-start">Bertrand Bourgy</a>
      </div>
    </div>
    </div>
  </div>
  <!-- Social Proof Section -->
  <section class="mt-12 lg:mt-0">
    <div class="text-center md:text-left my-2 lg:mt-12 lg:mb-6 lg:mx-[20px]">
      <h2>Ensemble, nous rendons la technologie accessible A tous</h2>
    </div>
    <div class="w-screen">
        <PreuveSociale />
    </div>
    </section>
</template>

<script>
const WEB3FORMS_ACCESS_KEY = "96e034c5-fe13-494a-9fcf-efa650ba87ff";

export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      termsAccepted: false,
      submitClicked: false,
    };
  },
  methods: {
    async submitForm() {

      this.submitClicked = true;

      if (!this.termsAccepted) {
        this.showAcceptTCMessage = true;

      } else{
        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: this.name,
          email: this.email,
          message: this.message,
        }),
      });
      const result = await response.json();
        if (result.success) {
        console.log(result);
        var successMessage = document.getElementById("successMessage");
        successMessage.style.opacity = 1;

        setTimeout(function() {
          successMessage.style.opacity = 0;
        }, 3000);
      }
      }
    },
  },
};
</script>

<style>
</style>

