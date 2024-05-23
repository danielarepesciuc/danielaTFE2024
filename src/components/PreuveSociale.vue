<script setup>
</script>
<template>
  <div class="slider ">
    <div class="slide-track flex flex-row justify-center gap-x-8 icones items-center self-stretch">
      <div class="slide flex justify-center">
        <img src="../assets/Images/fiverr logo 1.png" class="Fiverr w-[150px]" alt="Logo Fiverr" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/K&F Concept Logo 1.png" class="KF"  alt="Logo K&F Concept" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/Odoo_logo.png" class="Odoo" alt="Logo Odoo" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/Hostinger Logo 1.png" class="Hostinger" alt="Logo Hostinger" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/fiverr logo 1.png" class="Fiverr w-[150px]" alt="Logo Fiverr" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/K&F Concept Logo 1.png" class="KF" alt="Logo K&F Concept" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/Odoo_logo.png" class="Odoo" alt="Logo Odoo" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/Hostinger Logo 1.png" class="Hostinger" alt="Logo Hostinger" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/fiverr logo 1.png" class="Fiverr w-[150px]" alt="Logo Fiverr" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/K&F Concept Logo 1.png" class="KF" alt="Logo K&F Concept" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/Odoo_logo.png" class="Odoo" alt="Logo Odoo" />
      </div>
      <div class="slide flex justify-center">
        <img src="../assets/Images/Hostinger Logo 1.png" class="Hostinger" alt="Logo Hostinger" />
      </div>
    </div>
  </div>
</template>

<style>
/* Carroussel Animation */
@-webkit-keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 7));
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 7));
  }
}
.slider {
  margin: auto;
  overflow: hidden;
}
.slider::before, .slider::after {
  content: "";
  height: 100px;
}
.slider::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.slider::before {
  left: 0;
  top: 0;
}
.slider .slide-track {
  -webkit-animation: scroll 40s linear infinite;
          animation: scroll 40s linear infinite;
  display: flex;
  width: calc(250px * 14);
}
.slider .slide {
  height: 100px;
  width: 250px;
}
</style>
