<template>
    <div>
        <!-- <div v-if="loading" class="loading-container"> -->
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
        <!-- <div v-else> -->
        <div>
            <div class="app-container">
                <!-- Grid Overlay -->
                <div class="grid-overlay"></div>

              
              
                <!-- Mobile Navigation (Logo Left, Menu Button Right) -->
                <div v-if="isMobile" class="mobile-nav">
                    <div class="mobile-logo">
                        <img src="/foss-icon.svg" alt="FOSS Club Logo" />
                        <div class="logo-text">
                            <h1>FOSS Club</h1>
                            <p>GEC, Palakkad</p>
                        </div>
                    </div>
                    <button @click="toggleSidebar" class="mobile-menu-btn">☰</button>
                </div>

                <!-- Desktop Navigation -->
                <nav v-if="!isMobile" class="navbar">
                    <div class="logo">
                        <img src="/foss-icon.svg" alt="FOSS Club Logo" />
                        <div class="logo-text">
                            <h1>FOSS Club</h1>
                            <p>GEC, Palakkad</p>
                        </div>
                    </div>
                    <div class="nav-links">
                        <router-link to="/" class="nav-link active">Home</router-link>
                        <router-link to="/events" class="nav-link">Events</router-link>
                        <router-link to="/about" class="nav-link">About</router-link>
                        <router-link to="/team" class="nav-link">Team</router-link>
                        <router-link to="/gallery" class="nav-link">Gallery</router-link>
                    </div>
                </nav>

                <!-- Mobile Sidebar -->
                <div v-if="sidebarOpen" class="sidebar">
                    <button @click="toggleSidebar" class="close-btn">✖</button>
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/events" class="nav-link">Events</router-link>
                    <router-link to="/about" class="nav-link">About</router-link>
                    <router-link to="/team" class="nav-link">Team</router-link>
                    <router-link to="/gallery" class="nav-link">Gallery</router-link>
                </div>

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
                                    FOSS Club GEC Palakkad is a non-profit
                                    foundation that aims at promoting and
                                    strengthening the Free and Open Source
                                    Software (FOSS) ecosystem among GEC-ians.
                                </p>
                                <div class="buttons">
                                    <button class="join-button">
                                        JOIN US ✨
                                    </button>
                                    <button class="events-button">
                                        See Events
                                    </button>
                                </div>
                            </div>
                            <div class="terminal-whitespace"></div>
                        </div>
                    </div>

                    <div class="logos-section">
                        <div class="logo-card">
                            <img
                                src="/foss-united-white.svg"
                                alt="FOSS United"
                            />
                            <img src="/icfoss.svg" alt="ICFOSS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script></script>

<script>
export default {
    name: "FossClubHomepage",
    data() {
        return {
            loading: true,
            startScrollAnimation: false,
            currentFrame: 0,
            logoFrames: [
                "/FOSS_GECPKD_Website/loading-logo-1.svg",
                "/FOSS_GECPKD_Website/loading-logo-2.svg",
                "/FOSS_GECPKD_Website/loading-logo-3.svg",
                "/FOSS_GECPKD_Website/loading-logo-4.svg",
                "/FOSS_GECPKD_Website/loading-logo-5.svg",
            ],
            sidebarOpen: false,
            windowWidth: window.innerWidth,
        };
    },

    computed: {
        isMobile() {
            return this.windowWidth <= 768;
        },
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        updateWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowWidth);

        // Faster logo animation
        const frameInterval = setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.logoFrames.length;
        }, 200); // Faster frame change

        // Hide loading screen smoothly
        setTimeout(() => {
            clearInterval(frameInterval);
            this.startScrollAnimation = true;
        }, 1200); // Reduced delay

        setTimeout(() => {
            this.loading = false;
        }, 3500); // Faster transition
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateWindowWidth);
    },
};
</script>

<style scoped>
/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body,
html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}

.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #21201e;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    animation: fadeOut 0.2s ease-in-out forwards;
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
    background: #21201e;
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
    height: 300%;
    z-index: 0;
    background-color: #21201e;
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

@keyframes fadeOut {
    to {
        opacity: 0;
        pointer-events: none;
    }
}

.app-container {
    background-color: #121212;
    min-height: 100vh;
    width: 100%;
    /* background-image: linear-gradient(
        135deg,
        rgba(0, 128, 0, 0.12),
        rgba(0, 0, 255, 0.15)
    ); */
    font-family: "Inter", sans-serif;
    color: white;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    position: relative;
}

/* Grid Overlay */
.grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px
        ),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
    pointer-events: none;
}


.mobile-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #121212;
    padding: 10px;
}

.mobile-logo {
    display: flex;
    align-items: center;
}

.mobile-logo img {
    height: 40px;
    margin-right: 10px;
}

/* Remove the display: none; to show the text */
.mobile-logo .logo-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.mobile-logo .logo-text h1 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}

.mobile-logo .logo-text p {
    margin: 0;
    font-size: 12px;
    opacity: 0.8;
}

.mobile-menu-btn {
    font-size: 32px;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
    padding: 8px 12px; 
    margin-right: 5px; 
}

.mobile-menu-btn:hover,
.mobile-menu-btn:active {
    opacity: 0.8;
}


.sidebar {
    position: fixed;
    top: 0;
    right: 0;  
    width: 250px;
    height: 100%;
    background-color: rgba(18, 18, 18, 0.6); 
    backdrop-filter: blur(10px);  
    -webkit-backdrop-filter: blur(10px);  
    border-left: 1px solid rgba(255, 255, 255, 0.1); 
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1); 
    display: flex;
    flex-direction: column;
    padding: 20px;
    z-index: 100;
    transform: translateX(100%); 
    animation: slideInRight 0.3s forwards; 
}


@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

.sidebar .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 20px;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.sidebar .close-btn:hover {
    opacity: 1;
}

.sidebar .nav-link {
    padding: 12px 15px;
    color: white;
    text-decoration: none;
    display: block;
    font-size: 18px;
    margin-bottom: 5px;
    border-radius: 8px;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.05);
}

.sidebar .nav-link:hover {
    background-color: rgba(12, 129, 246, 0.8);
    color: white;
    transform: translateX(-5px);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 10;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.logo-text h1 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}

.logo-text p {
    margin: 0;
    font-size: 14px;
    opacity: 0.8;
}

.nav-links {
    display: flex;
    gap: 30px;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-size: 16px;
    opacity: 0.8;
    transition:
        opacity 0.3s,
        color 0.3s;
    font-family: Poppins;
}

.nav-link:hover {
    opacity: 1;
    color: #0c81f6; 
}

.nav-link.active {
    font-style: bold;
    position: relative;
    opacity: 1;
}

.nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    border-radius: 20px;
    height: 3px;
    background-color: #0c81f6;
}

.main-content {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    position: relative;
    z-index: 5;
}

.terminal-window {
    background-color: #1e1e1e;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 5;
    box-shadow:
    0px -10px 200px #4EF037,
    150px -40px 250px #0C81F6, 
    -7px 10px 42px #4df037a0; 
    
}

.terminal-header {
    background-color: #1a1a1a;
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
    grid-template-columns: 3fr 1fr;
    gap: 20px;
    padding: 30px;
    font-family: Poppins;
    font-style: italic;
    font-weight: 600;
    word-wrap: break-word;
}

.terminal-content {
}

.main-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 1.2;
}

.emoji {
    font-size: 30px;
}

.description {
    font-size: 16px;
    line-height: 1.6;
    opacity: 0.8;
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
    /* background-color: #34a573; */
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

.logo-card {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.logo-card img {
    width: 100%;
    max-width: 200px;
}

@media screen and (max-width: 380px) {
    .mobile-menu-btn {
        padding: 10px 15px;
    }
}

@media screen and (max-width: 380px) {
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
}

@media screen and (min-width: 769px) {
    .mobile-nav {
        display: none;
    }
}

@media (max-width: 900px) {
    .main-content {
        flex-direction: column;
    }
    
    .terminal-window{
        box-shadow:
    0px -10px 200px #4EF037,
    150px -40px 250px #0C81F6, 
    -1px 4px 10px #4df03720; 
    margin-bottom: 1.2rem;
    }


    .logos-section {
        margin-left: 0;
        margin-top: 20px;
    }

    .nav-links {
        display: none;
    }
}
</style>