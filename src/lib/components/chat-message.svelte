<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import type { Message } from '$lib/types';

	interface IProp {
		message: Message;
		received: boolean;
	}

	let { message, received = false }: IProp = $props();
</script>

<div class="{received ? 'mr-auto' : 'ml-auto'} mb-4 max-w-[75%] p-[0.8rem]">
	<Card.Root class="w-fit rounded-[1rem]">
		<Card.Content
			class="{received ? 'bg-[hsl(var(--chat-received))]' : 'bg-[hsl(var(--chat-sent))]'}
				 break-all 
				 rounded-[1rem] 
				 p-2 "
		>
			{message.content}
		</Card.Content>
	</Card.Root>
</div>
