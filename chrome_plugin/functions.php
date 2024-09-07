<?php

/**
 * Twenty Twenty-Four functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Twenty Twenty-Four
 * @since Twenty Twenty-Four 1.0
 */

/**
 * Register block styles.
 */

add_filter('wp_is_application_passwords_available', '__return_true');

function register_custom_meta()
{
	register_meta('post', 'image', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_meta('post', 'username', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);
}
add_action('init', 'register_custom_meta');

add_action('graphql_register_types', function () {
	register_graphql_field('Post', 'image', [
		'type' => 'String',
		'description' => __('The image URL of the post', 'wp-graphql'),
		'resolve' => function ($post) {
			$image = get_post_meta($post->ID, 'image', true);
			return ! empty($image) ? $image : null;
		}
	]);

	register_graphql_field('Post', 'username', [
		'type' => 'String',
		'description' => __('The username author of the post', 'wp-graphql'),
		'resolve' => function ($post) {
			$username = get_post_meta($post->ID, 'username', true);
			return ! empty($username) ? $username : null;
		}
	]);
});



if (! function_exists('twentytwentyfour_block_styles')) :
	/**
	 * Register custom block styles
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_block_styles()
	{

		register_block_style(
			'core/details',
			array(
				'name'         => 'arrow-icon-details',
				'label'        => __('Arrow icon', 'twentytwentyfour'),
				/*
				 * Styles for the custom Arrow icon style of the Details block
				 */
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}

				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}

				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
			)
		);
		register_block_style(
			'core/post-terms',
			array(
				'name'         => 'pill',
				'label'        => __('Pill', 'twentytwentyfour'),
				/*
				 * Styles variation for post terms
				 * https://github.com/WordPress/gutenberg/issues/24956
				 */
				'inline_style' => '
				.is-style-pill a,
				.is-style-pill span:not([class], [data-rich-text-placeholder]) {
					display: inline-block;
					background-color: var(--wp--preset--color--base-2);
					padding: 0.375rem 0.875rem;
					border-radius: var(--wp--preset--spacing--20);
				}

				.is-style-pill a:hover {
					background-color: var(--wp--preset--color--contrast-3);
				}',
			)
		);
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __('Checkmark', 'twentytwentyfour'),
				/*
				 * Styles for the custom checkmark list block style
				 * https://github.com/WordPress/gutenberg/issues/51480
				 */
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
		register_block_style(
			'core/navigation-link',
			array(
				'name'         => 'arrow-link',
				'label'        => __('With arrow', 'twentytwentyfour'),
				/*
				 * Styles for the custom arrow nav link block style
				 */
				'inline_style' => '
				.is-style-arrow-link .wp-block-navigation-item__label:after {
					content: "\2197";
					padding-inline-start: 0.25rem;
					vertical-align: middle;
					text-decoration: none;
					display: inline-block;
				}',
			)
		);
		register_block_style(
			'core/heading',
			array(
				'name'         => 'asterisk',
				'label'        => __('With asterisk', 'twentytwentyfour'),
				'inline_style' => "
				.is-style-asterisk:before {
					content: '';
					width: 1.5rem;
					height: 3rem;
					background: var(--wp--preset--color--contrast-2, currentColor);
					clip-path: path('M11.93.684v8.039l5.633-5.633 1.216 1.23-5.66 5.66h8.04v1.737H13.2l5.701 5.701-1.23 1.23-5.742-5.742V21h-1.737v-8.094l-5.77 5.77-1.23-1.217 5.743-5.742H.842V9.98h8.162l-5.701-5.7 1.23-1.231 5.66 5.66V.684h1.737Z');
					display: block;
				}

				/* Hide the asterisk if the heading has no content, to avoid using empty headings to display the asterisk only, which is an A11Y issue */
				.is-style-asterisk:empty:before {
					content: none;
				}

				.is-style-asterisk:-moz-only-whitespace:before {
					content: none;
				}

				.is-style-asterisk.has-text-align-center:before {
					margin: 0 auto;
				}

				.is-style-asterisk.has-text-align-right:before {
					margin-left: auto;
				}

				.rtl .is-style-asterisk.has-text-align-left:before {
					margin-right: auto;
				}",
			)
		);
	}
endif;

add_action('init', 'twentytwentyfour_block_styles');

/**
 * Enqueue block stylesheets.
 */

if (! function_exists('twentytwentyfour_block_stylesheets')) :
	/**
	 * Enqueue custom block stylesheets
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_block_stylesheets()
	{
		/**
		 * The wp_enqueue_block_style() function allows us to enqueue a stylesheet
		 * for a specific block. These will only get loaded when the block is rendered
		 * (both in the editor and on the front end), improving performance
		 * and reducing the amount of data requested by visitors.
		 *
		 * See https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/ for more info.
		 */
		wp_enqueue_block_style(
			'core/button',
			array(
				'handle' => 'twentytwentyfour-button-style-outline',
				'src'    => get_parent_theme_file_uri('assets/css/button-outline.css'),
				'ver'    => wp_get_theme(get_template())->get('Version'),
				'path'   => get_parent_theme_file_path('assets/css/button-outline.css'),
			)
		);
	}
endif;

add_action('init', 'twentytwentyfour_block_stylesheets');

/**
 * Register pattern categories.
 */

if (! function_exists('twentytwentyfour_pattern_categories')) :
	/**
	 * Register pattern categories
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_pattern_categories()
	{

		register_block_pattern_category(
			'twentytwentyfour_page',
			array(
				'label'       => _x('Pages', 'Block pattern category', 'twentytwentyfour'),
				'description' => __('A collection of full page layouts.', 'twentytwentyfour'),
			)
		);
	}
endif;

add_action('init', 'twentytwentyfour_pattern_categories');

add_action('rest_insert_post', 'upload_image_and_set_featured', 10, 3);


function upload_image_and_set_featured($post, $request, $creating)
{

	log_error("Post type: " . print_r($post, true));
	log_error("Creating: " . $creating);

	if ($post->post_type !== 'post') {
		return;
	}


	// Get the custom field value
	$metas = $request->get_param("meta");
	$image_url = $metas['image'];
	$author_name = $metas['username'];

	log_error("Metas: " . print_r($metas, true));

	log_error("Image URL: " . $image_url);
	log_error("Author Name: " . $author_name);

	if ($image_url) {
		// Upload the image to the media library
		$image_id = upload_image_from_url($image_url, $post->ID);

		if ($image_id) {
			// Set the uploaded image as the featured image
			set_post_thumbnail($post->ID, $image_id);
		}
	}

	if ($author_name) {
		$author_id = get_or_create_user_id($author_name);
		if ($author_id) {
			// Set the author ID to the post
			wp_update_post(array(
				'ID' => $post->ID,
				'post_author' => $author_id,
			));
		}
	}
}


function get_or_create_user_id($username)
{
	// Check if the user exists
	$user = get_user_by('login', $username);

	if ($user) {
		// User exists, return the user ID
		return $user->ID;
	} else {
		// User does not exist, create a new user
		$userdata = array(
			'user_login' => $username,
			'user_email' => $username . '@tinyshinycookbook.com', // Use a default email or modify as needed
			'user_pass'  => wp_generate_password(), // Generate a random password
			'role'       => 'author' // Set the role as needed
		);

		$new_user_id = wp_insert_user($userdata);

		if (is_wp_error($new_user_id)) {
			// Handle error if user creation fails
			log_error("Error creating user: " . $new_user_id->get_error_message());
			return false;
		}

		return $new_user_id; // Return the new user ID
	}
}

function upload_image_from_url($image_url, $post_id)
{
	log_error("Uploading image from URL: $image_url");

	if (!filter_var($image_url, FILTER_VALIDATE_URL)) {
		log_error("Invalid URL: $image_url");
		return false;
	}

	// Get the image file
	$response = wp_remote_get($image_url);
	if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
		$error_message = is_wp_error($response) ? $response->get_error_message() : 'Failed to fetch image';
		log_error("Error fetching image: $error_message");
		return false;
	}

	$image_data = wp_remote_retrieve_body($response);
	log_error("Image data fetched." );

	// Generate a unique file name
	$file_name = 'post_' . $post_id . '_' . time() . '.jpg';

	// Upload the image to WordPress
	$upload = wp_upload_bits($file_name, null, $image_data);
	log_error("Image uploaded." );
	if ($upload['error']) {
		log_error("Error uploading image: " . $upload['error']);
		return false;
	}

	$file_path = $upload['file'];
	$file_name = basename($file_path);
	$file_type = wp_check_filetype($file_name, null);

	// Prepare an array of post data for the attachment
	$attachment = array(
		'guid'           => $upload['url'],
		'post_mime_type' => $file_type['type'],
		'post_title'     => preg_replace('/\.[^.]+$/', '', $file_name),
		'post_content'   => '',
		'post_status'    => 'inherit'
	);

	// Insert the attachment
	$attachment_id = wp_insert_attachment($attachment, $file_path, $post_id);

	if (is_wp_error($attachment_id)) {
		log_error("Error inserting attachment: " . $attachment_id->get_error_message());
		return false;
	}

	// Include image.php
	require_once(ABSPATH . 'wp-admin/includes/image.php');

	// Generate metadata for the attachment and update the database record
	$attachment_data = wp_generate_attachment_metadata($attachment_id, $file_path);
	wp_update_attachment_metadata($attachment_id, $attachment_data);

	return $attachment_id;
}

function log_error($message)
{
	$log_file = __DIR__ . '/error_log.txt';
	$timestamp = date("Y-m-d H:i:s");
	$log_message = "[$timestamp] $message" . PHP_EOL;
	file_put_contents($log_file, $log_message, FILE_APPEND);
}


function create_draft_post_endpoint()
{
	register_rest_route('wp/v2', '/submit-dish', array(
		'methods' => 'POST',
		'callback' => 'handle_draft_post_creation',
		'permission_callback' => '__return_true',
	));
}
add_action('rest_api_init', 'create_draft_post_endpoint');

function handle_draft_post_creation(WP_REST_Request $request)
{
	// Get data from the request
	$title = sanitize_text_field($request->get_param('title'));
	$author = sanitize_text_field($request->get_param('author'));
	$tags = sanitize_text_field($request->get_param('tags'));
	$image = sanitize_text_field($request->get_param('image'));
	$url = sanitize_text_field($request->get_param('url'));

	// Validate required fields
	if (empty($title)) {
		return new WP_Error('missing_data', 'Title is required', array('status' => 400));
	}

	// Create a new post
	$new_post = array(
		'post_title'   => $title,
		'post_status'  => 'draft',
		'post_type'    => 'post',
		'post_excerpt' => $url,
		'post_author' => get_or_create_user_id($author),
	);

	$post_id = wp_insert_post($new_post);

	// Upload the image from the URL and get the attachment ID
	$image_id = upload_image_from_url($image, $post_id);

	// Attach the uploaded image to the post
	if ($image_id) {
		set_post_thumbnail($post_id, $image_id); // Set as featured image
	}

	// Check for errors
	if (is_wp_error($post_id)) {
		return new WP_Error('post_creation_failed', 'Failed to create post', array('status' => 500));
	}

	// Handle tags
	$tag_ids = array();
	if (!empty($tags)) {
		$tag_names = array_map('trim', explode(',', $tags));
		foreach ($tag_names as $tag_name) {
			$existing_tag = get_term_by('name', $tag_name, 'post_tag');
			if ($existing_tag) {
				$tag_ids[] = $existing_tag->term_id;
			} else {
				$new_tag = wp_insert_term($tag_name, 'post_tag');
				if (!is_wp_error($new_tag)) {
					$tag_ids[] = $new_tag['term_id'];
				}
			}
		}
		wp_set_post_tags($post_id, $tag_ids);
	}

	// Return the newly created post ID and tag IDs
	return rest_ensure_response(array(
		'post_id' => $post_id,
		'tag_ids' => $tag_ids
	));
}

