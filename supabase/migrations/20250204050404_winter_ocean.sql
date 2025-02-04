/*
  # Create user details table
  
  1. New Tables
    - `user_details`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `primary_use_case` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
  
  2. Security
    - Enable RLS on `user_details` table
    - Add policies for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS user_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  primary_use_case text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now()
);

ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON user_details
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
  ON user_details
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);