-- Create database (run this in PostgreSQL CLI first)
-- CREATE DATABASE mobile_spa_db;

-- Connect to the database and run this:

-- Create therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cell VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  experience VARCHAR(50),
  speciality VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_date TIMESTAMP,
  earnings_total DECIMAL(10, 2) DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0
);

-- Create applications table for form submissions
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  therapist_id INTEGER REFERENCES therapists(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cell VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  experience VARCHAR(50),
  speciality VARCHAR(100),
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(20) DEFAULT 'pending'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_therapists_email ON therapists(email);
CREATE INDEX IF NOT EXISTS idx_therapists_status ON therapists(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Insert sample data (optional)
INSERT INTO therapists (first_name, last_name, email, cell, experience, speciality, status, earnings_total, sessions_completed, rating)
VALUES 
  ('Thandi', 'Mokoena', 'thandi@example.com', '0711234567', '5+ years', 'Deep Tissue', 'active', 125000, 45, 4.8),
  ('John', 'Smith', 'john@example.com', '0729876543', '3-5 years', 'Sports Massage', 'active', 85000, 32, 4.9),
  ('Sarah', 'Johnson', 'sarah@example.com', '0734567890', '1-3 years', 'Swedish Massage', 'pending', 0, 0, 0)
ON CONFLICT (email) DO NOTHING;