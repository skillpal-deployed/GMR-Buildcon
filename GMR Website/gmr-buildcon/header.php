<?php
/**
 * Header template.
 *
 * @package gmr-buildcon
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'gmr-buildcon' ); ?></a>

<header class="site-header" id="site-header">
	<div class="container container--wide">
		<div class="site-header__inner">

			<?php if ( has_custom_logo() ) : ?>
				<div class="brand brand--logo"><?php the_custom_logo(); ?></div>
			<?php else : ?>
				<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?> — Home">
					<span class="brand__mark" aria-hidden="true">G</span>
					<span class="brand__text">
						<span class="brand__name">GMR Buildcon</span>
						<span class="brand__tag">Real Estate</span>
					</span>
				</a>
			<?php endif; ?>

			<nav class="primary-nav" id="primary-nav" aria-label="<?php esc_attr_e( 'Primary', 'gmr-buildcon' ); ?>">
				<?php
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_id'        => 'primary-menu',
					'menu_class'     => 'menu',
					'fallback_cb'    => 'gmr_fallback_menu',
					'depth'          => 2,
				) );
				?>
			</nav>

			<div class="header-actions">
				<a class="header-phone" href="tel:<?php echo esc_attr( gmr_info( 'phone_link' ) ); ?>">
					<?php echo gmr_icon( 'phone', 18 ); // phpcs:ignore ?>
					<span><?php echo esc_html( gmr_info( 'phone' ) ); ?></span>
				</a>
				<a class="btn btn--gold header-cta" href="<?php echo esc_url( gmr_info( 'brochure' ) ); ?>" target="_blank" rel="noopener noreferrer">
					<?php esc_html_e( 'Brochure', 'gmr-buildcon' ); ?>
					<?php echo gmr_icon( 'download', 16 ); // phpcs:ignore ?>
				</a>
				<button class="nav-toggle" id="nav-toggle" aria-label="<?php esc_attr_e( 'Toggle menu', 'gmr-buildcon' ); ?>" aria-expanded="false" aria-controls="primary-nav">
					<span class="label"><?php esc_html_e( 'Menu', 'gmr-buildcon' ); ?></span>
					<span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>
				</button>
			</div>

		</div>
	</div>
</header>
<div class="nav-backdrop" id="nav-backdrop"></div>

<main id="main">
