import { redirect, type Cookies } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		logout(locals, cookies);
	}
};

export const load = async ({ locals, cookies }) => {
	logout(locals, cookies);
};

function logout(locals: App.Locals, cookies: Cookies) {
	locals.authUser = null;
	cookies.delete('authUser', { path: '/' });
	throw redirect(303, '/');
}
