import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { LoginRequest, User } from '$lib/types';
import bcrypt from 'bcryptjs';

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		// 1. Form-Daten auslesen
		const form = await request.formData();
		const email = form.get('email')?.toString() ?? '';
		let password = form.get('password')?.toString() ?? '';
		// 2. Validierung
		if (!email || !password) {
			return fail(400, { error: 'Bitte E-Mail und Passwort eingeben.' });
		}

		// 3. Aufruf des FastAPI-Endpoints
		const res = await fetch('http://localhost:8000/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password } as LoginRequest)
		});

		// 4. Fehlerbehandlung
		if (!res.ok) {
			const payload = await res.json();
			return fail(res.status, { error: payload.detail || 'Login fehlgeschlagen.' });
		}

		// 5. Antwort parsen und Cookie setzen
		const user: User = await res.json();
		cookies.set('authUser', encodeURIComponent(JSON.stringify(user)), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 1 Woche
		});

		// 6. AthUser setzen
		locals.authUser = user;

		// 7. Weiterleitung nach Login
		throw redirect(303, '/user/2');
	}
};
