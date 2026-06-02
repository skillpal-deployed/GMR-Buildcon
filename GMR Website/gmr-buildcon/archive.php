<?php
/**
 * Archive template (category, tag, date, author).
 *
 * @package gmr-buildcon
 */

get_header();
?>

<section class="page-hero">
	<div class="container container--wide">
		<div class="page-hero__inner">
			<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">Blog</a> / <span><?php echo esc_html( wp_strip_all_tags( get_the_archive_title() ) ); ?></span></nav>
			<h1><?php the_archive_title(); ?></h1>
			<?php if ( get_the_archive_description() ) : ?>
				<p><?php echo wp_kses_post( get_the_archive_description() ); ?></p>
			<?php endif; ?>
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
			<div class="section-head center"><h2 class="h-md">Nothing found here</h2></div>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
