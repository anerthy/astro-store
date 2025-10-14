import { db, Role, User } from 'astro:db';
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs';

// https://astro.build/db/seed
export default async function seed() {
	
	const roles = [
		{ id: 'admin', name: 'Administrator' },
		{ id: 'user', name: 'User' }
	];

	const JohnDoe = {
		id: uuid(),
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: bcrypt.hashSync('123456'),
		createdAt: new Date(),
		role: 'admin'
	};

	const JaneDoe = {
		id: uuid(),
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		password: bcrypt.hashSync('123456'),
		createdAt: new Date(),
		role: 'user'
	};

	await db.insert(Role).values(roles);
	await db.insert(User).values([JohnDoe, JaneDoe]);

}
