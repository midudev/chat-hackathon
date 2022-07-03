<script lang="ts">
	import { user } from '../store';

	export let message: { body: string; author: string };

	const { body, author } = message;

	let userOrigin = message.author === $user?.userName ? 'local' : 'remote';
</script>

<div class={`m-2 w-3/6 ${userOrigin}`}>
	<p class="m-0 p-0">{body}</p>
	<small class="text-xs">{author}</small>
</div>

<style>
	.local {
		text-align: right;
		margin-left: 40%;
	}

	.remote {
		text-align: left;
		margin-right: 40%;
	}
</style>
