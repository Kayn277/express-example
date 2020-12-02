import * as redis from 'redis';

export const client = redis.createClient({
	host: 'localhost',
	port: +'6379',
});