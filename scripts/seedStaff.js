// Works without dotenv package - reads .env.local directly
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  const fallbackPath = path.join(process.cwd(), '.env');

  let envFile = envPath;
  if (!fs.existsSync(envPath)) {
    envFile = fallbackPath;
  }

  if (fs.existsSync(envFile)) {
    const envConfig = fs.readFileSync(envFile, 'utf8');
    envConfig.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    });
  }
}

// Load environment variables
loadEnv();

const staffMembers = [
  {
    name: 'James Harrison',
    role: 'Lead Personal Trainer',
    specialty: 'Strength & Conditioning',
    age: 34,
    gender: 'Male',
    bio: 'Former college athlete turned certified trainer with 12 years of experience. Specializes in functional training and Olympic lifting. James believes in building sustainable fitness habits that last a lifetime.',
    image:
      'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=400&h=400&fit=crop',
    funFact: 'Deadlifted 500 lbs at age 50 and still going strong!',
    isActive: true,
  },
  {
    name: 'Sarah Chen',
    role: 'Personal Trainer',
    specialty: 'HIIT & Weight Loss',
    age: 28,
    gender: 'Female',
    bio: 'Certified nutrition coach and HIIT specialist who transformed her own life through fitness. Sarah combines high-intensity workouts with sustainable nutrition plans to help clients achieve lasting results.',
    image:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop',
    funFact: 'Completed 10 marathons across 5 continents before age 30!',
    isActive: true,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Personal Trainer',
    specialty: 'Athletic Performance',
    age: 31,
    gender: 'Male',
    bio: 'Former professional soccer player with expertise in sports performance and agility training. Marcus helps athletes of all levels unlock their peak performance through science-based programming.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop',
    funFact: 'Can hold a plank for 10 minutes straight (yes, really)!',
    isActive: true,
  },
  {
    name: 'Emily Thompson',
    role: 'Massage Therapist',
    specialty: 'Sports & Deep Tissue',
    age: 36,
    gender: 'Female',
    bio: 'Licensed massage therapist with 14 years of experience in sports medicine. Emily specializes in deep tissue work and myofascial release to help athletes recover faster and perform better.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    funFact:
      'Knows over 20 different massage techniques from around the world!',
    isActive: true,
  },
  {
    name: 'Dr. Kevin Park',
    role: 'Injury Rehabilitation Specialist',
    specialty: 'Physical Therapy & Recovery',
    age: 42,
    gender: 'Male',
    bio: 'Doctor of Physical Therapy with dual certification in orthopedic and sports rehabilitation. Dr. Park has helped hundreds of clients recover from injuries and return to their active lifestyles stronger than before.',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    funFact: 'Recovered from a career-ending injury to run an ultramarathon!',
    isActive: true,
  },
];

// Define the Staff schema inline
const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  specialty: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  funFact: { type: String },
  isActive: { type: Boolean, default: true },
  availability: { type: Map, of: [String], default: {} },
  createdAt: { type: Date, default: Date.now },
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

async function seedStaff() {
  try {
    // Check for MongoDB URI
    if (!process.env.MONGODB_URI) {
      console.error(
        '\n✗ Error: MONGODB_URI not found in environment variables'
      );
      console.log('\nPlease make sure you have either:');
      console.log(
        '  • .env.local file with MONGODB_URI=your_connection_string'
      );
      console.log('  • .env file with MONGODB_URI=your_connection_string\n');
      process.exit(1);
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing staff
    const deleteResult = await Staff.deleteMany({});
    console.log(
      `✓ Cleared ${deleteResult.deletedCount} existing staff members`
    );

    // Insert staff members
    const result = await Staff.insertMany(staffMembers);
    console.log(`✓ Successfully seeded ${result.length} staff members:\n`);

    // Display created staff
    result.forEach((staff) => {
      console.log(`  • ${staff.name} (${staff.role}) - ${staff.specialty}`);
    });

    console.log('\n✓ Database seeding completed successfully!');

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding staff:');
    console.error(error.message);
    if (error.name === 'MongooseError') {
      console.log('\nTip: Check your MONGODB_URI connection string');
    }
    process.exit(1);
  }
}

// Run the seed function
seedStaff();
