<script lang="ts">
	import { connect, messageStore, sendMessage } from '$lib/stores/chat';
	import type { Message, User } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import type { PageProps } from './$types';

	// Props und Promise, die evtl. undefined sein kann
	const { data }: PageProps = $props();

	let authUser = data.authUser;
	let friendUser: User | null = $state(null);
	let messages: Message[] = $state([]);
	let newMsg = $state('');
	let unsubscribe: () => void;

	// Asynchrones Laden von Freund und Nachrichten
	onMount(async () => {
		try {
			friendUser = await data.friendUserPromise;
			messages = await data.messagesPromise;

			// Subscription an den Store für neue Nachrichten
			unsubscribe = messageStore.subscribe((store) => {
				if (friendUser) {
					messages = store.get(friendUser.id) ?? messages;
				}
			});
		} catch (e) {
			console.error('Fehler beim Laden von Daten:', e);
		}
	});

	onDestroy(() => {
		unsubscribe?.();
	});

	function submit() {
		if (!friendUser || !newMsg.trim()) return;
		sendMessage(friendUser.id, newMsg.trim());
		newMsg = '';
	}
</script>

<main class="p-4">
	<h2>Meine User-ID: {authUser.id}</h2>
	{#if friendUser}
		<h2>Chat mit User {friendUser.id}</h2>

		<ul class="mt-4 space-y-2">
			{#each messages as msg (msg.timestamp)}
				<li>
					<strong>{msg.senderId === friendUser.id ? 'Er' : 'Ich'}:</strong>
					{msg.content}
				</li>
			{/each}
		</ul>

		<div class="mt-4 flex space-x-2">
			<input
				bind:value={newMsg}
				placeholder="Nachricht…"
				onkeydown={({ key }) => key === 'Enter' && submit()}
				class="flex-1 rounded border p-2"
			/>
			<button onclick={submit} class="rounded bg-blue-500 px-4 py-2 text-white"> Senden </button>
			<button
				onclick={() => connect(authUser.id)}
				class="rounded bg-green-500 px-4 py-2 text-white"
			>
				Connect
			</button>
		</div>
	{:else}
		<p>Lade Chat-Partner …</p>
	{/if}
</main>
