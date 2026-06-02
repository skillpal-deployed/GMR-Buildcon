<?php
/**
 * Main template — blog listing fallback.
 *
 * @package gmr-buildcon
 */

get_header();
?>

<section class="page-hero">
	<div class="container container--wide">
		<div class="page-hero__inner">
			<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <span>Blog</span></nav>
			<h1>Blog &amp; Insights</h1>
			<p>Market trends, buying guides, and the latest on Jagatpura real estate &amp; Redwood Utopia.</p>
		</div>
	</div>
</section>

<section class="section">
	<div class="container container--wide">
		<?php if ( have_posts() ) : ?>
			<div class="grid post-grid">
				<?php
				$d = 1;
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/post-card', null, array( 'delay' => $d ) );
					$d = $d > 3 ? 1 : $d + 1;
				endwhile;
				?>
			</div>

			<?php
			the_posts_pagination( array(
				'mid_size'  => 1,
				'prev_text' => __( 'Prev', 'gmr-buildcon' ),
				'next_text' => __( 'Next', 'gmr-buildcon' ),
			) );
			?>
		<?php else : ?>
			<div class="section-head center reveal">
				<h2 class="h-md">No posts yet</h2>
				<p class="lead">Check back soon for market insights and project updates.</p>
				<p style="margin-top:1.5rem;"><a class="btn btn--gold" href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to Home</a></p>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
