<?php
/**
 * Default page template.
 *
 * @package gmr-buildcon
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="page-hero">
		<div class="container container--wide">
			<div class="page-hero__inner">
				<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <span><?php the_title(); ?></span></nav>
				<h1><?php the_title(); ?></h1>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container container--narrow">
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="reveal" style="border-radius:var(--radius-lg);overflow:hidden;margin-bottom:2.5rem;box-shadow:var(--shadow);">
					<?php the_post_thumbnail( 'large', array( 'style' => 'width:100%;height:auto;display:block;' ) ); ?>
				</div>
			<?php endif; ?>
			<div class="entry-content reveal">
				<?php
				the_content();
				wp_link_pages( array(
					'before' => '<div class="page-links">' . __( 'Pages:', 'gmr-buildcon' ),
					'after'  => '</div>',
				) );
				?>
			</div>
		</div>
	</section>

	<?php
	if ( comments_open() || get_comments_number() ) :
		?>
		<section class="section section--cream">
			<div class="container container--narrow"><?php comments_template(); ?></div>
		</section>
		<?php
	endif;

endwhile;

get_footer();
