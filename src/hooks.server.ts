import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	let authUser: User | null = null;

	// Cookie über event.cookies abrufen (kein manuelles Parsen nötig)
	const authCookie = event.cookies.get('authUser');

	if (authCookie) {
		try {
			// User-Daten aus Cookie als JSON parsen
			const parsed: User = JSON.parse(decodeURIComponent(authCookie));
			authUser = parsed;
		} catch {
			console.warn('Ungültiges authUser-Cookie, verwende Default-User');
		}
	}

	// authUser in locals speichern
	event.locals.authUser = authUser;

	// Anfrage weiterleiten
	const response = await resolve(event);

	return response;
};
