<template>
    <div class="blog-post" v-if="post">
        <div class="post-nav">
            <router-link class="nav-link" to="/blog">Back to Blog</router-link>
        </div>
        <div class="post-header">
            <h1 class="post-title">{{ post.title }}</h1>
            <p class="description">{{ post.description }}</p>
            <p class="date">{{ formatDate(post.date) }}</p>
        </div>
        <div class="post-content" v-html="post.content"></div>
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
    data() {
        return {
            post: null,
        };
    },
    async created() {
        this.post = await getPostBySlug(this.$route.params.slug);
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
    font-family: poppins;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 100px;
}

.post-title {
    font-weight: bolder;
    font-size: 36px;
}

.description {
    font-size: 16px;
    font-weight: light;
    padding-bottom: 15px;
}
.post-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.date {
    color: #666;
    font-size: 0.9em;
}

.post-content {
    display: flex;
    flex-direction: column;
    line-height: 2;
    z-index: 10;
    gap: 16px;
}

.post-content :deep(img) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: 300px;
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
        text-align: justify;
        line-height: 2;
        z-index: 10;
        gap: 16px;
    }
}
</style>
