<?php
/**
 * Template Name: Contact
 *
 * @package gmr-buildcon
 */

get_header();

$status = isset( $_GET['contact'] ) ? sanitize_key( wp_unslash( $_GET['contact'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
?>

<section class="page-hero">
	<div class="container container--wide">
		<div class="page-hero__inner">
			<nav class="breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a> / <span>Contact</span></nav>
			<h1>Get in Touch</h1>
			<p>Schedule a tour, request a brochure, or ask us anything about Redwood Utopia. We'd love to hear from you.</p>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="grid contact-grid">

			<div class="reveal">
				<span class="eyebrow">Contact Details</span>
				<h2 class="h-md" style="margin-bottom:1.5rem;">We're here to help you find home</h2>
				<div class="contact-info">
					<div class="contact-item">
						<div class="contact-item__icon"><?php echo gmr_icon( 'pin', 20 ); // phpcs:ignore ?></div>
						<div><h4>Office Address</h4><p><?php echo esc_html( gmr_info( 'address' ) ); ?></p></div>
					</div>
					<div class="contact-item">
						<div class="contact-item__icon"><?php echo gmr_icon( 'phone', 20 ); // phpcs:ignore ?></div>
						<div><h4>Call Us</h4><a href="tel:<?php echo esc_attr( gmr_info( 'phone_link' ) ); ?>"><?php echo esc_html( gmr_info( 'phone' ) ); ?></a></div>
					</div>
					<div class="contact-item">
						<div class="contact-item__icon"><?php echo gmr_icon( 'mail', 20 ); // phpcs:ignore ?></div>
						<div><h4>Email</h4><a href="mailto:<?php echo esc_attr( gmr_info( 'email' ) ); ?>"><?php echo esc_html( gmr_info( 'email' ) ); ?></a></div>
					</div>
					<div class="contact-item">
						<div class="contact-item__icon"><?php echo gmr_icon( 'download', 20 ); // phpcs:ignore ?></div>
						<div><h4>Brochure</h4><a href="<?php echo esc_url( gmr_info( 'brochure' ) ); ?>" target="_blank" rel="noopener noreferrer">Download project brochure</a></div>
					</div>
				</div>
			</div>

			<div class="reveal" data-delay="1">
				<div class="contact-form">
					<h3 class="h-md" style="margin-bottom:1.25rem;">Send us a message</h3>

					<?php if ( 'success' === $status ) : ?>
						<p style="background:var(--gold-soft);color:var(--forest);padding:1rem 1.25rem;border-radius:var(--radius);margin-bottom:1.25rem;font-weight:600;">Thank you! Your message has been sent. We'll be in touch shortly.</p>
					<?php elseif ( 'error' === $status ) : ?>
						<p style="background:#fbe9e7;color:#9a3412;padding:1rem 1.25rem;border-radius:var(--radius);margin-bottom:1.25rem;font-weight:600;">Sorry, something went wrong. Please call us or try again.</p>
					<?php endif; ?>

					<?php
					// If a form plugin shortcode is stored in the page content, render it instead.
					$page_post    = get_post();
					$page_content = $page_post ? trim( $page_post->post_content ) : '';
					if ( $page_content && has_shortcode( $page_content, 'contact-form-7' ) ) {
						echo do_shortcode( $page_content );
					} else {
						?>
						<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" novalidate>
							<input type="hidden" name="action" value="gmr_contact">
							<?php wp_nonce_field( 'gmr_contact', 'gmr_contact_nonce' ); ?>
							<div style="position:absolute;left:-9999px;" aria-hidden="true">
								<label>Leave blank<input type="text" name="gmr_hp" tabindex="-1" autocomplete="off"></label>
							</div>

							<div class="form-row">
								<div class="field">
									<label for="cf-name">Full Name *</label>
									<input type="text" id="cf-name" name="name" required>
								</div>
								<div class="field">
									<label for="cf-phone">Phone *</label>
									<input type="tel" id="cf-phone" name="phone" required>
								</div>
							</div>
							<div class="field">
								<label for="cf-email">Email Address *</label>
								<input type="email" id="cf-email" name="email" required>
							</div>
							<div class="field">
								<label for="cf-interest">I'm interested in</label>
								<select id="cf-interest" name="interest">
									<option>2 BHK Apartment</option>
									<option>3 BHK Apartment</option>
									<option>Site Visit / Tour</option>
									<option>Brochure &amp; Pricing</option>
									<option>General Enquiry</option>
								</select>
							</div>
							<div class="field">
								<label for="cf-message">Message</label>
								<textarea id="cf-message" name="message" placeholder="Tell us what you're looking for..."></textarea>
							</div>
							<button type="submit" class="btn btn--gold btn--block">Send Message <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></button>
						</form>
						<?php
					}
					?>
				</div>
			</div>

		</div>
	</div>
</section>

<section class="section--tight" style="padding-top:0;">
	<div class="container">
		<div class="map-frame reveal">
			<iframe
				title="GMR Buildcon — Jagatpura, Jaipur"
				src="https://www.google.com/maps?q=Jagatpura,+Jaipur,+Rajasthan&output=embed"
				width="100%" height="380" style="border:0;" allowfullscreen="" loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</div>
</section>

<?php
get_footer();
