<?php
/**
 * Comments template.
 *
 * @package gmr-buildcon
 */

if ( post_password_required() ) {
	return;
}
?>
<div id="comments" class="comments-area">

	<?php if ( have_comments() ) : ?>
		<h2 class="h-md" style="margin-bottom:1.5rem;">
			<?php
			$count = get_comments_number();
			printf(
				/* translators: %s: comment count */
				esc_html( _n( '%s Comment', '%s Comments', $count, 'gmr-buildcon' ) ),
				esc_html( number_format_i18n( $count ) )
			);
			?>
		</h2>

		<ol class="comment-list" style="display:grid;gap:1.5rem;">
			<?php
			wp_list_comments( array(
				'style'      => 'ol',
				'avatar_size'=> 48,
				'short_ping' => true,
			) );
			?>
		</ol>

		<?php
		the_comments_pagination( array(
			'prev_text' => __( 'Prev', 'gmr-buildcon' ),
			'next_text' => __( 'Next', 'gmr-buildcon' ),
		) );
		?>
	<?php endif; ?>

	<?php
	comment_form( array(
		'title_reply'        => __( 'Leave a Comment', 'gmr-buildcon' ),
		'class_submit'       => 'btn btn--gold',
		'title_reply_before' => '<h3 class="h-md" style="margin:2rem 0 1rem;">',
		'title_reply_after'  => '</h3>',
	) );
	?>
</div>
