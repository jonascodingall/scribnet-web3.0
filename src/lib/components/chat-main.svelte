<script lang="ts">
	import { Input } from './ui/input';
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';
	import ChatMessage from './chat-message.svelte';
	import type { User, Message } from '$lib/types';
	import Skeleton from './ui/skeleton/skeleton.svelte';

	interface Props {
		authUser: User;
		friendUser: User | null;
		messages: Message[];
		sendMessage: (receiverId: number, msg: string) => void;
	}

	let { authUser, friendUser, messages, sendMessage }: Props = $props();

	let newMessage = $state('');

	function submitMessage() {
		if (!friendUser || !newMessage.trim()) return;
		sendMessage(friendUser.id, newMessage.trim());
		newMessage = '';
	}
</script>

{#if friendUser}
	<ScrollArea class="flex-1 p-4">
		<div class="flex flex-col space-y-4">
			{#each messages as message (message.timestamp)}
				<div class="flex">
					<ChatMessage {message} received={message.senderId !== authUser.id} />
				</div>
			{/each}
		</div>
	</ScrollArea>
{:else}
	<Skeleton />
{/if}

<Separator />
<div class="p-4">
	<Input
		bind:value={newMessage}
		placeholder="Nachricht eingeben..."
		class="w-full"
		onkeydown={(e) => e.key === 'Enter' && submitMessage()}
	/>
</div>
