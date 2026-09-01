import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Industry from '../models/Industry.js';
import Project from '../models/Project.js';
import CaseStudy from '../models/CaseStudy.js';
import Blog from '../models/Blog.js';
import Career from '../models/Career.js';
import Lead from '../models/Lead.js';
import Team from '../models/Team.js';
import FAQ from '../models/FAQ.js';
import Testimonial from '../models/Testimonial.js';
import Technology from '../models/Technology.js';
import Setting from '../models/Setting.js';
import { seedData } from './seedData.js';

dotenv.config();

const connect = async () => {
  return await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buildzone');
};

const importData = async () => {
  try {
    await connect();
    console.log('🔄 Connected to database for seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Service.deleteMany();
    await Industry.deleteMany();
    await Project.deleteMany();
    await CaseStudy.deleteMany();
    await Blog.deleteMany();
    await Career.deleteMany();
    await Lead.deleteMany();
    await Team.deleteMany();
    await FAQ.deleteMany();
    await Testimonial.deleteMany();
    await Technology.deleteMany();
    await Setting.deleteMany();

    // 1. Create Default Admin User
    await User.create({
      name: 'BuildZone Architect',
      email: 'admin@buildzone.tech',
      password: 'admin123456',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    });

    // 2. Insert master collections
    await Service.insertMany(seedData.services);
    await Industry.insertMany(seedData.industries);
    await Technology.insertMany(seedData.technologies);
    await Project.insertMany(seedData.projects);
    await CaseStudy.insertMany(seedData.caseStudies);
    await Blog.insertMany(seedData.blogs);
    await Career.insertMany(seedData.careers);
    await Lead.insertMany(seedData.leads);
    await Team.insertMany(seedData.team);
    await FAQ.insertMany(seedData.faqs);
    await Testimonial.insertMany(seedData.testimonials);
    await Setting.create(seedData.settings);

    console.log('🎉 Database Successfully Populated with BuildZone Master Data!');
    console.log('🔑 Default Admin Login: admin@buildzone.tech / admin123456');
    process.exit(0);
  } catch (error) {
    console.error('💥 Seeding Error:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connect();
    await mongoose.connection.dropDatabase();
    console.log('🗑️ Database Wiped Successfully.');
    process.exit(0);
  } catch (error) {
    console.error('💥 Destroy Error:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
