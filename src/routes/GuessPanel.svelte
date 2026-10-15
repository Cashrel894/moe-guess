<script lang="ts">
	import { onMount } from 'svelte';
	import type { Post } from '#lib/types.ts';
	import { getRandomPost } from '#lib/safebooru.ts';

	type GuessState = {
		current: string;
		correct: boolean;
		success: string[];
		failure: string[];
	};

	let post: Post | null = $state(null);

	onMount(async () => {
		post = await getRandomPost();
	});

	let playerGuess = $state('');
	let guessState: GuessState = $state({
		current: '',
		correct: false,
		success: [],
		failure: []
	});

	const onclick = () => {
		if (!post) {
			return;
		}

		guessState.current = playerGuess;
		guessState.correct = post.tags.includes(playerGuess);

		const arrayToPush = guessState.correct ? guessState.success : guessState.failure;
		arrayToPush.push(playerGuess);
	};
</script>

<div class="container">
	{#if post === null}
		<p>Loading random post...</p>
	{:else}
		<img class="canvas" src={post.url} alt="A random post" />
		<label for="player-guess">Type your guess: </label>
		<input type="text" id="player-guess" bind:value={playerGuess} />
		<button {onclick}>Submit</button>

		{#if guessState.current}
			<p>
				You've guessed <b>{guessState.current}</b>, it's
				<b>{guessState.correct ? 'right' : 'wrong'}!</b>
			</p>
		{/if}

		<p>Those you've got right:</p>
		<ul>
			{#each guessState.success as tag (tag)}
				<li>{tag}</li>
			{/each}
		</ul>

		<p>Those you've guessed wrong:</p>
		<ul>
			{#each guessState.failure as tag (tag)}
				<li>{tag}</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.canvas {
		display: block;
		margin: auto;
		width: 40%;
		height: auto;
	}
</style>
