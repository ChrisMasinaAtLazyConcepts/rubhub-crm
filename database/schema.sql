-- Create therapists table
CREATE TABLE IF NOT EXISTS therapists (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cell VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  qualification_path VARCHAR(500),
  experience VARCHAR(50),
  speciality VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_therapists_email ON therapists(email);
CREATE INDEX idx_therapists_cell ON therapists(cell);
CREATE INDEX idx_therapists_status ON therapists(status);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_therapists_updated_at 
BEFORE UPDATE ON therapists 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();