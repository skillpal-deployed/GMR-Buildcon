<?php
/**
 * Custom search form.
 *
 * @package gmr-buildcon
 */
?>
<form role="search" method="get" class="gmr-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<div style="display:flex;gap:.6rem;">
		<label class="screen-reader-text" for="s"><?php esc_html_e( 'Search for:', 'gmr-buildcon' ); ?></label>
		<input type="search" id="s" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Search articles…', 'gmr-buildcon' ); ?>" style="flex:1;padding:.85rem 1rem;border:1px solid var(--line);border-radius:var(--radius);background:var(--ivory);">
		<button type="submit" class="btn btn--gold"><?php esc_html_e( 'Search', 'gmr-buildcon' ); ?></button>
	</div>
</form>
