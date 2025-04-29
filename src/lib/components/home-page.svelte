<script lang="ts">
	import VideoPlayer from '$lib/components/video-player.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { onMount, onDestroy } from 'svelte';

	let scrolldata: HTMLElement = document.createElement('ul');
	// Definiere ein Interface für unsere Elemente
	interface ListItem {
		id: number;
		counter: number;
		submittedTexts: string[];
		inputkom: string;
	}

	let items: ListItem[] = $state([]);

	// Erstelle initial einige Listenelemente
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
	function loadMore() {
		const currentLength = items.length;
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
		}
	}

	function handelscroll() {
		if (scrolldata) {
			// scrollTop: vertikaler Scrollwert (in Pixeln) des Containers
			const scrollTop = scrolldata.scrollTop;
			// clientHeight: sichtbare Höhe des Containers
			const clientHeight = scrolldata.clientHeight;
			// scrollHeight: Gesamthöhe des Inhalts (möglicherweise größer als clientHeight)
			const scrollHeight = scrolldata.scrollHeight;

			// Debug-Ausgaben
			console.log('scrollTop:', scrollTop);
			console.log('clientHeight:', clientHeight);
			console.log('scrollHeight:', scrollHeight);

			// Prüfen, ob der Benutzer am (nahezu) Ende des Contents angekommen ist,
			// also wenn scrollTop + clientHeight fast gleich scrollHeight ist.
			if (scrollTop + clientHeight >= scrollHeight - 5) {
				loadMore();
			}
		}
	}

	onDestroy(() => {
		if (scrolldata) {
			scrolldata.removeEventListener('scroll', handelscroll);
		}
	});
	// Funktion, um ein Feld individuell zu behandeln
	function handleClick(item: ListItem) {
		if (item.inputkom.trim() !== '') {
			item.submittedTexts.push(item.inputkom);
			item.inputkom = '';
		}
	}
</script>

<ul
	class="flex h-[100vh] flex-col place-self-center overflow-auto"
	onscroll={handelscroll}
	bind:this={scrolldata}
>
	{#each items as item (item.id)}
		<li class="li">
			<h2 class="flex-item h-[10vh] w-[44vw] gap-y-10 place-self-center bg-secondary">
				Custom Title
			</h2>
			<div class="flex place-self-center">
				<VideoPlayer />
			</div>
			<div class="flex-item text height-[50vh] w-[44vw] gap-y-10 place-self-center">
				<ul class="flex place-self-center">
					{#each item.submittedTexts as text}
						<li class="gap-5">{text}</li>
					{/each}
				</ul>
				<Textarea placeholder="Type your message here." bind:value={item.inputkom} />
				<Button onclick={() => handleClick(item)} class="h-[5vh] w-[44vw] gap-y-40">
					Send message
				</Button>
			</div>
		</li>
	{/each}
</ul>
