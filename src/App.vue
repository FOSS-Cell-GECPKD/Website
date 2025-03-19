<template>
    <div>
        <LoadingScreen v-if="loading" @loading-complete="loading = false" />
        <router-view v-else />
    </div>
</template>

<script>
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
    name: "App",
    components: {
        LoadingScreen,
    },
    data() {
        return {
            loading: true,
        };
    },
};
</script>

<style>
/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Disable image dragging */
img {
    pointer-events: none;
    -webkit-user-drag: none;
    user-select: none;
    touch-action: none;
}

body,
html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
</style>
