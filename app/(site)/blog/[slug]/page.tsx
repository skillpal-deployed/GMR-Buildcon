import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import PostCard from "@/components/PostCard";
import { getPostBySlug, getAdjacentPosts, getRecentPosts } from "@/lib/data";
import { formatDate, trimWords, renderContentHtml, stripHtml } from "@/lib/format";
import { hasImage } from "@/lib/images";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt?.trim() || trimWords(stripHtml(post.content), 30),
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = await getAdjacentPosts(post);
  const related = await getRecentPosts(3, post.id);

  return (
    <article>
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner" style={{ maxWidth: "820px" }}>
            <nav className="breadcrumb">
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> /{" "}
              <span>{trimWords(post.title, 6)}</span>
            </nav>
            <h1>{post.title}</h1>
            <div className="single-post__meta" style={{ color: "rgba(255,255,255,.75)" }}>
              <span>
                <Icon name="clock" size={16} /> {formatDate(post.publishedAt)}
              </span>
              {post.author ? (
                <>
                  <span>•</span>
                  <span>{post.author}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {hasImage(post.featuredImage) ? (
            <div
              className="reveal"
              style={{
                maxWidth: "980px",
                margin: "0 auto clamp(2rem,5vw,3.5rem)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage as string}
                alt={post.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ) : null}

          <div
            className="single-post entry-content reveal"
            dangerouslySetInnerHTML={{ __html: renderContentHtml(post.content) }}
          />

          <div className="single-post post-pagination">
            {prev ? (
              <Link className="btn btn--outline" href={`/blog/${prev.slug}`}>
                &larr; Previous
              </Link>
            ) : (
              <span></span>
            )}
            {next ? (
              <Link className="btn btn--outline" href={`/blog/${next.slug}`}>
                Next &rarr;
              </Link>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--cream">
          <div className="container container--wide">
            <div className="section-head center reveal">
              <span className="eyebrow">Keep Reading</span>
              <h2 className="h-lg">Related articles</h2>
            </div>
            <div className="grid post-grid">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} delay={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
