<script lang="ts">
	// ui
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	// svelte
	import { goto, invalidateAll } from '$app/navigation';
	import type { User } from '$lib/types';
	import SidebarUserMenu from './sidebar-user-menu.svelte';

	interface IProp {
		authUser: User;
		navData: any;
		activeItem: any;
	}

	let { authUser, navData, activeItem = $bindable() }: IProp = $props();
</script>

<Sidebar.Root collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navData.navMain as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								tooltipContentProps={{
									hidden: false
								}}
								onclick={() => {
									activeItem = item;
									goto(item.url);
								}}
								isActive={activeItem.title === item.title}
							>
								{#snippet tooltipContent()}
									{item.title}
								{/snippet}
								<item.icon />
								<span>{item.title}</span>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<SidebarUserMenu user={authUser} />
	</Sidebar.Footer>
</Sidebar.Root>
