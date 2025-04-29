import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.authUser) {
		throw redirect(303, '/login');
	}
	redirect(303, '/user/1');
};
