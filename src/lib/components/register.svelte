<script lang="ts">
	// ui
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/';
	import { Input } from '$lib/components/ui/input/';
	import { Label } from '$lib/components/ui/label/';
</script>

<div class="flex flex-col gap-6">
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-2xl">Registrieren</Card.Title>
			<Card.Description>Geben Sie ihre Email unten an um sich Registrieren</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input id="username" name="username" placeholder="maxidermustermann" />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" name="email" type="email" placeholder="m@example.com" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Passwort</Label>
						<Input id="password" name="password" type="password" />
					</div>
					<Button type="submit" class="w-full">Registrieren</Button>
					<div class="mt-4 text-center text-sm">
						Schon ein Account?
						<a href="/login" class="underline underline-offset-4">Anmelden</a>
					</div>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
