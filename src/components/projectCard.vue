<template>
    <div class="project-card" @click="openLink(project.projectLink)">
        <img
            :src="project.image"
            :alt="project.projectName"
            class="project-image"
        />
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">{{ project.projectName }}</h3>
                <span v-if="(project.stars || 0) > 0" class="star-count">
                    <Star class="star-icon" :size="14" />
                    {{ project.stars }}
                </span>
            </div>
            <p class="student-name">by {{ project.studentName }}</p>
            <p class="project-description">
                {{ project.description }}
            </p>

            <div class="tags-container">
                <span v-for="tag in project.tags" :key="tag" class="tag">
                    {{ tag }}
                </span>
            </div>

            <div class="links-container">
                <a
                    v-if="project.githubLink"
                    :href="project.githubLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    @click.stop
                >
                    <!-- <SiGithub :size="20" /> -->
                    <span>Source Code</span>
                </a>
                <a
                    :href="project.projectLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    @click.stop
                >
                    <ExternalLink :size="20" />
                    <span>Project Link</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ExternalLink, Star } from "lucide-vue-next";
// import { SiGithub } from "@icons-pack/vue-simple-icons";

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});

const openLink = (url) => {
    window.open(url, "_blank");
};
</script>

<style scoped>
.project-card {
    background-color: rgba(255, 255, 247, 0.1);
    border: 1px solid white;
    border-radius: 0.375rem;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease;
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.2);
}

.project-card:hover {
    transform: rotate(3deg);
}

.project-image {
    border-bottom: 1px solid white;
    width: 100%;
    height: 12rem;
    object-fit: cover;
}

.project-content {
    padding: 1.5rem;
}

.project-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.project-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
}

.star-count {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: black;
    height: fit-content;
    width: fit-content;
    padding: 0 0.25rem;
    background-color: #fef9c3;
    border: 1px solid #fef08a;
    border-radius: 0.125rem;
}

.star-icon {
    color: #eab308;
    fill: #eab308;
}

.student-name {
    font-size: 0.875rem;
    color: white;
    margin-bottom: 0.5rem;
}

.project-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: white;
    margin-bottom: 1rem;
    max-height: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tag {
    padding: 0.25rem 0.75rem;
    border: 1px solid black;
    background-color: #fef9c3;
    color: black;
    border-radius: 9999px;
    font-size: 0.875rem;
}

.links-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.project-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem;
    color: white;
    text-decoration: none;
    border-radius: 0.375rem;
}

.project-link:hover {
    color: white;
    background-color: black;
}
</style>
