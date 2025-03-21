<template>
  <!-- Main Content -->
  <div class="makers-intro">
    <div class="about-maker-otm">
      <h1 class="arc-container">
        <span class="arc-text">Maker Of The Month</span>
        <span class="emoji">💎</span>
      </h1>
      <p class="description">
        'Maker of the Month' is a monthly award to recognize and reward innovative minds! Whether you are a technical genius or a creative non-technical maker, this is your chance to showcase your skills, gain recognition, and win exciting prizes! ✨
      </p>
    </div>
    <div class="animation-container">
      <Spline class="animation" :scene="scene" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Spline from "spline-vue/v3";

export default defineComponent({
  name: "MakersPage",
  components: {
    Spline,
  },
  data: () => ({
    scene: "https://prod.spline.design/nug5ptImZsZ-a4i6/scene.splinecode",
  }),
});
</script>

<style scoped>
.makers-intro {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1200px;
  margin: 7% auto;
  padding: 0 20px;
  position: relative;
  z-index: 5;
  font-family: Poppins;
}

.arc-container {
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.2;
  position: relative;
}

.arc-text {
  display: inline-block;
  transform: perspective(300px) rotateX(8deg);
  transform-origin: center;
  padding: 0 5px;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 30px;
}

.emoji {
  font-size: 28px;
  position: relative;
  top: -2px;
}

.animation-container {
  width: 100%;
  height: 350px;
  position: relative;
  overflow: hidden;
  filter: drop-shadow(0px 4px 20px rgba(12, 205, 212, 0.788));
  transition: filter 0.4s ease-in-out; 
}

.animation-container:hover {
  filter: drop-shadow(0px 40px 7px rgba(12, 182, 212, 0.788));
}

.animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .makers-intro {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 1.5rem;
  }
  
  .makers-intro > div:first-child {
    order: 1;
    text-align: center;
  }
  
  .arc-container, .description {
    text-align: center;
  }
  
  .arc-text {
    transform: perspective(200px) rotateX(6deg);
  }
  
  .animation-container {
    order: 2;
    height: 300px;
  }
}
</style>