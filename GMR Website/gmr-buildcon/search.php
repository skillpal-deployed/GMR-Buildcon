<?php
/**
 * Search results template.
 *
 * @package gmr-buildcon
 */

get_header();
?>

<section class="page-hero">
	<div class="container container--wide">
		<div class="page-hero__inner">
			<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <span>Search</span></nav>
			<h1>Search Results</h1>
			<p>Showing results for &ldquo;<?php echo esc_html( get_search_query() ); ?>&rdquo;</p>
		</div>
	</div>
</section>

<section class="section">
	<div class="container container--wide">
		<div class="reveal" style="max-width:520px;margin:0 auto 3rem;">
			<?php get_search_form(); ?>
		</div>

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
			<div class="section-head center"><h2 class="h-md">No results found</h2><p class="lead">Try a different search term.</p></div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
