const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const usersCollection = mongoose.connection.collection('users');

    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'ChangeMe123!';
    const firstName = process.argv[4] || 'Admin';
    const lastName = process.argv[5] || 'User';
    const role = process.argv[6] || 'Admin';

    const existing = await usersCollection.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);

    const res = await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashed,
      role,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin user created with id:', res.insertedId.toString());
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

run();
