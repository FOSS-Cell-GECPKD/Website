<template>
    <div class="loading-container">
        <div
            class="color-scroll"
            :class="{ 'animate-scroll': startScrollAnimation }"
        ></div>
        <div class="loading-content">
            <div class="logo-animation">
                <img
                    :src="logoFrames[currentFrame]"
                    alt="FOSS Club Logo"
                    class="loading-logo"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingScreen",
    data() {
        return {
            startScrollAnimation: false,
            currentFrame: 0,
            logoFrames: [
                "/loading-logo-1.svg",
                "/loading-logo-2.svg",
                "/loading-logo-3.svg",
                "/loading-logo-4.svg",
                "/loading-logo-5.svg",
            ],
        };
    },
    mounted() {
        const frameInterval = setInterval(() => {
            this.currentFrame =
                (this.currentFrame + 1) % this.logoFrames.length;
        }, 200);

        setTimeout(() => {
            clearInterval(frameInterval);
            this.startScrollAnimation = true;
        }, 1200);

        setTimeout(() => {
            this.$emit("loading-complete");
        }, 3500);
    },
};
</script>

<style scoped>
.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    animation-delay: 3.5s;
}

.loading-content {
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: logoUp 0.5s ease-in-out forwards;
    animation-delay: 1.5s;
}

.logo-animation {
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 9999;
}

.loading-logo {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    transition: all 0.2s ease-in-out;
}

@keyframes logoUp {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-150px);
        opacity: 0;
    }
}

.color-scroll {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    z-index: 0;
    background: #21201e;
}
.color-scroll::before {
    content: "";
    position: absolute;
    top: 100vh;
    height: 100vh;
    width: 100%;
    background: #4ef037; /* Green */
}
.color-scroll::after {
    content: "";
    position: absolute;
    top: 200vh;
    height: 100vh;
    width: 100%;
    background: #0c81f6; /* Blue */
}

.color-scroll.animate-scroll {
    animation: scrollColors 2s ease-in-out forwards;
}

@keyframes scrollColors {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-200%);
    }
}

</style>
