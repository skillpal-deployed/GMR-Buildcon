<?php
/**
 * Single post template.
 *
 * @package gmr-buildcon
 */

get_header();

while ( have_posts() ) :
	the_post();
	$cats = get_the_category();
	?>

	<article <?php post_class(); ?>>

		<section class="page-hero">
			<div class="container container--wide">
				<div class="page-hero__inner" style="max-width:820px;">
					<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">Blog</a> / <span><?php echo esc_html( wp_trim_words( get_the_title(), 6, '…' ) ); ?></span></nav>
					<h1><?php the_title(); ?></h1>
					<div class="single-post__meta" style="color:rgba(255,255,255,.75);">
						<span><?php echo gmr_icon( 'clock', 16 ); // phpcs:ignore ?> <?php echo esc_html( get_the_date() ); ?></span>
						<?php if ( ! empty( $cats ) ) : ?>
							<span>•</span><span><?php echo esc_html( $cats[0]->name ); ?></span>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="reveal" style="max-width:980px;margin:0 auto clamp(2rem,5vw,3.5rem);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow);">
						<?php the_post_thumbnail( 'large', array( 'style' => 'width:100%;height:auto;display:block;' ) ); ?>
					</div>
				<?php endif; ?>

				<div class="single-post entry-content reveal">
					<?php
					the_content();
					wp_link_pages( array(
						'before' => '<div class="page-links">' . __( 'Pages:', 'gmr-buildcon' ),
						'after'  => '</div>',
					) );
					?>
				</div>

				<?php if ( has_tag() ) : ?>
					<div class="single-post" style="margin-top:2rem;">
						<div class="chip-grid"><?php echo get_the_tag_list( '<span class="chip">#', '</span><span class="chip">#', '</span>' ); // phpcs:ignore ?></div>
					</div>
				<?php endif; ?>

				<div class="single-post post-pagination">
					<?php
					$prev = get_previous_post();
					$next = get_next_post();
					if ( $prev ) {
						printf( '<a class="btn btn--outline" href="%s">&larr; Previous</a>', esc_url( get_permalink( $prev ) ) );
					} else { echo '<span></span>'; }
					if ( $next ) {
						printf( '<a class="btn btn--outline" href="%s">Next &rarr;</a>', esc_url( get_permalink( $next ) ) );
					} else { echo '<span></span>'; }
					?>
				</div>
			</div>
		</section>

		<?php
		// Related posts.
		$related = new WP_Query( array(
			'post_type'           => 'post',
			'posts_per_page'      => 3,
			'post__not_in'        => array( get_the_ID() ),
			'category__in'        => wp_get_post_categories( get_the_ID() ),
			'ignore_sticky_posts' => true,
		) );
		if ( $related->have_posts() ) :
			?>
			<section class="section section--cream">
				<div class="container container--wide">
					<div class="section-head center reveal">
						<span class="eyebrow">Keep Reading</span>
						<h2 class="h-lg">Related articles</h2>
					</div>
					<div class="grid post-grid">
						<?php
						$d = 1;
						while ( $related->have_posts() ) :
							$related->the_post();
							get_template_part( 'template-parts/post-card', null, array( 'delay' => $d ) );
							$d++;
						endwhile;
						?>
					</div>
				</div>
			</section>
			<?php
			wp_reset_postdata();
		endif;
		?>

	</article>

	<?php
	if ( comments_open() || get_comments_number() ) :
		?>
		<section class="section">
			<div class="container container--narrow"><?php comments_template(); ?></div>
		</section>
		<?php
	endif;
	?>

	<?php
endwhile;

get_footer();
