<?php
/**
 * One-time content seeding + rewrite flush on theme activation.
 *
 * Creates the status terms, the Redwood Utopia project (fully populated),
 * a few clearly-labelled sample projects, and the About / Contact / Blog
 * helper pages — so the site looks complete the moment the theme is active.
 * Everything is editable in the dashboard afterwards.
 *
 * @package gmr-buildcon
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function gmr_after_switch_theme() {
	gmr_register_project_cpt();
	gmr_seed_status_terms();
	gmr_seed_projects();
	gmr_seed_pages();
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'gmr_after_switch_theme' );

function gmr_seed_status_terms() {
	$terms = array(
		'completed' => __( 'Completed', 'gmr-buildcon' ),
		'ongoing'   => __( 'Ongoing', 'gmr-buildcon' ),
		'upcoming'  => __( 'Upcoming', 'gmr-buildcon' ),
	);
	foreach ( $terms as $slug => $name ) {
		if ( ! term_exists( $slug, 'project_status' ) ) {
			wp_insert_term( $name, 'project_status', array( 'slug' => $slug ) );
		}
	}
}

function gmr_seed_projects() {
	if ( get_option( 'gmr_projects_seeded' ) ) {
		return;
	}
	// Never duplicate: if any project already exists, just mark as done.
	$existing = get_posts( array(
		'post_type'      => 'project',
		'post_status'    => 'any',
		'posts_per_page' => 1,
		'fields'         => 'ids',
	) );
	if ( ! empty( $existing ) ) {
		update_option( 'gmr_projects_seeded', 1 );
		return;
	}

	// ---- Redwood Utopia (Ongoing, fully populated) ----
	$redwood = wp_insert_post( array(
		'post_type'    => 'project',
		'post_status'  => 'publish',
		'post_title'   => 'Redwood Utopia',
		'post_name'    => 'redwood-utopia',
		'post_excerpt' => 'A thoughtfully planned 2 & 3 BHK low-rise development in Jagatpura, Jaipur.',
		'post_content' => 'Spread across approximately 0.29 acres, Redwood Utopia is a low-density project with just 48 exclusive units — ensuring a more private and peaceful living experience. The development features well-designed 2 & 3 BHK apartments, with smart layouts that maximize space, ventilation, and natural light.',
	) );

	if ( $redwood && ! is_wp_error( $redwood ) ) {
		wp_set_object_terms( $redwood, 'ongoing', 'project_status' );
		$meta = array(
			'_gmr_location'           => 'Jagatpura, Jaipur',
			'_gmr_tagline'            => 'A thoughtfully planned residential development in the fast-growing locality of Jagatpura, Jaipur.',
			'_gmr_units'              => '~48',
			'_gmr_config'             => '2 & 3 BHK',
			'_gmr_ptype'              => 'Apartments',
			'_gmr_parking'            => '48',
			'_gmr_transit'            => '65',
			'_gmr_map'                => 'Jagatpura, Jaipur, Rajasthan',
			'_gmr_overview_heading'   => 'Comfort, connectivity & practicality in perfect balance',
			'_gmr_overview_lead'      => 'Designed for modern urban living, Redwood Utopia is an ideal choice for both homeowners and investors.',
			'_gmr_configs'            => "2 BHK Apartments | Efficiently planned two-bedroom homes with spacious living & dining areas, a smart kitchen and utility layout, and balconies for light and ventilation.\n3 BHK Apartments | Generous three-bedroom homes designed for privacy and comfort, with well-spaced rooms, ample natural light, and smooth movement across the floor.",
			'_gmr_floorplan_features' => "Central lift & staircase core\nWell-spaced units for privacy\nEfficient use of space\nBalconies for light & ventilation\nSpacious living & dining areas\nSmart kitchen + utility layout\nBedrooms designed for privacy\nSmooth movement across the floor\nBetter natural light & airflow\nLess crowding, more comfort\nDesigned for real family living",
			'_gmr_am_community'       => "Common Areas | Thoughtfully designed common areas that enhance everyday living, offering residents a comfortable and functional environment for relaxation and interaction.\nSeamless Access | Built with a focus on practicality, the project ensures seamless access to daily necessities through efficient planning and reliable infrastructure.\nSerene Setting | Surrounded by a calm and well-organized setting, Utopia provides a serene atmosphere ideal for modern urban living.",
			'_gmr_am_infra'           => "24x7 Water Supply | Continuous and reliable water availability for a hassle-free lifestyle.\nRainwater Harvesting System | Sustainable infrastructure designed for efficient water management.\nFire Safety Systems | Equipped with essential fire protection measures ensuring resident safety.\nStorm Water Drainage | Proper drainage systems to maintain hygiene and prevent waterlogging.\nWell-Developed Internal Infrastructure | Smooth internal planning for easy movement and daily convenience.\nPower Backup for Common Areas | Ensuring uninterrupted functioning of essential services and common spaces.",
			'_gmr_am_lifestyle'       => "Clubhouse | Clubhouse with recreational facilities for residents.\nLandscaped Gardens | Landscaped gardens and open green spaces throughout.\nChildren's Play Zone | A safe, dedicated play area for the little ones.\nJogging & Walking Tracks | Tracks woven through the development for an active lifestyle.\n24/7 Security | Round-the-clock security and surveillance for peace of mind.\nParty / Event Area | A common area for parties, gatherings, and community events.",
			'_gmr_places'             => "University / College | 1.0 km\nHospital | 1.5 km\nRailway Station | 1.0 km\nBus Station | 1.5 km\nBank / ATM | 0.3 km\nAirport | 2.0 km\nChildren's Parks | 0.3 km",
			'_gmr_hero_fallback'      => 'hero-render.png',
			'_gmr_floorplan_fallback' => 'floor-plan.png',
			'_gmr_gallery_fallback'   => 'hero-render.png,photo-1.jpg,photo-2.jpg,photo-3.jpg',
		);
		foreach ( $meta as $k => $v ) {
			update_post_meta( $redwood, $k, $v );
		}
	}

	// ---- Sample projects (clearly labelled; client edits or deletes) ----
	$samples = array(
		array( 'Maple Residency', 'completed', 'Jaipur, Rajasthan', '60', '2 & 3 BHK', 'photo-2.jpg' ),
		array( 'Orchid Court',    'completed', 'Jaipur, Rajasthan', '36', '2 BHK',     'photo-3.jpg' ),
		array( 'Skyline Greens',  'upcoming',  'Jaipur, Rajasthan', '',   '',          'photo-1.jpg' ),
		array( 'Green Vista',     'upcoming',  'Jaipur, Rajasthan', '',   '',          'photo-3.jpg' ),
	);
	foreach ( $samples as $s ) {
		$pid = wp_insert_post( array(
			'post_type'    => 'project',
			'post_status'  => 'publish',
			'post_title'   => $s[0],
			'post_excerpt' => 'Example project entry added by the theme — edit or delete it under Projects.',
			'post_content' => 'This is an example project entry. Edit it under Projects → All Projects with your real details and photos, or move it to Trash if you do not need it.',
		) );
		if ( $pid && ! is_wp_error( $pid ) ) {
			wp_set_object_terms( $pid, $s[1], 'project_status' );
			update_post_meta( $pid, '_gmr_location', $s[2] );
			if ( $s[3] ) {
				update_post_meta( $pid, '_gmr_units', $s[3] );
			}
			if ( $s[4] ) {
				update_post_meta( $pid, '_gmr_config', $s[4] );
			}
			update_post_meta( $pid, '_gmr_hero_fallback', $s[5] );
			update_post_meta( $pid, '_gmr_sample', 1 );
		}
	}

	update_option( 'gmr_projects_seeded', 1 );
}

/* Create About / Contact / Blog helper pages if they don't already exist. */
function gmr_seed_pages() {
	if ( get_option( 'gmr_pages_seeded' ) ) {
		return;
	}

	$pages = array(
		'about'   => array( 'About Us', 'template-about.php' ),
		'contact' => array( 'Contact', 'template-contact.php' ),
		'blog'    => array( 'Blog', '' ),
	);
	foreach ( $pages as $slug => $p ) {
		if ( get_page_by_path( $slug ) ) {
			continue;
		}
		$page_id = wp_insert_post( array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $p[0],
			'post_name'    => $slug,
			'post_content' => '',
		) );
		if ( $page_id && ! is_wp_error( $page_id ) && $p[1] ) {
			update_post_meta( $page_id, '_wp_page_template', $p[1] );
		}
	}

	update_option( 'gmr_pages_seeded', 1 );
}
