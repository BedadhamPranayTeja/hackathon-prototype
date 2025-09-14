import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, smallint, integer, real, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  displayName: text("display_name"),
  bio: text("bio"),
  location: text("location"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Skills table
export const skills = pgTable("skills", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// User skills junction table
export const userSkills = pgTable("user_skills", {
  userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: 'cascade' }),
  level: smallint("level"), // 1-5
});

// Hackathons table
export const hackathons = pgTable("hackathons", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title"),
  description: text("description"),
  startAt: timestamp("start_at"),
  endAt: timestamp("end_at"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").default(sql`now()`),
  isPublic: boolean("is_public").default(true),
});

// Hackathon tags
export const hackathonTags = pgTable("hackathon_tags", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const hackathonTagMap = pgTable("hackathon_tag_map", {
  hackathonId: uuid("hackathon_id").references(() => hackathons.id),
  tagId: integer("tag_id").references(() => hackathonTags.id),
});

// Teams table
export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: uuid("hackathon_id").references(() => hackathons.id, { onDelete: 'cascade' }),
  name: text("name"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Team members
export const teamMembers = pgTable("team_members", {
  teamId: uuid("team_id").references(() => teams.id, { onDelete: 'cascade' }),
  userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }),
  role: text("role"),
  contributionScore: real("contribution_score").default(0),
  joinedAt: timestamp("joined_at").default(sql`now()`),
});

// Applications
export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  hackathonId: uuid("hackathon_id").references(() => hackathons.id, { onDelete: 'cascade' }),
  applicantUser: uuid("applicant_user").references(() => users.id),
  teamId: uuid("team_id").references(() => teams.id),
  status: text("status").default('pending'), // pending/accepted/rejected
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Rounds
export const rounds = pgTable("rounds", {
  id: integer("id").primaryKey(),
  hackathonId: uuid("hackathon_id").references(() => hackathons.id),
  name: text("name"),
  dueAt: timestamp("due_at"),
});

// Submissions
export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  roundId: integer("round_id").references(() => rounds.id),
  teamId: uuid("team_id").references(() => teams.id),
  submitter: uuid("submitter").references(() => users.id),
  repoUrl: text("repo_url"),
  liveUrl: text("live_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Evaluations
export const evaluations = pgTable("evaluations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: uuid("submission_id").references(() => submissions.id),
  judgeId: uuid("judge_id").references(() => users.id),
  score: real("score"),
  comments: text("comments"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertHackathonSchema = createInsertSchema(hackathons).omit({
  id: true,
  createdBy: true,
  createdAt: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdBy: true,
  createdAt: true,
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  submitter: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertHackathon = z.infer<typeof insertHackathonSchema>;
export type Hackathon = typeof hackathons.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Round = typeof rounds.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Evaluation = typeof evaluations.$inferSelect;
