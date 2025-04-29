<script lang="ts" module>
	import SbChat from '$lib/components/sb-chat.svelte';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import House from '@lucide/svelte/icons/house';

	const navData = {
		navMain: [
			{
				title: 'Home',
				url: '/home',
				icon: House,
				sidebar: null,
				isActive: true
			},
			{
				title: 'Chats',
				url: '/user/1',
				icon: MessageCircle,
				sidebar: SbChat,
				isActive: false
			}
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import SbBase from '$lib/components/sb-base.svelte';
	import type { LayoutProps } from './$types';

	let activeItem = $state(navData.navMain[1]);
	let sidebarTwoRef = $state();

	let { data, children }: LayoutProps = $props();

	let { authUser, allUsers } = data;
</script>

<Sidebar.Provider
	style="--sidebar-width: 350px;"
	class="transition-all"
	open={activeItem.sidebar !== null}
>
	<Sidebar.Root collapsible="icon" class="[&>[data-sidebar=sidebar]]:flex-row">
		<SbBase {authUser} {navData} bind:activeItem />
		{#if activeItem.sidebar}
			<activeItem.sidebar {allUsers} />
		{/if}
	</Sidebar.Root>
	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
