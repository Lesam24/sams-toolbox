import {
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const shorturls = pgTable("short_urls", {
    id: serial("id").primaryKey(),

    code: varchar("code", {
        length: 20,
    }).notNull().unique(),

    originalUrl: varchar("original_url", {
        length: 2048,
    }).notNull(),

    clickCount: integer("click_count")
    .notNull()
    .default(0),

    createdAt: timestamp("created_at")
    .notNull()
    .defaultNow(),
});