// ================================================================
//  SUPABASE CONFIG — Replace with your Supabase project credentials
// ================================================================
//  HƯỚNG DẪN:
//  1. Vào https://supabase.com → Sign in (GitHub account được)
//  2. Tạo project → đặt tên (vd: void-bit), database password, region asia-southeast1
//  3. Vào SQL Editor → chạy đoạn SQL bên dưới
//  4. Vào Database → Replication → bật Real-time cho bảng threads, messages, direct_messages, users
//     (hoặc chạy: ALTER PUBLICATION supabase_realtime ADD TABLE threads;
//                  ALTER PUBLICATION supabase_realtime ADD TABLE messages;
//                  ALTER PUBLICATION supabase_realtime ADD TABLE direct_messages;)
//  5. Vào Project Settings > API → copy URL + anon key vào đây
// ================================================================
//  SQL (chạy trong Supabase SQL Editor):
//  -----------------------------------------
//  CREATE TABLE IF NOT EXISTS threads (
//    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//    title TEXT NOT NULL,
//    author TEXT NOT NULL DEFAULT 'Anonymous',
//    created_at TIMESTAMPTZ DEFAULT now(),
//    last_activity_at TIMESTAMPTZ DEFAULT now(),
//    reply_count INT DEFAULT 0
//  );
//
//  CREATE TABLE IF NOT EXISTS messages (
//    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//    thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
//    author TEXT NOT NULL DEFAULT 'Anonymous',
//    content TEXT NOT NULL,
//    created_at TIMESTAMPTZ DEFAULT now()
//  );
//
//  CREATE TABLE IF NOT EXISTS direct_messages (
//    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//    sender TEXT NOT NULL,
//    recipient TEXT NOT NULL,
//    content TEXT NOT NULL,
//    created_at TIMESTAMPTZ DEFAULT now()
//  );
//
//  CREATE TABLE IF NOT EXISTS users (
//    username TEXT PRIMARY KEY,
//    password_hash TEXT NOT NULL,
//    display_name TEXT NOT NULL DEFAULT '',
//    avatar_url TEXT NOT NULL DEFAULT '',
//    created_at TIMESTAMPTZ DEFAULT now()
//  );
//
//  ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
//  ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
//  ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
//  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
//
//  DO $$ BEGIN
//    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_all' AND tablename = 'threads') THEN
//      CREATE POLICY "anon_all" ON threads FOR ALL USING (true) WITH CHECK (true);
//    END IF;
//    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_all' AND tablename = 'messages') THEN
//      CREATE POLICY "anon_all" ON messages FOR ALL USING (true) WITH CHECK (true);
//    END IF;
//    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_all_dm' AND tablename = 'direct_messages') THEN
//      CREATE POLICY "anon_all_dm" ON direct_messages FOR ALL USING (true) WITH CHECK (true);
//    END IF;
//    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_all_users' AND tablename = 'users') THEN
//      CREATE POLICY "anon_all_users" ON users FOR ALL USING (true) WITH CHECK (true);
//    END IF;
//  END $$;
// ================================================================

var SUPABASE_URL = 'https://amcuddpczwixylrlhxru.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY3VkZHBjendpeHlscmxoeHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTk0NjksImV4cCI6MjEwMDI3NTQ2OX0.ruTbGNW8h6rJh21Lcl1LUFZVHR6SzuuKLoRxW91Duyk';

var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
