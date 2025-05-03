<template>
    <div class="blog-post" v-if="post">
        <div class="post-nav">
            <router-link class="nav-link" to="/blog">Back to Blog</router-link>
        </div>
        <div class="post-header">
            <h1 class="post-title">{{ post.title }}</h1>
            <p class="date">{{ post.author }} · {{ formatDate(post.date) }}</p>
        </div>
        <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            :transition="{ duration: 1000, ease: 'easeOut' }"
            class="post-content"
            v-html="post.content"
        ></div>
    </div>
    <div v-else class="not-found">
        <h2>Post not found</h2>
        <router-link class="nav-link" to="/blog">Back to Blog</router-link>
    </div>
</template>

<script>
import { getPostBySlug } from "../utils/blog.js";

export default {
    name: "BlogPost",
    metaInfo() {
        return {
            title: this.pageTitle,
            meta: [
                { property: "og:title", content: this.pageTitle },
                { property: "og:description", content: this.pageDescription },
                { property: "og:image", content: this.imageUrl },
                { property: "og:url", content: window.location.href },
                { property: "og:type", content: "website" },
            ],
        };
    },
    data() {
        return {
            pageTitle: "FOSS Club Blog",
            pageDescription: "Blog page",
            imageUrl: "https://foss.gecskp.ac.in/foss-icon-black.svg",
            post: null,
        };
    },
    async created() {
        this.post = await getPostBySlug(this.$route.params.slug);
        this.pageTitle = this.post.title;
        this.pageDescription = this.post.description;
        this.imageUrl = this.post.coverImage;
        this.author = this.post.author;
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
};
</script>

<style scoped>
.blog-post {
    font-family: Poppins;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 100px;
}

.post-title {
    font-weight: bolder;
    font-size: 3em;
}

.description {
    font-size: 1.2em;
    font-weight: lighter;
    padding-bottom: 15px;
}
.post-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.date {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1em;
}

.post-content {
    font-family: "Cormorant Garamond", serif;
    display: flex;
    flex-direction: column;
    line-height: 1.8;
    gap: 48px;
    font-size: 1.4em;
}

.post-content :deep(img) {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    height: auto;
}

.post-nav {
    margin-top: 40px;
    padding-top: 20px;
}

.not-found {
    text-align: center;
    padding: 50px 20px;
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

@media (max-width: 900px) {
    .post-title {
        font-weight: bolder;
        font-size: 32px;
    }
    .blog-post {
        margin: 15px;
        font-family: poppins;
        max-width: 800px;
        padding-bottom: 100px;
    }
    .post-content {
        display: flex;
        flex-direction: column;
        line-height: 1.5;
        gap: 48px;
        font-size: 1.4em;
    }
}
</style>
