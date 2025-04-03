import {
  getStarsFromCache,
  saveStarsToCache,
  getExpiredStarsFromCache,
  clearStarsCache,
} from "../utils/githubCache";
import { ref } from "vue";
export const useGitHubStars = (initialProjects) => {
  const projects = ref([]);
  const isLoading = ref(true);
  const rateLimit = ref(null);

  const fetchGitHubStars = async (forceRefresh = false) => {
    isLoading.value = true;

    // Process projects to add stars count
    const updatedProjects = await Promise.all(
      initialProjects.map(async (project) => {
        let stars = 0;

        if (project.githubLink) {
          try {
            const url = new URL(project.githubLink);
            const [, owner, repo] = url.pathname.split("/");

            if (owner && repo) {
              const repoKey = `${owner}/${repo}`;

              // Try to get data from cache if not forcing refresh
              if (!forceRefresh) {
                const cachedStars = getStarsFromCache(repoKey);
                if (cachedStars !== null) {
                  return { ...project, stars: cachedStars };
                }
              }

              const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}`,
              );

              const remaining = parseInt(
                response.headers.get("X-RateLimit-Remaining") || "0",
              );
              const resetTimestamp =
                parseInt(response.headers.get("X-RateLimit-Reset") || "0") *
                1000;
              const resetTime = new Date(resetTimestamp).toLocaleTimeString();

              rateLimit.value = {
                remaining,
                resetTime,
              };

              if (response.ok) {
                const data = await response.json();
                stars = data.stargazers_count;

                // Update cache for this repo
                saveStarsToCache(repoKey, stars);
              } else if (response.status === 403 && remaining === 0) {
                // If we hit rate limit, try to use expired cache if available
                const expiredStars = getExpiredStarsFromCache(repoKey);
                if (expiredStars !== null) {
                  stars = expiredStars;
                  console.warn(
                    `Rate limit exceeded. Using expired cache for ${repoKey}`,
                  );
                }
              }
            }
          } catch (error) {
            console.error(
              `Failed to fetch stars for ${project.projectName}:`,
              error,
            );
          }
        }

        return { ...project, stars };
      }),
    );

    projects.value = updatedProjects;
    isLoading.value = false;
  };

  // Initialize
  fetchGitHubStars();

  return {
    projects,
    isLoading,
    rateLimit,
    refreshStars: () => fetchGitHubStars(true),
    clearCache: clearStarsCache,
  };
};
