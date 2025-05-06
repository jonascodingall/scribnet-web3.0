<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { onMount, onDestroy } from 'svelte';
	import YouTubeVideo from '$lib/components/video-player.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	let scrolldata: HTMLElement | null = null;

	// Interface für die Listenelemente
	interface ListItem {
		id: number;
		counter: number;
		submittedTexts: string[];
		inputkom: string;
	}

	// Liste der Elemente
	let items: ListItem[] = $state([]);
	// Fortschritt des Doom-Scrollens (0-100%)
	let doomprogress = $state(1); // Fortschritt des Doom-Scrollens (0-100%)

	let alertreaction = $derived(doomprogress >= 100);
	let listupdateorder = $state(0);

	// Erstellt initial einige Listenelemente
	onMount(() => {
		for (let i = 0; i < 10; i++) {
			items.push({
				id: i,
				counter: 0,
				submittedTexts: [],
				inputkom: ''
			});
		}
	});

	// Funktion zum Laden neuer Elemente
	function loadMore() {
		const currentLength = items.length + listupdateorder;
		for (let i = currentLength; i < currentLength + 5; i++) {
			items = [
				...items,
				{
					id: i,
					counter: i,
					submittedTexts: [],
					inputkom: ''
				}
			];
			doomprogress += 0.05;
			if (doomprogress >= 100) {
				doomprogress = 100;
			}
		}
	}

	// Scroll-Handling für das automatische Laden
	function handelscroll() {
		if (scrolldata) {
			const scrollTop = scrolldata.scrollTop;
			const clientHeight = scrolldata.clientHeight;
			const scrollHeight = scrolldata.scrollHeight;

			if (scrollTop + clientHeight >= scrollHeight - 5) {
				loadMore();
				if (items.length >= 20) {
					listupdateorder = listupdateorder + 1;
					items.shift();
				}
			}
		}
	}
	onDestroy(() => {
		if (scrolldata) {
			scrolldata.removeEventListener('scroll', handelscroll);
		}
	});

	// Funktion zum Hinzufügen eines Kommentars
	function handleClick(item: ListItem) {
		if (item.inputkom.trim() !== '') {
			item.submittedTexts = [...item.submittedTexts, item.inputkom]; // Aktualisiert die Liste mit neuer Nachricht
			item.inputkom = ''; // Leert das Eingabefeld
		}
	}
</script>

<!-- UI für die ForYouPage -->
<h1 class="scroll-m-20 place-self-center text-4xl font-extrabold tracking-tight lg:text-5xl">
	Welcome to your ForYouPage
</h1>
<p class="flex min-h-20 scroll-m-5 place-self-center font-extrabold tracking-tight lg:text-3xl">
	Scroll down to begin your scroll of doom
</p>

<Progress value={doomprogress} class="w-[60%] place-self-center" />
{#if alertreaction}
	<Alert.Root>
		<Alert.Title>Hey you reached your {items.length} Video!</Alert.Title>
		<Alert.Description
			>You could stop now but we both know you won't do that so keep it up I guess?
		</Alert.Description>
	</Alert.Root>
{/if}
<ul
	class="h-[77vh] min-h-10 place-self-center overflow-auto"
	onscroll={handelscroll}
	bind:this={scrolldata}
>
	{#each items as item (item.id)}
		<li class="">
			<div class="flex place-self-center">
				<YouTubeVideo />
			</div>
			<div class="flex-item text height-[50vh] place-self-center">
				<ul class=" max-w-100x flex-col place-self-stretch rounded border">
					{#each item.submittedTexts as text}
						<ScrollArea class=" w-[30vw] tracking-tight bg-blend-color">
							{text}
						</ScrollArea>
					{/each}
				</ul>
				<!-- Eingabefeld und Button für Kommentare -->
				<Textarea placeholder="Type your message here." bind:value={item.inputkom} />
				<Button onclick={() => handleClick(item)} class="h-[5vh] w-[44vw] gap-y-40">
					Send message
				</Button>
			</div>
			<br class="min-h-25" />
		</li>
		<br />
	{/each}
</ul>

<style>
	*::-webkit-scrollbar {
		display: none;
	}
	* {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
