import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Market trends, buying guides, and the latest on Jagatpura real estate.",
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const { posts, totalPages } = await getPosts(page);

  return (
    <>
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link> / <span>Blog</span>
            </nav>
            <h1>Blog &amp; Insights</h1>
            <p>
              Market trends, buying guides, and the latest on Jagatpura real estate &amp; Redwood
              Utopia.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          {posts.length > 0 ? (
            <>
              <div className="grid post-grid">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} delay={(i % 3) + 1} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Posts navigation" style={{ marginTop: "clamp(2.5rem,5vw,3.5rem)" }}>
                  <div className="nav-links" style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    {page > 1 && (
                      <Link className="page-numbers prev" href={`/blog?page=${page - 1}`}>
                        Prev
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
                      n === page ? (
                        <span className="page-numbers current" key={n} aria-current="page">
                          {n}
                        </span>
                      ) : (
                        <Link className="page-numbers" href={`/blog?page=${n}`} key={n}>
                          {n}
                        </Link>
                      )
                    )}
                    {page < totalPages && (
                      <Link className="page-numbers next" href={`/blog?page=${page + 1}`}>
                        Next
                      </Link>
                    )}
                  </div>
                </nav>
              )}
            </>
          ) : (
            <div className="section-head center reveal">
              <h2 className="h-md">No posts yet</h2>
              <p className="lead">Check back soon for market insights and project updates.</p>
              <p style={{ marginTop: "1.5rem" }}>
                <Link className="btn btn--gold" href="/">
                  Back to Home
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
