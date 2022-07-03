<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '../store';
	import Message from './Message.svelte';

	let div: HTMLDivElement;
	let messages: Array<{ body: string; author: string }> = [];

	onMount(async () => {
		const paginator = await $activeConversation.getMessages();
		messages = paginator.items;

		$activeConversation.on('messageAdded', (message: { body: string; author: string }) => {
			messages = [...messages, message];
		});
	});

	afterUpdate(() => {
		window.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div}>
	{#each messages as message}
		<Message {message} />
	{/each}
</div>
