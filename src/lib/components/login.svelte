<script lang="ts">
	// ui
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { Input } from '$lib/components/ui/input/';
	import { Label } from '$lib/components/ui/label/';
	import { Button } from '$lib/components/ui/button/';

	let inputValue = $state('');
</script>

<div class="flex flex-col gap-6">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Anmelden</Card.Title>
			<Card.Description>Geben Sie ihre Email unten an um sich anzumelden</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							bind:value={inputValue}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="password">Passwort</Label>
						<Input id="password" name="password" type="password" />
					</div>
					<Button type="submit" class="w-full">Anmelden</Button>
				</div>
				<div class="flex flex-col">
					<div class="mt-4 text-center text-sm">
						Kein Account?
						<a href="/register" class="underline underline-offset-4">Registrieren</a>
					</div>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
