<?php
/**
 * Footer template.
 *
 * @package gmr-buildcon
 */
?>
</main><!-- #main -->

<footer class="site-footer">
	<div class="container container--wide">

		<div class="footer-top">

			<div class="footer-col footer-brand">
				<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<span class="brand__mark" aria-hidden="true">G</span>
					<span class="brand__text">
						<span class="brand__name">GMR Buildcon</span>
						<span class="brand__tag">Real Estate</span>
					</span>
				</a>
				<p class="footer-about">A symbol of trust, quality, and innovation in real estate — crafting thoughtfully designed homes and lifestyle experiences in Jaipur.</p>
				<?php gmr_social_links(); ?>
			</div>

			<div class="footer-col">
				<h4><?php esc_html_e( 'Explore', 'gmr-buildcon' ); ?></h4>
				<ul>
					<?php $gmr_archive = get_post_type_archive_link( 'project' ); ?>
					<li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About Us', 'gmr-buildcon' ); ?></a></li>
					<li><a href="<?php echo esc_url( gmr_primary_project_url() ); ?>"><?php esc_html_e( 'Redwood Utopia', 'gmr-buildcon' ); ?></a></li>
					<li><a href="<?php echo esc_url( $gmr_archive ? $gmr_archive : home_url( '/projects/' ) ); ?>"><?php esc_html_e( 'All Projects', 'gmr-buildcon' ); ?></a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4><?php esc_html_e( 'Resources', 'gmr-buildcon' ); ?></h4>
				<ul>
					<li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Blog & Insights', 'gmr-buildcon' ); ?></a></li>
					<li><a href="<?php echo esc_url( gmr_info( 'brochure' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Download Brochure', 'gmr-buildcon' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Schedule a Tour', 'gmr-buildcon' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact', 'gmr-buildcon' ); ?></a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4><?php esc_html_e( 'Get in Touch', 'gmr-buildcon' ); ?></h4>
				<ul class="footer-contact">
					<li><?php echo gmr_icon( 'pin', 18 ); // phpcs:ignore ?><span><?php echo esc_html( gmr_info( 'address' ) ); ?></span></li>
					<li><?php echo gmr_icon( 'phone', 18 ); // phpcs:ignore ?><a href="tel:<?php echo esc_attr( gmr_info( 'phone_link' ) ); ?>"><?php echo esc_html( gmr_info( 'phone' ) ); ?></a></li>
					<li><?php echo gmr_icon( 'mail', 18 ); // phpcs:ignore ?><a href="mailto:<?php echo esc_attr( gmr_info( 'email' ) ); ?>"><?php echo esc_html( gmr_info( 'email' ) ); ?></a></li>
				</ul>
			</div>

		</div>

		<div class="footer-bottom">
			<p>&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> GMR Buildcon. <?php esc_html_e( 'All Rights Reserved.', 'gmr-buildcon' ); ?></p>
			<nav aria-label="<?php esc_attr_e( 'Footer', 'gmr-buildcon' ); ?>">
				<?php
				if ( has_nav_menu( 'footer' ) ) {
					wp_nav_menu( array(
						'theme_location' => 'footer',
						'container'      => false,
						'menu_class'     => 'footer-bottom-menu',
						'depth'          => 1,
					) );
				} else {
					echo '<span>Symbol of trust, quality &amp; innovation in real estate.</span>';
				}
				?>
			</nav>
		</div>

	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
