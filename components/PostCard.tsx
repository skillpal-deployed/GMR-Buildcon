import Link from "next/link";
import Icon from "./Icon";
import type { Post } from "@prisma/client";
import { formatDate, trimWords, stripHtml } from "@/lib/format";
import { hasImage } from "@/lib/images";

// Port of template-parts/post-card.php.
export default function PostCard({ post, delay = 1 }: { post: Post; delay?: number }) {
  const href = `/blog/${post.slug}`;
  const raw = post.excerpt?.trim() || stripHtml(post.content);
  return (
    <article className="post-card reveal" data-delay={Math.min(delay, 3)}>
      <Link className="post-card__media" href={href} tabIndex={-1} aria-hidden="true">
        {hasImage(post.featuredImage) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.featuredImage as string} alt={post.title} />
        ) : (
          <span className="ph">GMR Buildcon</span>
        )}
      </Link>
      <div className="post-card__body">
        <span className="post-card__date">{formatDate(post.publishedAt)}</span>
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p>{trimWords(raw, 20)}</p>
        <Link className="post-card__more" href={href}>
          Read More <Icon name="arrow" size={15} />
        </Link>
      </div>
    </article>
  );
}
