<script lang="ts">
	const random_post_url = 'https://safebooru.donmai.us/posts.json?limit=1&random=true';

	async function get_random_post() {
		const response = await fetch(random_post_url);

		if (!response.ok) {
			throw new Error('Failed to get random post :(');
		}

		const [post] = await response.json();
		const { file_url, tag_string_general } = post;

		return {
			url: file_url,
			tags: tag_string_general.split(' ')
		};
	}
</script>

{#await get_random_post()}
	<p>Loading random post...</p>
{:then post}
	<img src={post.url} alt="A random post" />
	<ul>
		{#each post.tags as tag (tag)}
			<li>{tag}</li>
		{/each}
	</ul>
{:catch error}
	<p>{error.message}</p>
{/await}
