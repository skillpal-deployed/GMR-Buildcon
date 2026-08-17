import { notFound } from "next/navigation";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import PostForm, { type PostFormValues } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) notFound();

  const initial: Partial<PostFormValues> = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content,
    featuredImage: post.featuredImage || "",
    author: post.author,
    status: post.status === "draft" ? "draft" : "published",
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
  };

  return (
    <>
      <h1 className="a-h1">Edit post</h1>
      <p className="a-sub">/{post.slug}</p>
      <PostForm initial={initial} postId={post.id} />
    </>
  );
}
