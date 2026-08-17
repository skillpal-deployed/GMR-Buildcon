import { requireSession } from "@/lib/session";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireSession();
  return (
    <>
      <h1 className="a-h1">New blog post</h1>
      <p className="a-sub">Publish an article to the blog.</p>
      <PostForm />
    </>
  );
}
