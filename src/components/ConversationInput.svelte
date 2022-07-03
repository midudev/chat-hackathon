<script lang="ts">
	import { activeConversation } from '../store';

	let message = '';

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			$activeConversation.sendMessage(message);
			message = '';
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="mt-5">
	<input
		class="p-2 border-gray-700 w-full border-2"
		type="text"
		bind:value={message}
		placeholder="Escribe tu mensaje aquí"
	/>
</div>
