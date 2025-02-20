import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Clock, Calendar, User } from "lucide-react"
import type { Post } from "@/lib/blog"
import Link from "next/link"

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Estimate reading time (assuming average reading speed of 200 words per minute)
  const wordCount = post.description.split(" ").length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group w-full max-w-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl border-border mb-9">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary lg:text-3xl">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base leading-relaxed">{post.description}</CardDescription>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

