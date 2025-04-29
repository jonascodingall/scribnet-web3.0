export type User = {
	id: number;
	username: string;
	email: string;
	avatar: string;
	status: 'online' | 'offline';
};

export type LoginRequest = {
	email: string;
	password: string;
};

export type RegisterRequest = {
	username: string;
	email: string;
	password: string;
};

export type Message = {
	senderId: number;
	receiverId: number;
	content: string;
	timestamp: number;
};
