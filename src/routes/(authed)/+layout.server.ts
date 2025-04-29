import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.authUser) {
		redirect(303, '/login');
	}

	const allUsersRes = await Promise.resolve(fetch(`http://localhost:8000/users`));

	if (!allUsersRes.ok) {
		throw error(allUsersRes.status, 'Es konnten keine Users gefunden werden');
	}

	const users: User[] = await allUsersRes.json();

	return {
		authUser: locals.authUser,
		allUsers: users
	};
};
