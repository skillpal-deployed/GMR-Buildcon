<?php
/**
 * Template Name: About
 *
 * @package gmr-buildcon
 */

get_header();
?>

<section class="page-hero">
	<div class="container container--wide">
		<div class="page-hero__inner">
			<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <span>About</span></nav>
			<h1>About GMR Buildcon</h1>
			<p>A symbol of trust, quality, and innovation in the real estate space.</p>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="split">
			<div class="split__media reveal">
				<div class="framed">
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/photo-1.jpg' ); ?>" alt="Interior of a GMR Buildcon home" width="1280" height="853">
				</div>
				<div class="media-badge"><div class="num">Vision</div><div class="txt">Behind every landmark development</div></div>
			</div>
			<div class="split__body reveal" data-delay="1">
				<span class="eyebrow">Who We Are</span>
				<h2 class="h-lg">Building more than structures — building lifestyles</h2>
				<p class="lead">At the heart of every landmark development is a vision, and GMR Buildcon stands as a symbol of trust, quality, and innovation in the real estate space.</p>
				<p>With a strong track record of delivering thoughtfully designed residential and commercial projects, we bring precision and care to everything we build. Our developments are not just structures, but lifestyle experiences designed around the people who call them home.</p>
			</div>
		</div>
	</div>
</section>

<section class="section section--cream">
	<div class="container">
		<div class="section-head center reveal">
			<span class="eyebrow">Our Commitment</span>
			<h2 class="h-lg">What drives every GMR development</h2>
		</div>
		<div class="grid amenity-grid">
			<?php
			$values = array(
				array( 'clock',   'Timely Delivery', 'We respect your time and trust — projects delivered on schedule, without compromise.' ),
				array( 'shield',  'Premium Quality', 'Premium construction quality and materials built to stand the test of time.' ),
				array( 'star',    'Customer-Centric', 'A customer-first approach at every stage, from booking to possession and beyond.' ),
				array( 'leaf',    'Sustainable Living', 'Modern architecture paired with sustainable, future-ready living environments.' ),
			);
			$i = 1;
			foreach ( $values as $v ) :
				?>
				<div class="amenity-card reveal" data-delay="<?php echo esc_attr( min( $i, 4 ) ); ?>">
					<div class="amenity-card__icon"><?php echo gmr_icon( $v[0], 26 ); // phpcs:ignore ?></div>
					<h3><?php echo esc_html( $v[1] ); ?></h3>
					<p><?php echo esc_html( $v[2] ); ?></p>
				</div>
				<?php
				$i++;
			endforeach;
			?>
		</div>
	</div>
</section>

<?php
// Optional: render any content added in the WP page editor.
while ( have_posts() ) :
	the_post();
	if ( trim( get_the_content() ) ) :
		?>
		<section class="section">
			<div class="container container--narrow entry-content reveal">
				<?php the_content(); ?>
			</div>
		</section>
		<?php
	endif;
endwhile;
?>

<section class="section section--tight">
	<div class="container">
		<div class="cta-banner reveal">
			<img class="cta-banner__bg" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-render.png' ); ?>" alt="" aria-hidden="true" loading="lazy">
			<h2>Discover Redwood Utopia</h2>
			<p>Our signature residential development in Jagatpura, Jaipur — thoughtfully designed for modern families.</p>
			<div class="cta-banner__actions">
				<a class="btn btn--gold" href="<?php echo esc_url( gmr_primary_project_url() ); ?>">View the Project <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a>
				<a class="btn btn--ghost-light" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact Us</a>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
