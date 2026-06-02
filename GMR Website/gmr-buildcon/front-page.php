<?php
/**
 * Front page (homepage) template.
 *
 * @package gmr-buildcon
 */

get_header();
?>

<!-- ============ HERO ============ -->
<section class="hero" id="hero">
	<div class="hero__bg" aria-hidden="true"></div>
	<div class="container container--wide">
		<div class="hero__inner">
			<span class="hero__eyebrow"><?php echo gmr_icon( 'pin', 16 ); // phpcs:ignore ?> Redwood Utopia &middot; Jagatpura, Jaipur</span>
			<h1>A Symbol of <em>Trust, Quality</em><br>&amp; Innovation in Real Estate</h1>
			<p class="hero__text">At the heart of every landmark development is a vision. Our homes are not just structures, but lifestyle experiences crafted with precision and care.</p>
			<div class="hero__cta">
				<a class="btn btn--gold" href="<?php echo esc_url( gmr_primary_project_url() ); ?>">Explore Redwood Utopia <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a>
				<a class="btn btn--outline" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Schedule a Tour</a>
			</div>
		</div>

		<div class="hero__showcase reveal">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-render.png' ); ?>" alt="Redwood Utopia — low-rise residential development in Jagatpura, Jaipur" width="1916" height="739" fetchpriority="high">
			<div class="hero__badge">
				<span class="icon"><?php echo gmr_icon( 'building', 22 ); // phpcs:ignore ?></span>
				<span>
					<span class="b-num">48 Exclusive Units</span>
					<span class="b-txt">Low-density living &middot; 0.29 acres</span>
				</span>
			</div>
		</div>

		<div class="hero__stats">
			<div class="hero__stat">
				<div class="num"><span data-count="48">48</span></div>
				<div class="label">Exclusive Units</div>
			</div>
			<div class="hero__stat">
				<div class="num">0.29</div>
				<div class="label">Acres Low-Density</div>
			</div>
			<div class="hero__stat">
				<div class="num">2 &amp; 3</div>
				<div class="label">BHK Apartments</div>
			</div>
			<div class="hero__stat">
				<div class="num">Low-Rise</div>
				<div class="label">Private Living</div>
			</div>
		</div>
	</div>
</section>

<!-- ============ ABOUT ============ -->
<section class="section" id="about">
	<div class="container">
		<div class="split">
			<div class="split__media reveal">
				<div class="framed">
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/photo-1.jpg' ); ?>" alt="Interior of a Redwood Utopia home in Jagatpura, Jaipur" width="1280" height="853" loading="lazy">
				</div>
				<div class="media-badge">
					<div class="num">100%</div>
					<div class="txt">Customer-Centric Approach</div>
				</div>
			</div>
			<div class="split__body reveal" data-delay="1">
				<span class="eyebrow">About GMR Buildcon</span>
				<h2 class="h-lg">Crafting landmark living, built on a foundation of trust</h2>
				<p class="lead">GMR Buildcon stands as a symbol of trust, quality, and innovation in the real estate space.</p>
				<p>With a strong track record of delivering thoughtfully designed residential and commercial projects, we focus on what matters most to the families who live in our developments. Our buildings are more than addresses — they are lifestyle experiences crafted with precision and care.</p>
				<ul class="value-list">
					<li><span class="tick"><?php echo gmr_icon( 'check', 14 ); // phpcs:ignore ?></span> Timely delivery, every time</li>
					<li><span class="tick"><?php echo gmr_icon( 'check', 14 ); // phpcs:ignore ?></span> Premium construction quality</li>
					<li><span class="tick"><?php echo gmr_icon( 'check', 14 ); // phpcs:ignore ?></span> Customer-centric approach</li>
					<li><span class="tick"><?php echo gmr_icon( 'check', 14 ); // phpcs:ignore ?></span> Modern architecture &amp; sustainable living</li>
				</ul>
				<p style="margin-top:1.75rem;"><a class="btn btn--outline" href="<?php echo esc_url( home_url( '/about/' ) ); ?>">More About Us <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a></p>
			</div>
		</div>
	</div>
</section>

<!-- ============ PROJECT HIGHLIGHT ============ -->
<section class="section section--cream" id="project">
	<div class="container">
		<div class="section-head center reveal">
			<span class="eyebrow">Our Signature Project</span>
			<h2 class="h-lg">Redwood Utopia, Jagatpura</h2>
			<p class="lead">A thoughtfully planned residential development offering the perfect balance of comfort, connectivity, and practicality — an ideal choice for both homeowners and investors.</p>
		</div>

		<div class="grid spec-grid">
			<div class="spec-item reveal" data-delay="1">
				<div class="icon"><?php echo gmr_icon( 'building', 32 ); // phpcs:ignore ?></div>
				<div class="val">48</div>
				<div class="key">Total Units</div>
			</div>
			<div class="spec-item reveal" data-delay="2">
				<div class="icon"><?php echo gmr_icon( 'home', 32 ); // phpcs:ignore ?></div>
				<div class="val">2 &amp; 3 BHK</div>
				<div class="key">Configuration</div>
			</div>
			<div class="spec-item reveal" data-delay="3">
				<div class="icon"><?php echo gmr_icon( 'layers', 32 ); // phpcs:ignore ?></div>
				<div class="val">Low-Rise</div>
				<div class="key">Apartments / Flats</div>
			</div>
			<div class="spec-item reveal" data-delay="4">
				<div class="icon"><?php echo gmr_icon( 'car', 32 ); // phpcs:ignore ?></div>
				<div class="val">48</div>
				<div class="key">Parking Slots</div>
			</div>
		</div>

		<div class="split" style="margin-top:clamp(2.5rem,6vw,4.5rem);">
			<div class="split__body reveal">
				<h3 class="h-md">Designed for modern urban living</h3>
				<p>Spread across approximately <strong>0.29 acres</strong>, Redwood Utopia is a low-density project with just 48 exclusive units, ensuring a more private and peaceful living experience.</p>
				<p>The development features well-designed 2 &amp; 3 BHK apartments, with smart layouts that maximize space, ventilation, and natural light — homes built for the way real families live.</p>
				<p style="margin-top:1.5rem;"><a class="btn btn--gold" href="<?php echo esc_url( gmr_primary_project_url() ); ?>">View Project Details <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a></p>
			</div>
			<div class="split__media reveal" data-delay="1">
				<div class="framed framed--wide">
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/photo-2.jpg' ); ?>" alt="Spacious 2 &amp; 3 BHK living space at Redwood Utopia" width="1280" height="853" loading="lazy">
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ============ AMENITIES ============ -->
<section class="section" id="amenities">
	<div class="container">
		<div class="section-head center reveal">
			<span class="eyebrow">Lifestyle &amp; Infrastructure</span>
			<h2 class="h-lg">Amenities crafted for everyday comfort</h2>
			<p class="lead">Thoughtfully designed common areas and reliable infrastructure that enhance everyday living — a serene atmosphere ideal for modern urban life.</p>
		</div>

		<div class="grid amenity-grid">
			<?php
			$amenities = array(
				array( 'drop',   '24x7 Water Supply', 'Continuous and reliable water availability for a hassle-free lifestyle.' ),
				array( 'leaf',   'Rainwater Harvesting', 'Sustainable infrastructure designed for efficient water management.' ),
				array( 'flame',  'Fire Safety Systems', 'Equipped with essential fire protection measures ensuring resident safety.' ),
				array( 'waves',  'Storm Water Drainage', 'Proper drainage systems to maintain hygiene and prevent waterlogging.' ),
				array( 'road',   'Internal Infrastructure', 'Smooth internal planning for easy movement and daily convenience.' ),
				array( 'bolt',   'Power Backup', 'Uninterrupted functioning of essential services and common spaces.' ),
			);
			$i = 1;
			foreach ( $amenities as $a ) :
				?>
				<div class="amenity-card reveal" data-delay="<?php echo esc_attr( min( $i, 3 ) ); ?>">
					<div class="amenity-card__icon"><?php echo gmr_icon( $a[0], 26 ); // phpcs:ignore ?></div>
					<h3><?php echo esc_html( $a[1] ); ?></h3>
					<p><?php echo esc_html( $a[2] ); ?></p>
				</div>
				<?php
				$i++;
			endforeach;
			?>
		</div>

		<div class="reveal" style="margin-top:clamp(2.5rem,5vw,3.5rem); text-align:center;">
			<h3 class="h-md" style="margin-bottom:1.5rem;">Lifestyle Amenities</h3>
			<div class="chip-grid" style="justify-content:center;">
				<span class="chip"><?php echo gmr_icon( 'sparkle', 18 ); // phpcs:ignore ?> Clubhouse with recreational facilities</span>
				<span class="chip"><?php echo gmr_icon( 'tree', 18 ); // phpcs:ignore ?> Landscaped gardens &amp; green spaces</span>
				<span class="chip"><?php echo gmr_icon( 'play', 18 ); // phpcs:ignore ?> Children's play zone</span>
				<span class="chip"><?php echo gmr_icon( 'run', 18 ); // phpcs:ignore ?> Jogging &amp; walking tracks</span>
				<span class="chip"><?php echo gmr_icon( 'cctv', 18 ); // phpcs:ignore ?> 24/7 security &amp; surveillance</span>
				<span class="chip"><?php echo gmr_icon( 'star', 18 ); // phpcs:ignore ?> Common party / event area</span>
			</div>
			<p style="margin-top:2rem;"><a class="btn btn--outline" href="<?php echo esc_url( gmr_primary_project_url() . '#amenities' ); ?>">See All Amenities <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a></p>
		</div>
	</div>
</section>

<!-- ============ LOCATION ============ -->
<section class="section section--sand" id="location">
	<div class="container">
		<div class="section-head reveal">
			<span class="eyebrow">Prime Connectivity</span>
			<h2 class="h-lg">Everything you need, minutes away</h2>
			<p class="lead">Located in the fast-growing locality of Jagatpura, Jaipur — surrounded by a calm, well-organized setting with seamless access to daily necessities.</p>
		</div>

		<div class="grid loc-grid">
			<?php
			$places = array(
				array( 'cap',   '1.0 km', 'University / College' ),
				array( 'cross', '1.5 km', 'Hospital' ),
				array( 'train', '1.0 km', 'Railway Station' ),
				array( 'bus',   '1.5 km', 'Bus Station' ),
				array( 'bank',  '0.3 km', 'Bank / ATM' ),
				array( 'plane', '2.0 km', 'Airport' ),
				array( 'park',  '0.3 km', "Children's Parks" ),
				array( 'compass','65', 'Transit Score' ),
			);
			$i = 1;
			foreach ( $places as $p ) :
				?>
				<div class="loc-card reveal" data-delay="<?php echo esc_attr( min( $i, 4 ) ); ?>">
					<div class="loc-card__icon"><?php echo gmr_icon( $p[0], 22 ); // phpcs:ignore ?></div>
					<div>
						<div class="dist"><?php echo esc_html( $p[1] ); ?></div>
						<div class="place"><?php echo esc_html( $p[2] ); ?></div>
					</div>
				</div>
				<?php
				$i++;
			endforeach;
			?>
		</div>

		<div class="reveal" style="text-align:center;">
			<a class="btn btn--gold" href="<?php echo esc_url( gmr_primary_project_url() . '#location' ); ?>" style="margin-top:2.5rem;">Explore the Location <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a>
		</div>
	</div>
</section>

<!-- ============ GALLERY ============ -->
<section class="section" id="gallery">
	<div class="container">
		<div class="section-head center reveal">
			<span class="eyebrow">Gallery</span>
			<h2 class="h-lg">A glimpse of Redwood Utopia</h2>
		</div>
		<?php $gimg = get_template_directory_uri() . '/assets/images/'; ?>
		<div class="grid gallery reveal">
			<div class="gallery__item wide tall"><img src="<?php echo esc_url( $gimg . 'hero-render.png' ); ?>" alt="Redwood Utopia building exterior at golden hour" width="1916" height="739" loading="lazy"></div>
			<div class="gallery__item"><img src="<?php echo esc_url( $gimg . 'photo-1.jpg' ); ?>" alt="Living room interior at Redwood Utopia" width="1280" height="853" loading="lazy"></div>
			<div class="gallery__item"><img src="<?php echo esc_url( $gimg . 'photo-2.jpg' ); ?>" alt="Lounge and dining interior at Redwood Utopia" width="1280" height="853" loading="lazy"></div>
			<div class="gallery__item wide"><img src="<?php echo esc_url( $gimg . 'photo-3.jpg' ); ?>" alt="Private balcony with neighbourhood views" width="1280" height="853" loading="lazy"></div>
		</div>
	</div>
</section>

<!-- ============ CTA ============ -->
<section class="section section--tight">
	<div class="container">
		<div class="cta-banner reveal">
			<img class="cta-banner__bg" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-render.png' ); ?>" alt="" aria-hidden="true" loading="lazy">
			<span class="eyebrow">Your new home awaits</span>
			<h2>Ready to experience Redwood Utopia?</h2>
			<p>Book a site visit, download the brochure, or talk to our team — we'll help you find the home that fits your life.</p>
			<div class="cta-banner__actions">
				<a class="btn btn--gold" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Schedule a Tour <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a>
				<a class="btn btn--ghost-light" href="<?php echo esc_url( gmr_info( 'brochure' ) ); ?>" target="_blank" rel="noopener noreferrer">Download Brochure <?php echo gmr_icon( 'download', 16 ); // phpcs:ignore ?></a>
			</div>
		</div>
	</div>
</section>

<?php
// Latest insights from the blog.
$recent = new WP_Query( array(
	'post_type'           => 'post',
	'posts_per_page'      => 3,
	'ignore_sticky_posts' => true,
) );
if ( $recent->have_posts() ) :
	?>
	<section class="section section--cream" id="insights">
		<div class="container">
			<div class="section-head center reveal">
				<span class="eyebrow">Insights</span>
				<h2 class="h-lg">From our blog</h2>
				<p class="lead">Market trends, buying guides, and the latest on Jagatpura real estate.</p>
			</div>
			<div class="grid post-grid">
				<?php
				$d = 1;
				while ( $recent->have_posts() ) :
					$recent->the_post();
					get_template_part( 'template-parts/post-card', null, array( 'delay' => $d ) );
					$d++;
				endwhile;
				?>
			</div>
			<div class="reveal" style="text-align:center;margin-top:2.5rem;">
				<a class="btn btn--outline" href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/blog/' ) ); ?>">View All Articles <?php echo gmr_icon( 'arrow', 16 ); // phpcs:ignore ?></a>
			</div>
		</div>
	</section>
	<?php
	wp_reset_postdata();
endif;

get_footer();
