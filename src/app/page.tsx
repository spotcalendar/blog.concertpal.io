import { BlogCard } from "@/components/blog-card"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getBlogPosts } from "@/lib/blog"

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <><Navbar /><div className=" py-14 ">
      <h1 className="text-4xl font-bold mb-8 flex justify-center items-center ">Blog Posts</h1>
      <div className="flex flex-col justify-center items-center">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
    <Footer/></>
  )
}

