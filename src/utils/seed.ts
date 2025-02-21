import db from '../config/connection.js';
import { User } from '../models/index.js';

db.once('open', async () => {
    try {
        const userCheck = await db.db?.listCollections({ name: 'myusers' }).toArray();
        if (userCheck?.length) {
            await db.dropCollection('myusers');
        }
        const thoughtCheck = await db.db?.listCollections({ name: 'mythoughts' }).toArray();
        if (thoughtCheck?.length) {
            await db.dropCollection('mythoughts');
        }
        await User.create([{ username: "KBair", email: "kalabsb@me.com" }, { "username": "Zach", "email": "zachst@me.com" }]);
        console.log('Database Seeded');
    }
    catch{console.error("Error occured while seeding the database!");}
});