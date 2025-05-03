<template>
    <div class="app-container">
        <div id="app-loader" v-if="loading" class="app-loader">
            <LoadingScreen @loading-complete="loading = false" />
        </div>

        <!-- Grid Overlay -->
        <div class="grid-overlay"></div>

        <!-- Mobile Navigation (Logo Left, Menu Button Right) -->
        <div v-if="isMobile" class="mobile-nav">
            <div class="mobile-logo">
                <img src="/foss-icon.svg" alt="FOSS Club Logo" />
                <div class="logo-text">
                    <h1>FOSS Club</h1>
                    <p>GEC Palakkad</p>
                </div>
            </div>
            <button @click="toggleSidebar" class="mobile-menu-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="21"
                    viewBox="0 0 28 21"
                    fill="none"
                >
                    <path
                        d="M0.263184 2.23792H27.3803M0.263184 10.4699H27.3803M0.263184 18.2177H27.3803"
                        stroke="#787878"
                        stroke-width="3.87388"
                    />
                </svg>
            </button>
        </div>

        <!-- Desktop Navigation -->
        <nav v-if="!isMobile" class="navbar">
            <div class="logo">
                <img src="/foss-icon.svg" alt="FOSS Club Logo" />
                <div class="logo-text">
                    <h1>FOSS Club</h1>
                    <p>GEC Palakkad</p>
                </div>
            </div>
            <div class="nav-links">
                <router-link to="/" class="nav-link" exact-active-class="active"
                    >Home</router-link
                >
                <router-link to="/makers" class="nav-link" active-class="active"
                    >Makers</router-link
                >
                <router-link
                    to="/breakpoint"
                    class="nav-link"
                    active-class="active"
                    >Breakpoint</router-link
                >
                <router-link to="/blog" class="nav-link" active-class="active"
                    >Blogs</router-link
                >
            </div>
        </nav>

        <!-- Mobile Sidebar -->
        <div
            v-if="sidebarOpen"
            class="sidebar"
            :class="{ closing: sidebarClosing }"
        >
            <button @click="toggleSidebar" class="close-btn">✖</button>
            <router-link @click.native="closeSidebar" to="/" class="nav-link"
                >Home</router-link
            >
            <router-link
                @click.native="closeSidebar"
                to="/makers"
                class="nav-link"
                >Makers</router-link
            >
            <router-link
                @click.native="closeSidebar"
                to="/breakpoint"
                class="nav-link"
                >Breakpoint</router-link
            >
            <router-link
                @click.native="closeSidebar"
                to="/blog"
                class="nav-link"
                >Blogs</router-link
            >
        </div>
        <Transition name="fade" mode="out-in">
            <router-view />
        </Transition>
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
            isMobile: window.innerWidth <= 768,
            sidebarOpen: false,
            sidebarClosing: false,
        };
    },
    methods: {
        toggleSidebar() {
            if (this.sidebarOpen) {
                this.sidebarClosing = true;
                setTimeout(() => {
                    this.sidebarOpen = false;
                    this.sidebarClosing = false;
                }, 300);
            } else {
                this.sidebarOpen = true;
                this.sidebarClosing = false;
            }
        },
        closeSidebar() {
            this.sidebarClosing = true;
            setTimeout(() => {
                this.sidebarOpen = false;
                this.sidebarClosing = false;
            }, 300);
        },
        updateWindowWidth() {
            this.isMobile = window.innerWidth <= 768;
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowWidth);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateWindowWidth);
    },
};
</script>

<style>
:root {
    --background-color: #121212;
    --text-color: white;
}

.app-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
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
    overscroll-behavior: none;
    overflow-x: hidden;
}

.app-container {
    background-color: var(--background-color);
    min-height: 100vh;
    width: 100%;
    font-family: "Inter", sans-serif;
    color: var(--text-color);
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
    z-index: 0;
    pointer-events: none;
}

.mobile-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background-color);
    padding: 10px;
    padding-bottom: 80px;
}

.mobile-logo {
    display: flex;
    align-items: center;
    margin-left: 10px;
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
    border: none;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    margin-top: 10px;
    /* font-size: 32px; */
    /* color: white; */
    /* padding: 8px 0 8px 12px; */
    /* margin-right: 5px; */
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

@keyframes slideOutRight {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
}

.sidebar.closing {
    animation: slideOutRight 0.3s forwards;
}

.sidebar .close-btn {
    -webkit-tap-highlight-color: transparent; /* Removes highlight on tap */
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
</style>
