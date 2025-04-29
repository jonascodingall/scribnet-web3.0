import type { Message, User } from '$lib/types';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch, locals }) => {
	// Parallele Requests für User und Nachrichten
	const [userRes, messagesRes] = await Promise.all([
		fetch(`http://localhost:8000/users/${params.userId}`),
		fetch(`http://localhost:8000/messages/${params.userId}/${locals.authUser!.id}`)
	]);

	// Fehlerbehandlung
	if (!userRes.ok) {
		throw error(userRes.status, 'User nicht gefunden');
	}
	if (!messagesRes.ok) {
		throw error(messagesRes.status, 'Nachrichten konnten nicht geladen werden');
	}

	// JSON parsen
	const user: User = await userRes.json();
	const messages: Message[] = await messagesRes.json();

	// Promises für den Client zurückgeben
	return {
		friendUserPromise: Promise.resolve(user),
		messagesPromise: Promise.resolve(messages)
	};
};
