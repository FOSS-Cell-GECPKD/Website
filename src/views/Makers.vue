<template>
    <!-- Main Content -->
    <div class="makers-intro">
        <div>
            <h1 class="main-title">
                Maker Of The Month <span class="emoji">💎</span>
            </h1>
            <p class="description">
                'Maker of the Month' is a monthly award to recognize and reward
                innovative minds! Whether you are a technical genius or a
                creative non-technical maker, this is your chance to showcase
                your skills, gain recognition, and win exciting prizes! ✨
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

.main-title {
    /* font-size: 36px; */
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 1.2;
}

.description {
    font-size: 16px;
    line-height: 1.6;
    opacity: 0.8;
    margin-bottom: 30px;
}

.emoji {
    font-size: 28px;
}

.animation-container {
    width: 100%;
    height: 350px; /* Set this to the expected final height of your animation */
    position: relative;
    overflow: hidden; /* Optional, depends on your animation */
}

.animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
