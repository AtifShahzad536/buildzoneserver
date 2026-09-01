import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const leadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export const serviceSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  category: z.string().min(2),
  shortDescription: z.string().min(10),
  heroDescription: z.string().optional(),
  iconName: z.string().optional(),
  deliverables: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
});

export const blogSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  category: z.string().min(2),
  author: z.string().min(2),
  featuredImage: z.string().url(),
  tags: z.array(z.string()).optional(),
});
