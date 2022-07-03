<script lang="ts">
	import { goto } from '$app/navigation';

	import { getAccessToken } from '../services/user';
	import { createOrJoinConversation } from '../services/chat';
	import { activeConversation, user } from '../store';

	let room = '';

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!$user || $user?.token == null) return;

		const accessToken = await getAccessToken({ token: $user.token });
		const conversation = await createOrJoinConversation({ room, accessToken });

		if (conversation) {
			activeConversation.set(conversation);
			goto(`/${room}`);
		}
	}
</script>

<div class="flex flex-col max-w-md mx-auto mt-10">
	<form on:submit={handleSubmit}>
		<label for="room-select" class="block mb-2 text-sm font-medium text-gray-700">
			Introduce la sala del chat a la que quieres entrar
		</label>
		<input
			id="room-select"
			bind:value={room}
			type="text"
			class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 uppercase text-center text-2xl"
		/>
		<button
			type="submit"
			class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-2"
			>¡Entrar!</button
		>
	</form>
</div>
