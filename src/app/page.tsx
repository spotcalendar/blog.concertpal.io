// Import the BlogCard component for displaying individual blog posts
// Import the function to fetch blog posts data
import { getBlogPosts } from "@/lib/blog"
import { BlogList } from "@/components/blog-list"

/**
 * Home page component that displays a list of blog posts
 * This is a server component that fetches blog posts data and renders them
 */
export default async function Home() {
  // Fetch all blog posts data
  const posts = await getBlogPosts()
  return (
    <>
      {/* Main container with top padding */}
      <div className="pt-14">
        {/* Page title */}
        <h1 className="text-4xl font-bold mb-8 flex justify-center items-center">Blog Posts</h1>
        <BlogList posts={posts} />
      </div>
    </>
  )
}
