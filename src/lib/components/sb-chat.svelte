<script lang="ts">
	// ui
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button';

	// stores
	import { goto } from '$app/navigation';
	import type { User } from '$lib/types';

	interface IProp {
		allUsers: User[];
	}
	let { allUsers }: IProp = $props();
</script>

<Sidebar.Root collapsible="none" class="hidden flex-1 md:flex">
	<Sidebar.Header class="border-b p-5">
		<span>Chats</span>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group class="px-0">
			<Sidebar.GroupContent>
				{#each allUsers as user}
					<Button
						variant="ghost"
						class="flex w-full justify-start px-5 py-10"
						href={`/user/${user.id}`}
					>
						<Avatar.Root class="h-12 w-12 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.username} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="flex flex-col items-start">
							<span>{user.username}</span>
							<span class="text-xs">{user.email}</span>
						</div>
					</Button>
				{/each}
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
