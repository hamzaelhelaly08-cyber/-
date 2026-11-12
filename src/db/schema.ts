import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  fullName: text('full_name'),
  role: text('role').default('client_manager'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const mealOrders = pgTable('meal_orders', {
  id: serial('id').primaryKey(),
  orderCode: text('order_code').notNull(),
  clientName: text('client_name').notNull(),
  serviceCategory: text('service_category').notNull(),
  mealCount: integer('meal_count').notNull(),
  branchCode: text('branch_code').default('EG'),
  notes: text('notes'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});
