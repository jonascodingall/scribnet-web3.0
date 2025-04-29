<script lang="ts">
	import { connect, messageStore, sendMessage } from '$lib/stores/chat';
	import type { Message, User } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import type { PageProps } from './$types';
	import ChatMain from '$lib/components/chat-main.svelte';
	import ChatHeader from '$lib/components/chat-header.svelte';
	import { page } from '$app/state';

	// Props und Promise, die evtl. undefined sein kann
	const { data }: PageProps = $props();

	let authUser = data.authUser;
	let friendUser: User | null = $state(null);
	let messages: Message[] = $state([]);

	let unsubscribe: () => void;

	// Asynchrones Laden von Freund und Nachrichten
	onMount(async () => {
		try {
			messages = await data.messagesPromise;

			// Setze die geladenen Nachrichten in den Store
			messageStore.set(new Map([[Number(page.params.userId), messages]]));

			// WebSocket verbinden
			connect(authUser.id);

			// Store-Subscription
			unsubscribe = messageStore.subscribe((store) => {
				if (friendUser) {
					messages = store.get(friendUser.id) ?? [];
				}
			});
		} catch (e) {
			console.error('Fehler beim Laden von Daten:', e);
		}
	});

	$effect(() => {
		page.params.userId;
		data.friendUserPromise.then((newFriendUser) => {
			friendUser = newFriendUser;
		});
		data.messagesPromise.then((newMessages) => {
			messages = newMessages;
		});
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<div class="flex h-screen">
	<div class="flex flex-1 flex-col">
		<header>
			<ChatHeader {friendUser} />
		</header>
		<main class="flex flex-1 flex-col overflow-hidden">
			<ChatMain {authUser} {friendUser} {messages} {sendMessage} />
		</main>
	</div>
</div>
