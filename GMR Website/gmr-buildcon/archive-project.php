<?php
/**
 * Projects archive — listing grouped into Completed / Ongoing / Upcoming.
 *
 * @package gmr-buildcon
 */

get_header();
?>

<section class="page-hero">
	<div class="container container--wide">
		<div class="page-hero__inner">
			<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'gmr-buildcon' ); ?></a> / <span><?php esc_html_e( 'Projects', 'gmr-buildcon' ); ?></span></nav>
			<h1><?php esc_html_e( 'Our Projects', 'gmr-buildcon' ); ?></h1>
			<p><?php esc_html_e( "Thoughtfully planned developments across Jaipur — explore what we've completed, what's underway now, and what's coming next.", 'gmr-buildcon' ); ?></p>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<?php
		$any = false;
		foreach ( gmr_status_groups() as $slug => $group ) :
			$q = new WP_Query( array(
				'post_type'      => 'project',
				'posts_per_page' => -1,
				'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
				'tax_query'      => array( array(
					'taxonomy' => 'project_status',
					'field'    => 'slug',
					'terms'    => $slug,
				) ),
			) );

			if ( ! $q->have_posts() ) {
				wp_reset_postdata();
				continue;
			}
			$any = true;

			$has_sample = false;
			foreach ( $q->posts as $p ) {
				if ( get_post_meta( $p->ID, '_gmr_sample', true ) ) {
					$has_sample = true;
					break;
				}
			}
			?>
			<div class="project-section">
				<div class="project-section__head reveal">
					<h2 class="h-lg"><?php echo esc_html( $group['label'] ); ?></h2>
					<span class="count"><?php echo esc_html( $group['count'] ); ?></span>
					<span class="rule"></span>
				</div>

				<?php if ( $has_sample ) : ?>
					<p class="sample-note reveal"><?php echo gmr_icon( 'info', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?> <?php esc_html_e( 'Example entries — edit or replace these under Projects in your dashboard.', 'gmr-buildcon' ); ?></p>
				<?php endif; ?>

				<div class="project-grid">
					<?php
					while ( $q->have_posts() ) :
						$q->the_post();
						gmr_render_project_card( $slug );
					endwhile;
					?>
				</div>
			</div>
			<?php
			wp_reset_postdata();
		endforeach;

		if ( ! $any ) :
			?>
			<div class="section-head center reveal">
				<h2 class="h-md"><?php esc_html_e( 'No projects yet', 'gmr-buildcon' ); ?></h2>
				<p class="lead"><?php esc_html_e( 'Add your first project under Projects → Add New.', 'gmr-buildcon' ); ?></p>
			</div>
			<?php
		endif;
		?>
	</div>
</section>

<section class="section section--tight">
	<div class="container">
		<div class="cta-banner reveal">
			<img class="cta-banner__bg" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-render.png' ); ?>" alt="" aria-hidden="true" loading="lazy">
			<span class="eyebrow"><?php esc_html_e( 'Find your next home', 'gmr-buildcon' ); ?></span>
			<h2><?php esc_html_e( 'Interested in a GMR Buildcon project?', 'gmr-buildcon' ); ?></h2>
			<p><?php esc_html_e( "Book a site visit, download a brochure, or talk to our team — we'll help you find the home that fits your life.", 'gmr-buildcon' ); ?></p>
			<div class="cta-banner__actions">
				<a class="btn btn--gold" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Schedule a Tour', 'gmr-buildcon' ); ?> <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
				<a class="btn btn--ghost-light" href="<?php echo esc_url( gmr_info( 'brochure' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Download Brochure', 'gmr-buildcon' ); ?></a>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
