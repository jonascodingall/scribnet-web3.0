import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { User, RegisterRequest } from '$lib/types';

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		// 1. Form-Daten auslesen
		const form = await request.formData();
		const username = form.get('username')?.toString() ?? '';
		const email = form.get('email')?.toString() ?? '';
		const password = form.get('password')?.toString() ?? '';

		// 2. Validierung
		if (!username || !email || !password) {
			return fail(400, { error: 'Alle Felder sind erforderlich.' });
		}

		// 3. Aufruf des FastAPI-Endpoints
		const res = await fetch('http://localhost:8000/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password } as RegisterRequest)
		});

		// 4. Fehlerbehandlung
		if (!res.ok) {
			const payload = await res.json();
			return fail(res.status, { error: payload.detail || 'Registrierung fehlgeschlagen.' });
		}

		// 5. Antwort parsen und Cookie setzen
		const user: User = await res.json();
		cookies.set('authUser', encodeURIComponent(JSON.stringify(user)), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7
		});

		// 6. AthUser setzen
		locals.authUser = user;

		// 7. Weiterleitung nach erfolgreicher Registrierung
		throw redirect(303, '/home');
	}
};
