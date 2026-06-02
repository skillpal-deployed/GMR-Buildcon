<?php
/**
 * Project custom post type, status taxonomy, meta box, and render helpers.
 *
 * @package gmr-buildcon
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* -----------------------------------------------------------------------------
 * Register the "project" post type + "project_status" taxonomy
 * -------------------------------------------------------------------------- */
function gmr_register_project_cpt() {
	$labels = array(
		'name'               => __( 'Projects', 'gmr-buildcon' ),
		'singular_name'      => __( 'Project', 'gmr-buildcon' ),
		'add_new'            => __( 'Add New', 'gmr-buildcon' ),
		'add_new_item'       => __( 'Add New Project', 'gmr-buildcon' ),
		'edit_item'          => __( 'Edit Project', 'gmr-buildcon' ),
		'new_item'           => __( 'New Project', 'gmr-buildcon' ),
		'view_item'          => __( 'View Project', 'gmr-buildcon' ),
		'search_items'       => __( 'Search Projects', 'gmr-buildcon' ),
		'not_found'          => __( 'No projects found', 'gmr-buildcon' ),
		'not_found_in_trash' => __( 'No projects found in Trash', 'gmr-buildcon' ),
		'all_items'          => __( 'All Projects', 'gmr-buildcon' ),
		'menu_name'          => __( 'Projects', 'gmr-buildcon' ),
	);

	register_post_type( 'project', array(
		'labels'       => $labels,
		'public'       => true,
		'has_archive'  => 'projects',
		'menu_icon'    => 'dashicons-building',
		'menu_position'=> 5,
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
		'rewrite'      => array( 'slug' => 'projects', 'with_front' => false ),
		'show_in_rest' => true,
	) );

	register_taxonomy( 'project_status', 'project', array(
		'labels'            => array(
			'name'          => __( 'Project Status', 'gmr-buildcon' ),
			'singular_name' => __( 'Status', 'gmr-buildcon' ),
			'menu_name'     => __( 'Status', 'gmr-buildcon' ),
			'all_items'     => __( 'All Statuses', 'gmr-buildcon' ),
			'edit_item'     => __( 'Edit Status', 'gmr-buildcon' ),
			'add_new_item'  => __( 'Add New Status', 'gmr-buildcon' ),
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'project-status' ),
	) );
}
add_action( 'init', 'gmr_register_project_cpt' );

/* The display order of the three status groups (used on the archive). */
function gmr_status_groups() {
	return array(
		'completed' => array( 'label' => __( 'Completed', 'gmr-buildcon' ), 'count' => __( 'Delivered', 'gmr-buildcon' ) ),
		'ongoing'   => array( 'label' => __( 'Ongoing', 'gmr-buildcon' ),   'count' => __( 'Selling now', 'gmr-buildcon' ) ),
		'upcoming'  => array( 'label' => __( 'Upcoming', 'gmr-buildcon' ),  'count' => __( 'Coming soon', 'gmr-buildcon' ) ),
	);
}

/* -----------------------------------------------------------------------------
 * Meta box
 * -------------------------------------------------------------------------- */

/* Single-line text fields: key => array( label, placeholder ). */
function gmr_project_text_fields() {
	return array(
		'location'         => array( __( 'Location', 'gmr-buildcon' ), 'e.g. Jagatpura, Jaipur' ),
		'tagline'          => array( __( 'Hero tagline', 'gmr-buildcon' ), __( 'Short line shown under the project title', 'gmr-buildcon' ) ),
		'units'            => array( __( 'Total units', 'gmr-buildcon' ), 'e.g. 48' ),
		'config'           => array( __( 'Configuration', 'gmr-buildcon' ), 'e.g. 2 & 3 BHK' ),
		'ptype'            => array( __( 'Project type', 'gmr-buildcon' ), 'e.g. Apartments' ),
		'parking'          => array( __( 'Parking slots', 'gmr-buildcon' ), 'e.g. 48' ),
		'brochure'         => array( __( 'Brochure URL', 'gmr-buildcon' ), __( 'Leave blank to use the site default brochure', 'gmr-buildcon' ) ),
		'transit'          => array( __( 'Transit score', 'gmr-buildcon' ), 'e.g. 65' ),
		'map'              => array( __( 'Map location query', 'gmr-buildcon' ), 'e.g. Jagatpura, Jaipur, Rajasthan' ),
		'overview_heading' => array( __( 'Overview heading', 'gmr-buildcon' ), __( 'Headline for the overview section', 'gmr-buildcon' ) ),
	);
}

/* Multi-line textarea fields: key => array( label, help ). */
function gmr_project_textarea_fields() {
	return array(
		'overview_lead'      => array( __( 'Overview lead', 'gmr-buildcon' ), __( 'One or two intro sentences (the body goes in the main editor above).', 'gmr-buildcon' ) ),
		'configs'            => array( __( 'Configurations', 'gmr-buildcon' ), __( 'One per line as: Title | Description', 'gmr-buildcon' ) ),
		'floorplan_features' => array( __( 'Floor plan highlights', 'gmr-buildcon' ), __( 'One highlight per line.', 'gmr-buildcon' ) ),
		'am_community'       => array( __( 'Amenities — Community Spaces', 'gmr-buildcon' ), __( 'One per line as: Title | Description', 'gmr-buildcon' ) ),
		'am_infra'           => array( __( 'Amenities — Infrastructure', 'gmr-buildcon' ), __( 'One per line as: Title | Description', 'gmr-buildcon' ) ),
		'am_lifestyle'       => array( __( 'Amenities — Lifestyle', 'gmr-buildcon' ), __( 'One per line as: Title | Description', 'gmr-buildcon' ) ),
		'places'             => array( __( 'Nearby places', 'gmr-buildcon' ), __( 'One per line as: Place | Distance (e.g. Hospital | 1.5 km)', 'gmr-buildcon' ) ),
	);
}

function gmr_project_add_meta_box() {
	add_meta_box( 'gmr_project_details', __( 'Project Details', 'gmr-buildcon' ), 'gmr_project_render_meta_box', 'project', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'gmr_project_add_meta_box' );

function gmr_project_render_meta_box( $post ) {
	wp_nonce_field( 'gmr_project_save', 'gmr_project_nonce' );
	$get = function ( $key ) use ( $post ) {
		return get_post_meta( $post->ID, '_gmr_' . $key, true );
	};
	?>
	<style>
		.gmr-meta .gmr-row{margin:0 0 1.1rem}
		.gmr-meta label.gmr-label{display:block;font-weight:600;margin-bottom:.3rem}
		.gmr-meta .gmr-help{color:#666;font-weight:400;font-size:12px}
		.gmr-meta input[type=text],.gmr-meta textarea{width:100%;max-width:640px}
		.gmr-meta textarea{min-height:90px}
		.gmr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem 1.5rem;max-width:660px}
		.gmr-sec{margin:1.6rem 0 .6rem;padding-top:1rem;border-top:1px solid #e2e4e7;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#1f4a3a;font-weight:700}
		.gmr-media-preview{display:flex;flex-wrap:wrap;gap:8px;margin:.4rem 0}
		.gmr-media-preview img{width:84px;height:64px;object-fit:cover;border-radius:6px;border:1px solid #ddd}
	</style>
	<div class="gmr-meta">

		<div class="gmr-sec"><?php esc_html_e( 'Basics & specifications', 'gmr-buildcon' ); ?></div>
		<div class="gmr-grid">
			<?php foreach ( gmr_project_text_fields() as $key => $f ) : ?>
				<div class="gmr-row">
					<label class="gmr-label" for="gmr_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $f[0] ); ?></label>
					<input type="text" id="gmr_<?php echo esc_attr( $key ); ?>" name="_gmr_<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $get( $key ) ); ?>" placeholder="<?php echo esc_attr( $f[1] ); ?>">
				</div>
			<?php endforeach; ?>
		</div>

		<div class="gmr-sec"><?php esc_html_e( 'Overview, configurations & floor plan', 'gmr-buildcon' ); ?></div>
		<?php foreach ( array( 'overview_lead', 'configs', 'floorplan_features' ) as $key ) :
			$f = gmr_project_textarea_fields()[ $key ]; ?>
			<div class="gmr-row">
				<label class="gmr-label" for="gmr_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $f[0] ); ?> <span class="gmr-help">— <?php echo esc_html( $f[1] ); ?></span></label>
				<textarea id="gmr_<?php echo esc_attr( $key ); ?>" name="_gmr_<?php echo esc_attr( $key ); ?>"><?php echo esc_textarea( $get( $key ) ); ?></textarea>
			</div>
		<?php endforeach; ?>

		<div class="gmr-row">
			<label class="gmr-label"><?php esc_html_e( 'Floor plan image', 'gmr-buildcon' ); ?></label>
			<?php gmr_media_field( 'floorplan', $get( 'floorplan' ), false ); ?>
		</div>

		<div class="gmr-sec"><?php esc_html_e( 'Amenities (each line: Title | Description)', 'gmr-buildcon' ); ?></div>
		<?php foreach ( array( 'am_community', 'am_infra', 'am_lifestyle' ) as $key ) :
			$f = gmr_project_textarea_fields()[ $key ]; ?>
			<div class="gmr-row">
				<label class="gmr-label" for="gmr_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $f[0] ); ?></label>
				<textarea id="gmr_<?php echo esc_attr( $key ); ?>" name="_gmr_<?php echo esc_attr( $key ); ?>"><?php echo esc_textarea( $get( $key ) ); ?></textarea>
			</div>
		<?php endforeach; ?>

		<div class="gmr-sec"><?php esc_html_e( 'Location & connectivity', 'gmr-buildcon' ); ?></div>
		<div class="gmr-row">
			<label class="gmr-label" for="gmr_places"><?php esc_html_e( 'Nearby places', 'gmr-buildcon' ); ?> <span class="gmr-help">— <?php esc_html_e( 'One per line as: Place | Distance', 'gmr-buildcon' ); ?></span></label>
			<textarea id="gmr_places" name="_gmr_places"><?php echo esc_textarea( $get( 'places' ) ); ?></textarea>
		</div>

		<div class="gmr-sec"><?php esc_html_e( 'Gallery', 'gmr-buildcon' ); ?></div>
		<div class="gmr-row">
			<label class="gmr-label"><?php esc_html_e( 'Gallery images', 'gmr-buildcon' ); ?> <span class="gmr-help">— <?php esc_html_e( 'The featured image is used for the hero; these fill the gallery grid.', 'gmr-buildcon' ); ?></span></label>
			<?php gmr_media_field( 'gallery', $get( 'gallery' ), true ); ?>
		</div>

	</div>
	<?php
}

/* Renders a media picker (single or multiple). Value is a CSV of attachment IDs. */
function gmr_media_field( $key, $value, $multiple = false ) {
	$ids = array_filter( array_map( 'absint', explode( ',', (string) $value ) ) );
	?>
	<div class="gmr-media-field" data-multiple="<?php echo $multiple ? '1' : '0'; ?>">
		<input type="hidden" class="gmr-media-ids" name="_gmr_<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( implode( ',', $ids ) ); ?>">
		<div class="gmr-media-preview">
			<?php foreach ( $ids as $id ) :
				$thumb = wp_get_attachment_image_url( $id, 'thumbnail' );
				if ( $thumb ) :
					?><img src="<?php echo esc_url( $thumb ); ?>" alt=""><?php
				endif;
			endforeach; ?>
		</div>
		<button type="button" class="button gmr-media-select"><?php echo $multiple ? esc_html__( 'Select images', 'gmr-buildcon' ) : esc_html__( 'Select image', 'gmr-buildcon' ); ?></button>
		<button type="button" class="button gmr-media-clear"><?php esc_html_e( 'Clear', 'gmr-buildcon' ); ?></button>
	</div>
	<?php
}

function gmr_project_save_meta( $post_id ) {
	if ( ! isset( $_POST['gmr_project_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['gmr_project_nonce'] ) ), 'gmr_project_save' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	foreach ( array_keys( gmr_project_text_fields() ) as $key ) {
		$raw = isset( $_POST[ '_gmr_' . $key ] ) ? wp_unslash( $_POST[ '_gmr_' . $key ] ) : '';
		$val = ( 'brochure' === $key ) ? esc_url_raw( $raw ) : sanitize_text_field( $raw );
		update_post_meta( $post_id, '_gmr_' . $key, $val );
	}

	foreach ( array_keys( gmr_project_textarea_fields() ) as $key ) {
		$val = isset( $_POST[ '_gmr_' . $key ] ) ? sanitize_textarea_field( wp_unslash( $_POST[ '_gmr_' . $key ] ) ) : '';
		update_post_meta( $post_id, '_gmr_' . $key, $val );
	}

	foreach ( array( 'floorplan', 'gallery' ) as $key ) {
		$raw = isset( $_POST[ '_gmr_' . $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ '_gmr_' . $key ] ) ) : '';
		$ids = array_filter( array_map( 'absint', explode( ',', $raw ) ) );
		update_post_meta( $post_id, '_gmr_' . $key, implode( ',', $ids ) );
	}
}
add_action( 'save_post_project', 'gmr_project_save_meta' );

/* Admin assets — media picker, only on the project editor screen. */
function gmr_project_admin_assets( $hook ) {
	if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
		return;
	}
	if ( 'project' !== get_post_type() ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'gmr-admin', get_template_directory_uri() . '/assets/js/admin.js', array( 'jquery' ), GMR_VERSION, true );
}
add_action( 'admin_enqueue_scripts', 'gmr_project_admin_assets' );

/* -----------------------------------------------------------------------------
 * Shared helpers
 * -------------------------------------------------------------------------- */

/* Split a textarea into trimmed, non-empty lines. */
function gmr_parse_lines( $text ) {
	$out = array();
	foreach ( preg_split( '/\r\n|\r|\n/', (string) $text ) as $line ) {
		$line = trim( $line );
		if ( '' !== $line ) {
			$out[] = $line;
		}
	}
	return $out;
}

/* Split a "Title | Description" line into [title, description]. */
function gmr_split_pipe( $line ) {
	$parts = array_map( 'trim', explode( '|', $line, 2 ) );
	return array( $parts[0], isset( $parts[1] ) ? $parts[1] : '' );
}

/* Pick an amenity icon from keywords in the label. */
function gmr_guess_icon( $label, $default = 'sparkle' ) {
	$label = strtolower( $label );
	$map = array(
		'water' => 'drop', 'rain' => 'leaf', 'fire' => 'flame', 'storm' => 'waves',
		'drain' => 'waves', 'infrastruct' => 'road', 'internal' => 'road', 'road' => 'road',
		'access' => 'road', 'power' => 'bolt', 'electric' => 'bolt', 'backup' => 'bolt',
		'club' => 'sparkle', 'common' => 'sparkle', 'garden' => 'tree', 'landscap' => 'tree',
		'green' => 'tree', 'play' => 'play', 'child' => 'play', 'kid' => 'play',
		'jog' => 'run', 'walk' => 'run', 'track' => 'run', 'security' => 'cctv',
		'surveillanc' => 'cctv', 'cctv' => 'cctv', 'camera' => 'cctv', 'party' => 'star',
		'event' => 'star', 'serene' => 'leaf', 'setting' => 'leaf',
	);
	foreach ( $map as $needle => $icon ) {
		if ( false !== strpos( $label, $needle ) ) {
			return $icon;
		}
	}
	return $default;
}

/* Pick a location icon from keywords in the place name. */
function gmr_guess_place_icon( $label ) {
	$label = strtolower( $label );
	$map = array(
		'universi' => 'cap', 'college' => 'cap', 'school' => 'cap', 'hospital' => 'cross',
		'clinic' => 'cross', 'medical' => 'cross', 'railway' => 'train', 'train' => 'train',
		'metro' => 'train', 'bus' => 'bus', 'bank' => 'bank', 'atm' => 'bank',
		'airport' => 'plane', 'park' => 'park',
	);
	foreach ( $map as $needle => $icon ) {
		if ( false !== strpos( $label, $needle ) ) {
			return $icon;
		}
	}
	return 'pin';
}

/* Permalink of the primary (Ongoing) project, for homepage CTAs. */
function gmr_primary_project_url() {
	$q = new WP_Query( array(
		'post_type'      => 'project',
		'posts_per_page' => 1,
		'no_found_rows'  => true,
		'fields'         => 'ids',
		'tax_query'      => array( array(
			'taxonomy' => 'project_status',
			'field'    => 'slug',
			'terms'    => 'ongoing',
		) ),
	) );
	if ( ! empty( $q->posts ) ) {
		return get_permalink( $q->posts[0] );
	}
	$archive = get_post_type_archive_link( 'project' );
	return $archive ? $archive : home_url( '/projects/' );
}

/* Hero / overview image: featured image, else a bundled fallback (seeded projects). */
function gmr_project_hero_url( $id ) {
	$src = get_the_post_thumbnail_url( $id, 'full' );
	if ( $src ) {
		return $src;
	}
	$fb = get_post_meta( $id, '_gmr_hero_fallback', true );
	return $fb ? get_template_directory_uri() . '/assets/images/' . $fb : '';
}

/* Floor plan image: chosen attachment, else bundled fallback. */
function gmr_project_floorplan_url( $id ) {
	$aid = absint( get_post_meta( $id, '_gmr_floorplan', true ) );
	if ( $aid ) {
		$src = wp_get_attachment_image_url( $aid, 'large' );
		if ( $src ) {
			return $src;
		}
	}
	$fb = get_post_meta( $id, '_gmr_floorplan_fallback', true );
	return $fb ? get_template_directory_uri() . '/assets/images/' . $fb : '';
}

/* Gallery image URLs: chosen attachments, else bundled fallbacks. */
function gmr_project_gallery_urls( $id ) {
	$urls    = array();
	$gallery = get_post_meta( $id, '_gmr_gallery', true );
	if ( $gallery ) {
		foreach ( array_filter( array_map( 'absint', explode( ',', $gallery ) ) ) as $aid ) {
			$src = wp_get_attachment_image_url( $aid, 'large' );
			if ( $src ) {
				$urls[] = $src;
			}
		}
	}
	if ( empty( $urls ) ) {
		$fb = get_post_meta( $id, '_gmr_gallery_fallback', true );
		if ( $fb ) {
			foreach ( array_filter( array_map( 'trim', explode( ',', $fb ) ) ) as $file ) {
				$urls[] = get_template_directory_uri() . '/assets/images/' . $file;
			}
		}
	}
	return $urls;
}

/* -----------------------------------------------------------------------------
 * Render helpers used by the templates
 * -------------------------------------------------------------------------- */

/* A single project card for the archive listing. Call inside the loop. */
function gmr_render_project_card( $status = '' ) {
	$id          = get_the_ID();
	$location    = get_post_meta( $id, '_gmr_location', true );
	$units       = get_post_meta( $id, '_gmr_units', true );
	$config      = get_post_meta( $id, '_gmr_config', true );
	$is_sample   = (bool) get_post_meta( $id, '_gmr_sample', true );
	$is_upcoming = ( 'upcoming' === $status );

	$img = get_the_post_thumbnail_url( $id, 'gmr-card' );
	if ( ! $img ) {
		$fb = get_post_meta( $id, '_gmr_hero_fallback', true );
		if ( $fb ) {
			$img = get_template_directory_uri() . '/assets/images/' . $fb;
		}
	}

	$href      = ( $is_upcoming && $is_sample ) ? home_url( '/contact/' ) : get_permalink( $id );
	$cta_label = $is_upcoming ? __( 'Register interest', 'gmr-buildcon' ) : __( 'View project', 'gmr-buildcon' );
	?>
	<a class="project-card<?php echo $is_upcoming ? ' project-card--upcoming' : ''; ?> reveal" href="<?php echo esc_url( $href ); ?>">
		<div class="project-card__media">
			<?php if ( $status ) : ?>
				<span class="status-pill status-pill--<?php echo esc_attr( $status ); ?>"><?php echo esc_html( ucfirst( $status ) ); ?></span>
			<?php endif; ?>
			<?php if ( $img ) : ?>
				<img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>" loading="lazy">
			<?php endif; ?>
		</div>
		<div class="project-card__body">
			<?php if ( $location ) : ?>
				<span class="project-card__loc"><?php echo gmr_icon( 'pin', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?> <?php echo esc_html( $location ); ?></span>
			<?php endif; ?>
			<h3 class="project-card__title"><?php the_title(); ?></h3>
			<div class="project-card__meta">
				<?php if ( $units ) : ?><span><?php echo gmr_icon( 'building', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?> <?php echo esc_html( $units ); ?> <?php esc_html_e( 'Units', 'gmr-buildcon' ); ?></span><?php endif; ?>
				<?php if ( $config ) : ?><span><?php echo gmr_icon( 'home', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?> <?php echo esc_html( $config ); ?></span><?php endif; ?>
				<?php if ( $is_upcoming && ! $units && ! $config ) : ?><span><?php echo gmr_icon( 'clock', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?> <?php esc_html_e( 'Launching soon', 'gmr-buildcon' ); ?></span><?php endif; ?>
			</div>
			<span class="project-card__cta"><?php echo esc_html( $cta_label ); ?> <?php echo gmr_icon( 'arrow', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
		</div>
	</a>
	<?php
}

/* One amenities sub-group (subhead + grid). Skips itself when empty. */
function gmr_render_amenity_group( $label, $raw ) {
	$lines = gmr_parse_lines( $raw );
	if ( empty( $lines ) ) {
		return;
	}
	?>
	<div class="subhead reveal"><span class="eyebrow"><?php echo esc_html( $label ); ?></span><span class="rule"></span></div>
	<div class="grid amenity-grid">
		<?php
		$i = 1;
		foreach ( $lines as $line ) :
			list( $title, $desc ) = gmr_split_pipe( $line );
			?>
			<div class="amenity-card reveal" data-delay="<?php echo esc_attr( min( $i, 3 ) ); ?>">
				<div class="amenity-card__icon"><?php echo gmr_icon( gmr_guess_icon( $title ), 26 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
				<h3><?php echo esc_html( $title ); ?></h3>
				<?php if ( $desc ) : ?><p><?php echo esc_html( $desc ); ?></p><?php endif; ?>
			</div>
			<?php
			$i++;
		endforeach;
		?>
	</div>
	<?php
}
