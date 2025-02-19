import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card";
  
import type { Post } from "@/lib/blog"
import Link from "next/link"

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className=" w-full max-w-3xl  justify-center items-center hover:scale-[1.04] transition-all rounded-xl cursor-pointer  border-muted border-[1px] border-solid px-6 py-7 mb-6 relative z-40">
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 font-semibold">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p>By {post.author}</p>
            <p>{new Date(post.date).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

