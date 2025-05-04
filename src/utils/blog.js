import MarkdownIt from "markdown-it";
import matter from "gray-matter";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export async function getPostList() {
  const posts = [];
  const markdownFiles = import.meta.glob("../assets/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  for (const path in markdownFiles) {
    const fileContent = markdownFiles[path];
    const filename = path.split("/").pop().replace(".md", "");
    const { data, content } = matter(fileContent);

    posts.push({
      slug: filename,
      title: data.title,
      date: data.date,
      description: data.description,
      coverImage: data.coverImage || null,
      author: data.author || "Core Team Member",
      content: md.render(content),
    });
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getPostList();
  return posts.find((post) => post.slug === slug);
}
