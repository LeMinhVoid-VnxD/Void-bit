// ================================================================
//  SUPABASE CONFIG — Replace with your Supabase project credentials
// ================================================================
//  HƯỚNG DẪN:
//  1. Vào https://supabase.com → Sign in (GitHub account được)
//  2. Tạo project → đặt tên (vd: void-bit), database password, region asia-southeast1
//  3. Vào SQL Editor → chạy đoạn SQL bên dưới
//  4. Vào Project Settings > API → copy URL + anon key vào đây
// ================================================================
//  SQL (chạy trong Supabase SQL Editor):
//  -----------------------------------------
//  CREATE TABLE threads (
//    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//    title TEXT NOT NULL,
//    author TEXT NOT NULL DEFAULT 'Anonymous',
//    created_at TIMESTAMPTZ DEFAULT now(),
//    last_activity_at TIMESTAMPTZ DEFAULT now(),
//    reply_count INT DEFAULT 0
//  );
//
//  CREATE TABLE messages (
//    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//    thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
//    author TEXT NOT NULL DEFAULT 'Anonymous',
//    content TEXT NOT NULL,
//    created_at TIMESTAMPTZ DEFAULT now()
//  );
//
//  ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
//  ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
//  CREATE POLICY "anon_all" ON threads FOR ALL USING (true) WITH CHECK (true);
//  CREATE POLICY "anon_all" ON messages FOR ALL USING (true) WITH CHECK (true);
// ================================================================

var SUPABASE_URL = 'https://amcuddpczwixylrlhxru.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY3VkZHBjendpeHlscmxoeHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTk0NjksImV4cCI6MjEwMDI3NTQ2OX0.ruTbGNW8h6rJh21Lcl1LUFZVHR6SzuuKLoRxW91Duyk';

var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
