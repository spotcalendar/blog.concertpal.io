import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

// Generate static paths for SSG (Static Site Generation)
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Page Component
export default async function BlogPostPage({
  params,
}: {
  params?: { slug?: string }
}) {
  if (!params?.slug) {
    notFound()
  }

  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto py-8 prose prose-lg dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-muted-foreground mb-8">
        <p>By {post.author}</p>
        <p>{new Date(post.date).toLocaleDateString()}</p>
      </div>
      <MDXRemote source={post.content}  />
    </article>
  )
}
