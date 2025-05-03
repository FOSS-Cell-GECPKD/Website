<template>
    <div class="blog-list">
        <div
            v-motion
            :initial="{ opacity: 0, scaleY: 0 }"
            :enter="{ opacity: 1, scaleY: 1 }"
            :transition="{ duration: 1000, ease: 'easeOut' }"
            class="posts"
        >
            <div v-for="post in posts" :key="post.slug" class="post-preview">
                <router-link
                    class="post-entry"
                    :to="{ name: 'BlogPost', params: { slug: post.slug } }"
                >
                    <div class="post-summary">
                        <div>
                            <h2 class="post-title">{{ post.title }}</h2>
                            <p class="description">{{ post.description }}</p>
                        </div>
                        <p class="date">{{ formatDate(post.date) }}</p>
                    </div>
                    <div v-if="post.coverImage">
                        <img
                            class="post-cover"
                            :src="post.coverImage"
                            :alt="post.title"
                        />
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { getPostList } from "../utils/blog.js";

export default {
    name: "BlogList",
    data() {
        return {
            posts: [],
        };
    },
    async created() {
        this.posts = await getPostList();
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
.blog-list {
    font-family: Poppins;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.post-entry {
    position: relative;
    border-radius: 10px;
    background-color: rgba(255, 255, 247, 0.1);
    stroke-width: 3px;
    stroke: white;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 1);
    justify-content: space-between;
    display: flex;
    gap: 24px;
    box-shadow:
        -30px 30px 100px rgba(12, 129, 246, 0.4),
        12px -30px 100px rgba(252, 251, 45, 0.3);
}

.post-preview {
    padding-bottom: 20px;
}

.post-preview a {
    text-decoration: none;
    color: inherit;
}

.post-summary {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 130px;
}

.post-title {
    font-size: 32px;
    font-weight: bold;
    padding-bottom: 8px;
}

.description {
    font-size: 16px;
    font-weight: light;
}

.date {
    font-size: 14px;
    font-weight: light;
}

.post-cover {
    position: relative;
    object-fit: cover;
    overflow: hidden;
    border-radius: 8px;
    height: 180px;
}

@media (max-width: 900px) {
    .post-entry {
        justify-content: space-between;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 24px;
        padding-bottom: 18px;
    }

    .post-cover {
        object-fit: contain;
        overflow: hidden;
        border-radius: 8px;
        width: 100%;
    }

    .post-title {
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 8px;
    }

    .description {
        font-size: 12px;
        font-weight: light;
    }

    .date {
        font-size: 10px;
        font-weight: light;
    }
}
</style>
