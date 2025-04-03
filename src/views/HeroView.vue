<template>
    <!-- Main Content -->
    <div class="main-content">
        <div class="terminal-window">
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
                        Free and Open<br />
                        Source Software<br />
                        Foundation <span class="emoji">📱</span>
                    </h1>
                    <p class="description">
                        FOSS Club GEC Palakkad is a non-profit foundation that
                        aims at promoting and strengthening the Free and Open
                        Source Software (FOSS) ecosystem among GEC-ians.
                    </p>
                    <div class="buttons">
                        <button
                            class="join-button"
                            onclick="window.open('https://chat.whatsapp.com/EUBywB22KKnKfvuOibeKG1', '_blank')"
                        >
                            JOIN US ✨
                        </button>
                    </div>
                </div>
                <div v-if="!isMobile" class="terminal-whitespace"></div>
            </div>
        </div>

        <div class="logos-section">
            <div class="logo-card">
                <img
                    id="foss-united-logo"
                    src="/foss-united-white.svg"
                    alt="FOSS United"
                />
                <img id="icfoss-logo" src="/icfoss.svg" alt="ICFOSS" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeroPage",
};
</script>

<style scoped>
.main-content {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 7% auto;
    padding: 0 20px;
    position: relative;
    z-index: 5;
}

.terminal-window {
    background-color: #1e1e1e;
    stroke-width: 20px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 5;
    box-shadow:
        -12px 40px 200px rgba(78, 240, 55, 0.3),
        150px -30px 100px rgba(12, 129, 246, 0.3);
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
    /* grid-template-columns: 3fr 1fr; */
    padding: 30px;
    font-family: Poppins;
    font-weight: 600;
    word-wrap: break-word;
}

.main-title {
    /* font-size: 36px; */
    font-weight: bold;
    font-style: italic;
    margin-bottom: 20px;
    line-height: 1.2;
}

.emoji {
    font-size: 28px;
}

.description {
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.8;
    font-weight: 600;
    margin-bottom: 30px;
}

.buttons {
    display: flex;
    gap: 20px;
}

.join-button {
    background-color: #0c81f6;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.join-button:hover {
    background-color: rgba(65, 184, 131, 1);
    border-color: #34a573;
}

.events-button {
    background-color: transparent;
    color: white;
    border: 2px dashed #0c81f6;
    padding: 15px 30px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition:
        background-color 0.3s,
        border-color 0.3s;
}

.events-button:hover {
    background-color: rgba(65, 184, 131, 0.1);
    border-color: #34a573;
}

.logos-section {
    width: 100%;
    max-width: 300px;
    position: relative;
    z-index: 6;
    margin-left: -50px;
    margin-top: 50px;
}

/* experimenting for mobile verison */
.logo-card {
    display: flex;
    align-items: center;
    gap: 30px;
}

.logo-card img {
    width: 100%;
    max-width: 200px;
}

#foss-united-logo {
    max-width: 130px;
}

#icfoss-logo {
    max-width: 170px;
}

@media screen and (max-width: 380px) {
    .mobile-menu-btn {
        padding: 10px 15px;
    }
    .mobile-logo img {
        height: 30px;
    }

    .mobile-logo .logo-text h1 {
        font-size: 14px;
    }

    .mobile-logo .logo-text p {
        font-size: 10px;
    }
}

/* Hide navbar on mobile */
@media screen and (max-width: 768px) {
    .navbar {
        display: none;
    }

    .main-title {
        font-size: 27px;
    }

    .main-content {
        align-items: center;
        flex-direction: column;
    }
    .logo-card {
        display: flex;
        justify-content: center;
    }
    .logo-card img {
        width: 40%;
        padding: 5px;
        margin: 15px;
        max-width: 150px;
    }

    .logos-section {
        margin-top: 20px;
        justify-content: center;
        margin: 0 auto;
    }
}

@media screen and (min-width: 769px) {
    .mobile-nav {
        display: none;
    }

    .main-title {
        font-size: 36px;
    }

    .terminal-body {
        grid-template-columns: 3fr 1fr;
    }

    .main-content {
        display: flex;
        justify-content: center;
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
        position: relative;
        z-index: 5;
    }

    .logo-card {
        background-color: rgba(255, 255, 247, 0.03);
        stroke-width: 3px;
        stroke: white;
        backdrop-filter: blur(5px);
        border-radius: 10px;
        padding: 30px;
        flex-direction: column;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
}

@media (max-width: 900px) {
    .terminal-window {
        box-shadow:
            -12px 40px 200px rgba(78, 240, 55, 0.3),
            150px -30px 100px rgba(12, 129, 246, 0.3);
        margin-bottom: 1.2rem;
    }
}

@media (min-width: 900px) {
    .logo-card img {
        width: 100%;
        max-width: 200px;
    }
}
</style>
