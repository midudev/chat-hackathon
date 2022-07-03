<script>
	import { user } from '../store';
	import LogoutIcon from '../components/LogoutIcon.svelte';
</script>

{#if $user}
	<strong class="text-zinc-700">{$user.name}</strong>
	<img class="rounded-full h-8 w-8" alt={$user.name} src={$user.avatar} />
	<button class="leading-none py-2 flex items-center gap-1 hover:underline">
		<LogoutIcon />
		Cerrar sesión
	</button>
{/if}
