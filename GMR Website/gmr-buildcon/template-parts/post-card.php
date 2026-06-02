<?php
/**
 * Reusable blog post card.
 *
 * @package gmr-buildcon
 */

$args  = wp_parse_args( $args ?? array(), array( 'delay' => 1 ) );
$delay = (int) $args['delay'];
?>
<article class="post-card reveal" data-delay="<?php echo esc_attr( min( $delay, 3 ) ); ?>">
	<a class="post-card__media" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'gmr-card', array( 'alt' => the_title_attribute( array( 'echo' => false ) ) ) ); ?>
		<?php else : ?>
			<span class="ph">GMR Buildcon</span>
		<?php endif; ?>
	</a>
	<div class="post-card__body">
		<span class="post-card__date"><?php echo esc_html( get_the_date() ); ?></span>
		<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 20 ) ); ?></p>
		<a class="post-card__more" href="<?php the_permalink(); ?>">Read More <?php echo gmr_icon( 'arrow', 15 ); // phpcs:ignore ?></a>
	</div>
</article>
