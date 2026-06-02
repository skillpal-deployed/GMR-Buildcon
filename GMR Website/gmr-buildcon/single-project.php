<?php
/**
 * Single project — overview, specs, configurations, floor plan,
 * amenities, location, gallery and CTA, all built from the project's meta.
 *
 * @package gmr-buildcon
 */

get_header();

while ( have_posts() ) :
	the_post();
	$id = get_the_ID();

	$location  = get_post_meta( $id, '_gmr_location', true );
	$tagline   = get_post_meta( $id, '_gmr_tagline', true );
	$units     = get_post_meta( $id, '_gmr_units', true );
	$config    = get_post_meta( $id, '_gmr_config', true );
	$ptype     = get_post_meta( $id, '_gmr_ptype', true );
	$parking   = get_post_meta( $id, '_gmr_parking', true );
	$transit   = get_post_meta( $id, '_gmr_transit', true );
	$map       = get_post_meta( $id, '_gmr_map', true );
	$ov_head   = get_post_meta( $id, '_gmr_overview_heading', true );
	$ov_lead   = get_post_meta( $id, '_gmr_overview_lead', true );
	$brochure  = get_post_meta( $id, '_gmr_brochure', true );
	$brochure  = $brochure ? $brochure : gmr_info( 'brochure' );

	$hero      = gmr_project_hero_url( $id );
	$floorplan = gmr_project_floorplan_url( $id );
	$fp_feats  = gmr_parse_lines( get_post_meta( $id, '_gmr_floorplan_features', true ) );
	$configs   = gmr_parse_lines( get_post_meta( $id, '_gmr_configs', true ) );
	$places    = gmr_parse_lines( get_post_meta( $id, '_gmr_places', true ) );
	$gallery   = gmr_project_gallery_urls( $id );

	$has_amenities = ( get_post_meta( $id, '_gmr_am_community', true ) || get_post_meta( $id, '_gmr_am_infra', true ) || get_post_meta( $id, '_gmr_am_lifestyle', true ) );
	$has_location  = ( ! empty( $places ) || $transit || $map );
	$has_specs     = ( $units || $config || $ptype || $parking );
	?>

	<article <?php post_class(); ?>>

	<!-- Hero -->
	<section class="page-hero">
		<div class="container container--wide">
			<div class="page-hero__inner">
				<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'gmr-buildcon' ); ?></a> / <a href="<?php echo esc_url( get_post_type_archive_link( 'project' ) ); ?>"><?php esc_html_e( 'Projects', 'gmr-buildcon' ); ?></a> / <span><?php the_title(); ?></span></nav>
				<h1><?php the_title(); ?></h1>
				<?php if ( $tagline ) : ?><p><?php echo esc_html( $tagline ); ?></p><?php endif; ?>
			</div>
		</div>
	</section>

	<!-- Overview -->
	<section class="section">
		<div class="container">
			<div class="split">
				<div class="split__body reveal">
					<span class="eyebrow"><?php esc_html_e( 'Project Overview', 'gmr-buildcon' ); ?></span>
					<h2 class="h-lg"><?php echo esc_html( $ov_head ? $ov_head : get_the_title() ); ?></h2>
					<?php if ( $ov_lead ) : ?><p class="lead"><?php echo esc_html( $ov_lead ); ?></p><?php endif; ?>
					<div class="entry-content"><?php the_content(); ?></div>
					<?php if ( $brochure ) : ?>
						<p style="margin-top:1.5rem;"><a class="btn btn--gold" href="<?php echo esc_url( $brochure ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Download Brochure', 'gmr-buildcon' ); ?> <?php echo gmr_icon( 'download', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a></p>
					<?php endif; ?>
				</div>
				<?php if ( $hero ) : ?>
					<div class="split__media reveal" data-delay="1">
						<div class="framed framed--wide">
							<img src="<?php echo esc_url( $hero ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>">
						</div>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<?php if ( $has_specs ) : ?>
	<!-- Specs -->
	<section class="section section--cream">
		<div class="container">
			<div class="section-head center reveal">
				<span class="eyebrow"><?php esc_html_e( 'At a Glance', 'gmr-buildcon' ); ?></span>
				<h2 class="h-lg"><?php esc_html_e( 'Project specifications', 'gmr-buildcon' ); ?></h2>
			</div>
			<div class="grid spec-grid">
				<?php
				$specs = array(
					array( $units,   'building', __( 'Total Units', 'gmr-buildcon' ) ),
					array( $config,  'home',     __( 'Configuration', 'gmr-buildcon' ) ),
					array( $ptype,   'layers',   __( 'Project Type', 'gmr-buildcon' ) ),
					array( $parking, 'car',      __( 'Parking Slots', 'gmr-buildcon' ) ),
				);
				$n = 1;
				foreach ( $specs as $spec ) :
					if ( ! $spec[0] ) {
						continue;
					}
					?>
					<div class="spec-item reveal" data-delay="<?php echo esc_attr( $n ); ?>">
						<div class="icon"><?php echo gmr_icon( $spec[1], 32 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
						<div class="val"><?php echo esc_html( $spec[0] ); ?></div>
						<div class="key"><?php echo esc_html( $spec[2] ); ?></div>
					</div>
					<?php
					$n++;
				endforeach;
				?>
			</div>
		</div>
	</section>
	<?php endif; ?>

	<?php if ( ! empty( $configs ) ) : ?>
	<!-- Configurations -->
	<section class="section">
		<div class="container">
			<div class="section-head center reveal">
				<span class="eyebrow"><?php esc_html_e( 'Configurations', 'gmr-buildcon' ); ?></span>
				<h2 class="h-lg"><?php esc_html_e( 'Homes designed for real family living', 'gmr-buildcon' ); ?></h2>
				<p class="lead"><?php esc_html_e( 'Smart layouts that maximize space, ventilation, and natural light.', 'gmr-buildcon' ); ?></p>
			</div>
			<div class="grid" style="grid-template-columns:repeat(<?php echo ( count( $configs ) > 1 ) ? 2 : 1; ?>,1fr);">
				<?php
				$c = 1;
				foreach ( $configs as $line ) :
					list( $ctitle, $cdesc ) = gmr_split_pipe( $line );
					$cicon = ( 0 === $c % 2 ) ? 'building' : 'home';
					?>
					<div class="amenity-card reveal" data-delay="<?php echo esc_attr( $c ); ?>" style="padding:clamp(2rem,4vw,3rem);">
						<div class="amenity-card__icon"><?php echo gmr_icon( $cicon, 28 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
						<h3 class="h-md" style="margin-bottom:.75rem;"><?php echo esc_html( $ctitle ); ?></h3>
						<?php if ( $cdesc ) : ?><p><?php echo esc_html( $cdesc ); ?></p><?php endif; ?>
					</div>
					<?php
					$c++;
				endforeach;
				?>
			</div>
		</div>
	</section>
	<?php endif; ?>

	<?php if ( $floorplan || ! empty( $fp_feats ) ) : ?>
	<!-- Floor plan -->
	<section class="section section--cream">
		<div class="container">
			<div class="split">
				<?php if ( $floorplan ) : ?>
					<div class="split__media reveal">
						<div class="framed framed--wide" style="background:#fff;">
							<img src="<?php echo esc_url( $floorplan ); ?>" alt="<?php echo esc_attr( get_the_title() . ' — floor plan' ); ?>" style="object-fit:contain;padding:1rem;" loading="lazy">
						</div>
					</div>
				<?php endif; ?>
				<div class="split__body reveal" data-delay="1">
					<span class="eyebrow"><?php esc_html_e( 'Floor Plan Highlights', 'gmr-buildcon' ); ?></span>
					<h2 class="h-lg"><?php esc_html_e( 'Designed for light, airflow & privacy', 'gmr-buildcon' ); ?></h2>
					<?php if ( ! empty( $fp_feats ) ) : ?>
						<ul class="feature-cols" style="margin-top:1.5rem;">
							<?php foreach ( $fp_feats as $feat ) : ?>
								<li><span class="tick"><?php echo gmr_icon( 'check', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span><?php echo esc_html( $feat ); ?></li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>
	<?php endif; ?>

	<?php if ( $has_amenities ) : ?>
	<!-- Amenities -->
	<section class="section" id="amenities">
		<div class="container">
			<div class="section-head center reveal">
				<span class="eyebrow"><?php esc_html_e( 'Amenities & Features', 'gmr-buildcon' ); ?></span>
				<h2 class="h-lg"><?php esc_html_e( 'Thoughtfully designed for everyday living', 'gmr-buildcon' ); ?></h2>
				<p class="lead"><?php esc_html_e( 'A comfortable, functional environment for relaxation and interaction — built with a focus on practicality.', 'gmr-buildcon' ); ?></p>
			</div>
			<?php
			gmr_render_amenity_group( __( 'Community Spaces', 'gmr-buildcon' ), get_post_meta( $id, '_gmr_am_community', true ) );
			gmr_render_amenity_group( __( 'Infrastructure', 'gmr-buildcon' ), get_post_meta( $id, '_gmr_am_infra', true ) );
			gmr_render_amenity_group( __( 'Lifestyle', 'gmr-buildcon' ), get_post_meta( $id, '_gmr_am_lifestyle', true ) );
			?>
		</div>
	</section>
	<?php endif; ?>

	<?php if ( $has_location ) : ?>
	<!-- Location -->
	<section class="section section--cream" id="location">
		<div class="container">
			<div class="section-head center reveal">
				<span class="eyebrow"><?php esc_html_e( 'Location & Connectivity', 'gmr-buildcon' ); ?></span>
				<h2 class="h-lg"><?php esc_html_e( 'Everything within easy reach', 'gmr-buildcon' ); ?></h2>
				<?php if ( $location ) : ?><p class="lead"><?php echo esc_html( $location ); ?> — <?php esc_html_e( 'daily necessities just minutes away.', 'gmr-buildcon' ); ?></p><?php endif; ?>
			</div>

			<?php if ( ! empty( $places ) ) : ?>
				<div class="grid loc-grid">
					<?php
					$lp = 1;
					foreach ( $places as $line ) :
						list( $plabel, $pdist ) = gmr_split_pipe( $line );
						?>
						<div class="loc-card reveal" data-delay="<?php echo esc_attr( min( $lp, 4 ) ); ?>">
							<div class="loc-card__icon"><?php echo gmr_icon( gmr_guess_place_icon( $plabel ), 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
							<div>
								<div class="dist"><?php echo esc_html( $pdist ? $pdist : $plabel ); ?></div>
								<?php if ( $pdist ) : ?><div class="place"><?php echo esc_html( $plabel ); ?></div><?php endif; ?>
							</div>
						</div>
						<?php
						$lp++;
					endforeach;
					?>
				</div>
			<?php endif; ?>

			<?php if ( $transit ) : ?>
				<div class="reveal" style="text-align:center;">
					<div class="transit-badge">
						<span class="score"><?php echo esc_html( $transit ); ?></span>
						<span class="meta"><strong><?php esc_html_e( 'Transit Score', 'gmr-buildcon' ); ?></strong> <?php esc_html_e( 'Normal Transit', 'gmr-buildcon' ); ?></span>
					</div>
				</div>
			<?php endif; ?>

			<?php if ( $map ) : ?>
				<div class="map-frame reveal" style="margin-top:clamp(2rem,4vw,3rem);">
					<iframe
						title="<?php echo esc_attr( get_the_title() . ' — ' . $map ); ?>"
						src="https://www.google.com/maps?q=<?php echo rawurlencode( $map ); ?>&output=embed"
						width="100%" height="420" style="border:0;" allowfullscreen loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			<?php endif; ?>

			<p class="reveal" style="text-align:center;margin-top:1.25rem;color:var(--muted);font-size:.9rem;">
				<?php echo gmr_icon( 'pin', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo esc_html( gmr_info( 'address' ) ); ?>
			</p>
		</div>
	</section>
	<?php endif; ?>

	<?php if ( ! empty( $gallery ) ) : ?>
	<!-- Gallery -->
	<section class="section" id="gallery">
		<div class="container">
			<div class="section-head center reveal"><span class="eyebrow"><?php esc_html_e( 'Gallery', 'gmr-buildcon' ); ?></span><h2 class="h-lg"><?php printf( esc_html__( 'A glimpse of %s', 'gmr-buildcon' ), esc_html( get_the_title() ) ); ?></h2></div>
			<div class="grid gallery reveal">
				<?php
				$gi = 0;
				foreach ( $gallery as $gurl ) :
					$cls = ( 0 === $gi ) ? 'wide tall' : ( ( 3 === $gi ) ? 'wide' : '' );
					?>
					<div class="gallery__item <?php echo esc_attr( $cls ); ?>"><img src="<?php echo esc_url( $gurl ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>" loading="lazy"></div>
					<?php
					$gi++;
				endforeach;
				?>
			</div>
		</div>
	</section>
	<?php endif; ?>

	<!-- CTA -->
	<section class="section section--tight">
		<div class="container">
			<div class="cta-banner reveal">
				<?php if ( $hero ) : ?><img class="cta-banner__bg" src="<?php echo esc_url( $hero ); ?>" alt="" aria-hidden="true" loading="lazy"><?php endif; ?>
				<h2><?php printf( esc_html__( 'Book your visit to %s', 'gmr-buildcon' ), esc_html( get_the_title() ) ); ?></h2>
				<p><?php esc_html_e( 'See the homes, the amenities, and the neighbourhood for yourself.', 'gmr-buildcon' ); ?></p>
				<div class="cta-banner__actions">
					<a class="btn btn--gold" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Schedule a Tour', 'gmr-buildcon' ); ?> <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></a>
					<?php if ( $has_amenities ) : ?><a class="btn btn--ghost-light" href="#amenities"><?php esc_html_e( 'View Amenities', 'gmr-buildcon' ); ?></a><?php endif; ?>
				</div>
			</div>
		</div>
	</section>

	</article>

	<?php
endwhile;

get_footer();
