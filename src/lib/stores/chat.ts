import type { Message } from '$lib/types';
import { writable } from 'svelte/store';

export const messageStore = writable<Map<number, Message[]>>(new Map());

let socket: WebSocket;
let authUserId: number;

export function connect(newAuthUserId: number) {
	if (socket) {
		disconnect();
	}

	authUserId = newAuthUserId;
	socket = new WebSocket(`ws://localhost:8000/messages/${authUserId}`);

	socket.addEventListener('message', (event) => {
		const msg: Message = JSON.parse(event.data);
		const other = msg.senderId;

		messageStore.update((value) => {
			const existing = value.get(other) ?? [];
			value.set(other, [...existing, msg]);
			return new Map(value);
		});
	});

	socket.addEventListener('open', () => console.log('Connected'));

	socket.addEventListener('close', () => console.log('WebSocket getrennt'));
	socket.addEventListener('error', (e) => console.error('WS-Error', e));
}

export function disconnect() {
	if (socket) {
		socket.close();
	}
}

export function sendMessage(receiverId: number, msg: string) {
	const message: Message = {
		receiverId: receiverId,
		senderId: authUserId,
		content: msg,
		timestamp: Date.now()
	};

	messageStore.update((value) => {
		const existing = value.get(receiverId) ?? [];
		value.set(receiverId, [...existing, message]);
		return new Map(value);
	});

	socket.send(JSON.stringify(message));
}
