<template>
    <div class="projects-page">
        <div class="projects-container">
            <div class="search-filters">
                <div class="search-container">
                    <div class="search-input-wrapper">
                        <Search class="search-icon" :size="20" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            class="search-input"
                            v-model="searchTerm"
                        />
                        <button
                            class="mobile-filter-toggle"
                            @click="showFilters = !showFilters"
                        >
                            <Filter
                                :size="18"
                                :class="showFilters ? 'filter-active' : ''"
                            />
                        </button>
                    </div>
                </div>

                <div
                    class="filter-controls"
                    :class="{ 'filters-visible': showFilters || isDesktop }"
                >
                    <select class="tag-select" v-model="selectedTag">
                        <option value="">All Tags</option>
                        <option v-for="tag in allTags" :key="tag" :value="tag">
                            {{ tag }}
                        </option>
                    </select>

                    <select class="sort-select" v-model="sortBy">
                        <option value="stars">Sort by: Stars ⭐</option>
                        <option value="none">Sort by: Default</option>
                        <option value="name">Sort by: Name</option>
                    </select>

                    <button
                        class="refresh-button"
                        @click="handleRefreshStars"
                        title="Refresh GitHub stars (clears cache)"
                    >
                        <span class="refresh-content">
                            <RefreshCw :size="16" />
                            Refresh Stars
                        </span>
                    </button>
                </div>
            </div>

            <div class="action-buttons">
                <div class="spacer"></div>
                <div class="buttons-group">
                    <!-- <a class="why-button" href="/Breakpoint/#/benefits">
                        <HelpCircle />
                        Why Breakpoint
                    </a> -->
                    <a
                        class="add-project-button"
                        href="https://opnform.com/forms/my-form-k1tkuv"
                    >
                        <Blocks />
                        Add My Project
                    </a>
                </div>
            </div>

            <div
                v-if="rateLimit && rateLimit.remaining < 10"
                class="rate-limit-warning"
            >
                <AlertCircle class="warning-icon" :size="20" />
                <p class="warning-text">
                    <strong>GitHub API rate limit warning:</strong>
                    {{ rateLimit.remaining }} requests remaining. Rate limit
                    will reset at {{ rateLimit.resetTime }}.
                </p>
            </div>

            <div v-if="isLoading" class="loading-spinner">
                <div class="spinner"></div>
            </div>

            <div v-else class="projects-grid">
                <ProjectCard
                    v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1 }"
                    :transition="{ duration: 300, ease: 'easeOut' }"
                    v-for="project in sortedProjects"
                    :key="project.id"
                    :project="project"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
    Search,
    AlertCircle,
    Filter,
    HelpCircle,
    Blocks,
    RefreshCw,
} from "lucide-vue-next";
import ProjectCard from "../components/ProjectCard.vue";
import { useGitHubStars } from "../composables/useGithubStars";
import { clearStarsCache } from "../utils/githubCache";
import data from "../../data.json";

const searchTerm = ref("");
const selectedTag = ref("");
const sortBy = ref("stars");
const showFilters = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

const { projects, isLoading, rateLimit, refreshStars } = useGitHubStars(
    data.projects,
);

// Get unique tags from all projects
const allTags = [...new Set(data.projects.flatMap((project) => project.tags))];

const filteredProjects = computed(() => {
    return projects.value.filter((project) => {
        const matchesSearch =
            project.projectName
                .toLowerCase()
                .includes(searchTerm.value.toLowerCase()) ||
            project.studentName
                .toLowerCase()
                .includes(searchTerm.value.toLowerCase()) ||
            project.description
                .toLowerCase()
                .includes(searchTerm.value.toLowerCase());
        const matchesTag =
            !selectedTag.value || project.tags.includes(selectedTag.value);
        return matchesSearch && matchesTag;
    });
});

const sortedProjects = computed(() => {
    const projectsToSort = [...filteredProjects.value];
    if (sortBy.value === "stars") {
        return projectsToSort.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    } else if (sortBy.value === "name") {
        return projectsToSort.sort((a, b) =>
            a.projectName.localeCompare(b.projectName),
        );
    }
    return projectsToSort;
});

const handleRefreshStars = () => {
    clearStarsCache();
    refreshStars();
};

const handleResize = () => {
    isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.projects-page {
    min-height: 100vh;
    margin: 0 1rem;
    font-family:
        Bricolage Grotesque,
        Poppins,
        serif;
}

@media (min-width: 768px) {
    .projects-page {
        margin: 2.5rem;
    }
}

.projects-container {
    max-width: 90rem;
    margin: 0 auto;
}

.search-filters {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

@media (min-width: 768px) {
    .search-filters {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
}

.search-container {
    flex-grow: 1;
    margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
    .search-container {
        margin-bottom: 0;
    }
}

.search-input-wrapper {
    position: relative;
    display: flex;
}

.search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
}

.search-input {
    background-color: rgba(255, 255, 247, 0.1);
    color: white;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    width: 100%;
    border: 1px solid white;
    border-radius: 0.5rem;
}

@media (min-width: 768px) {
    .search-input {
        border-radius: 0.5rem;
    }
}

.mobile-filter-toggle {
    display: block;
    padding: 0 0.75rem;
    background-color: rgba(255, 255, 247, 0.1);
    border: 1px solid white;
    border-left: none;
    border-radius: 0 0.5rem 0.5rem 0;
}

@media (min-width: 768px) {
    .mobile-filter-toggle {
        display: none;
    }
}

.filter-active {
    color: #eab308;
}

.filter-controls {
    display: none;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
}

@media (min-width: 768px) {
    .filter-controls {
        display: flex;
    }
}

.filters-visible {
    display: flex;
}

.tag-select,
.sort-select {
    padding: 0.5rem 0.75rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    color: white;
    background-color: rgba(255, 255, 247, 0.1);
    flex-grow: 1;
}

@media (min-width: 768px) {
    .tag-select,
    .sort-select {
        flex-grow: 0;
        margin-bottom: 0;
    }
}

.refresh-button {
    padding: 0.5rem 0.75rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    color: white;
    background-color: rgba(255, 255, 247, 0.1);
    flex-grow: 1;
}

@media (min-width: 768px) {
    .refresh-button {
        flex-grow: 0;
    }
}

.refresh-button:hover {
    background-color: #f3f4f6;
    color: black;
}

.refresh-content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.action-buttons {
    display: grid;
    justify-content: center;
    margin-bottom: 1rem;
    text-align: center;
}

@media (min-width: 768px) {
    .action-buttons {
        display: flex;
        justify-content: space-between;
    }
}

.spacer {
    display: none;
}

@media (min-width: 768px) {
    .spacer {
        display: block;
    }
}

.buttons-group {
    display: flex;
    gap: 0.5rem;
}

.why-button {
    display: flex;
    justify-self: center;
    align-items: center;
    gap: 0.25rem;
    height: fit-content;
    width: fit-content;
    padding: 0.5rem;
    background-color: rgba(255, 255, 247, 0.1);
    border: 1px solid white;
    border-radius: 0.375rem;
    color: white;
    text-decoration: none;
}

.add-project-button {
    display: flex;
    justify-self: center;
    align-items: center;
    gap: 0.5rem;
    height: fit-content;
    width: fit-content;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.375rem;
    color: black;
    text-decoration: none;
}

.rate-limit-warning {
    background-color: #fffbeb;
    border: 1px solid #fef08a;
    color: #92400e;
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

.warning-icon {
    color: #d97706;
    flex-shrink: 0;
    margin-top: 0.25rem;
}

.warning-text {
    font-size: 0.875rem;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16rem;
}

.spinner {
    animation: spin 1s linear infinite;
    border-radius: 9999px;
    height: 3rem;
    width: 3rem;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .projects-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
