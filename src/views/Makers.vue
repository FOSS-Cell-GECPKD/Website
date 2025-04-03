<template>
    <!-- Main Content -->
    <div class="makers-intro">
        <div class="terminal-window">
            <div class="about-maker-otm">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <div class="terminal-button red"></div>
                        <div class="terminal-button yellow"></div>
                        <div class="terminal-button green"></div>
                    </div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-content">
                        <h1 class="main-title">
                            Maker Of The Month <span class="emoji">💎</span>
                        </h1>
                        <p class="description">
                            'Maker of the Month' is a monthly award to recognize
                            and reward innovative minds! Whether you are a
                            technical genius or a creative non-technical maker,
                            this is your chance to showcase your skills, gain
                            recognition, and win exciting goodies! ✨
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="animation-container">
            <img
                src="/maker_crystal.gif"
                alt="Maker Crystal"
                class="fallback-image"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "MakersPage",
});
</script>

<style scoped>
.makers-intro {
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 1fr;
    width: 100%;
    max-width: 1200px;
    margin: 7% auto;
    padding: 0 20px;
    position: relative;
    z-index: 5;
    font-family: Poppins;
}

.terminal-window {
    background-color: #1e1e1e;
    stroke-width: 20px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 640px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 5;
    box-shadow:
        -12px 40px 200px rgba(12, 129, 246, 0.3),
        150px -30px 100px rgba(162, 104, 248, 0.3);
}

.terminal-header {
    background-color: rgba(12, 129, 246, 0.1);
    padding: 10px;
    display: flex;
    align-items: center;
}

.terminal-buttons {
    display: flex;
    gap: 8px;
}

.terminal-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.terminal-button.red {
    background-color: #ff5f56;
}

.terminal-button.yellow {
    background-color: #ffbd2e;
}

.terminal-button.green {
    background-color: #27c93f;
}

.terminal-body {
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    padding: 30px;
    font-family: Poppins;
    font-weight: 600;
    word-wrap: break-word;
}

.main-title {
    font-size: 40px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 20px;
    line-height: 1.2;
}

.description {
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.8;
    font-weight: 600;
    margin-bottom: 30px;
}

.emoji {
    font-size: 40px;
    position: relative;
    top: -2px;
}

.animation-container {
    width: 100%;
    height: 350px;
    position: relative;
    overflow: hidden;
    filter: drop-shadow(0px 4px 40px rgba(12, 205, 212, 0.35));
    transition: filter 0.4s ease-in-out;
}
.fallback-image {
    transform: scale(1.5);
    transform-origin: 50% 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

    .terminal-body {
        grid-template-columns: 1fr;
    }

    .makers-intro > div:first-child {
        order: 1;
        text-align: center;
    }

    .main-title,
    .description {
        text-align: center;
    }

    .animation-container {
        order: 2;
        height: 300px;
    }
}
</style>
