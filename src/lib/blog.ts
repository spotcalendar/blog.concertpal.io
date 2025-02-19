import matter from "gray-matter"

export interface Post {
  slug: string
  title: string
  description: string
  author: string
  date: string
  content: string
}

const GITHUB_REPO = "spotcalendar/Blogpost"
const GITHUB_BRANCH = "main"

// List of known MDX files (consider fetching dynamically)
const mdxFiles = ["concertpal.mdx", "blog.mdx", "track.mdx"]

export async function getBlogPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const response = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${fileName}`
      )

      if (!response.ok) {
        console.error(`Failed to fetch ${fileName}:`, response.statusText)
        return null
      }

      const content = await response.text()

      try {
        const { data: frontmatter, content: mdxContent } = matter(content)

        return {
          slug: fileName.replace(/\.mdx$/, ""),
          title: frontmatter.title || "Untitled",
          description: frontmatter.description || "",
          author: frontmatter.author || "Anonymous",
          date: frontmatter.date
            ? new Date(frontmatter.date).toISOString()
            : new Date().toISOString(),
          content: mdxContent,
        }
      } catch (error) {
        console.error(`Failed to parse ${fileName}:`, error)
        return null
      }
    })
  )

  // Filter out null results and sort by date
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Fetch a single blog post directly
export async function getBlogPost(slug: string): Promise<Post | null> {
  const fileName = `${slug}.mdx`
  const response = await fetch(
    `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${fileName}`
  )

  if (!response.ok) {
    console.error(`Failed to fetch ${fileName}:`, response.statusText)
    return null
  }

  const content = await response.text()

  try {
    const { data: frontmatter, content: mdxContent } = matter(content)

    return {
      slug,
      title: frontmatter.title || "Untitled",
      description: frontmatter.description || "",
      author: frontmatter.author || "Anonymous",
      date: frontmatter.date
        ? new Date(frontmatter.date).toISOString()
        : new Date().toISOString(),
      content: mdxContent,
    }
  } catch (error) {
    console.error(`Failed to parse ${fileName}:`, error)
    return null
  }
}
