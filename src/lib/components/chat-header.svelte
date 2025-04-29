<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/';
	import type { User } from '$lib/types';

	interface IProp {
		friendUser: User | null;
	}

	let { friendUser }: IProp = $props();
</script>

<header class="top-0 flex items-center gap-2 border-b bg-background p-4">
	{#if friendUser}
		<div class="flex gap-5">
			<Avatar.Root class="h-8 w-8 rounded-lg">
				<Avatar.Image src={friendUser.avatar} alt={friendUser.username} />
				<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
			</Avatar.Root>
		</div>

		<span class="truncate font-semibold">{friendUser.username}</span>
	{:else}
		<div class="flex gap-5">
			<Skeleton class="h-8 w-8 rounded-lg" />
			<Skeleton class="w-[250px]" />
		</div>
	{/if}
</header>
