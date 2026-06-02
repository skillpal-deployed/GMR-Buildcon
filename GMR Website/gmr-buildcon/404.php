<?php
/**
 * 404 template.
 *
 * @package gmr-buildcon
 */

get_header();
?>

<section class="page-hero" style="min-height:60vh;display:flex;align-items:center;">
	<div class="container container--wide">
		<div class="page-hero__inner" style="max-width:640px;">
			<span class="hero__eyebrow">Error 404</span>
			<h1 style="font-size:clamp(3rem,8vw,5rem);">Page not found</h1>
			<p>The page you're looking for may have moved or no longer exists. Let's get you back home.</p>
			<div class="hero__cta" style="margin-top:2rem;">
				<a class="btn btn--gold" href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to Home <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a>
				<a class="btn btn--ghost-light" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact Us</a>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="container container--narrow reveal" style="text-align:center;">
		<h2 class="h-md" style="margin-bottom:1.5rem;">Search the site</h2>
		<?php get_search_form(); ?>
	</div>
</section>

<?php
get_footer();
