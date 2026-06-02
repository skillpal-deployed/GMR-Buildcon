/* Project meta box — WordPress media picker for the floor plan + gallery fields. */
( function ( $ ) {
	"use strict";

	function renderPreview( $field, ids ) {
		var $preview = $field.find( ".gmr-media-preview" ).empty();
		ids.forEach( function ( id ) {
			var attachment = wp.media.attachment( id );
			attachment.fetch();
			var url = attachment.get( "url" );
			var sizes = attachment.get( "sizes" );
			if ( sizes && sizes.thumbnail ) {
				url = sizes.thumbnail.url;
			}
			if ( url ) {
				$( "<img>", { src: url, alt: "" } ).appendTo( $preview );
			}
		} );
	}

	$( document ).on( "click", ".gmr-media-select", function ( e ) {
		e.preventDefault();
		var $field    = $( this ).closest( ".gmr-media-field" );
		var $input    = $field.find( ".gmr-media-ids" );
		var multiple  = $field.data( "multiple" ) === 1 || $field.data( "multiple" ) === "1";

		var frame = wp.media( {
			title: multiple ? "Select images" : "Select image",
			multiple: multiple ? "add" : false,
			library: { type: "image" },
			button: { text: "Use selection" }
		} );

		frame.on( "select", function () {
			var selection = frame.state().get( "selection" );
			var ids = [];
			selection.each( function ( attachment ) {
				ids.push( attachment.id );
			} );
			$input.val( ids.join( "," ) );
			renderPreview( $field, ids );
		} );

		// Preselect current items when reopening.
		frame.on( "open", function () {
			var selection = frame.state().get( "selection" );
			var current = ( $input.val() || "" ).split( "," ).filter( Boolean );
			current.forEach( function ( id ) {
				var attachment = wp.media.attachment( id );
				attachment.fetch();
				selection.add( attachment );
			} );
		} );

		frame.open();
	} );

	$( document ).on( "click", ".gmr-media-clear", function ( e ) {
		e.preventDefault();
		var $field = $( this ).closest( ".gmr-media-field" );
		$field.find( ".gmr-media-ids" ).val( "" );
		$field.find( ".gmr-media-preview" ).empty();
	} );

} )( jQuery );
