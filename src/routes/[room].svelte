<script lang="ts">
	import { activeConversation } from '../store';

	import Conversation from '../components/Conversation.svelte';
	import ConversationInput from '../components/ConversationInput.svelte';
</script>

{#if $activeConversation?.uniqueName}
	<div class="max-w-6xl mx-auto py-2 relative">
		<h2 class="text-3xl">
			{$activeConversation.uniqueName}
		</h2>
		<Conversation />
		<ConversationInput />
	</div>
{/if}
