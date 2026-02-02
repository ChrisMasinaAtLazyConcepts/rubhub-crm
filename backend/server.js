const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/qualifications';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || '35.239.182.6',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'rubhub',
  user: process.env.DB_USER || 'rubhub_user',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create therapists table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS therapists (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cell VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    qualification_path VARCHAR(500),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`).catch(err => console.log('Table creation note:', err.message));

// Therapist signup API
app.post('/api/therapists/signup', upload.single('qualification'), async (req, res) => {
  try {
    const { firstName, lastName, email, cell, whatsapp } = req.body;
    const qualificationFile = req.file;

    // Validate required fields
    if (!firstName || !lastName || !email || !cell) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: firstName, lastName, email, cell' 
      });
    }

    let qualificationPath = null;
    if (qualificationFile) {
      qualificationPath = `/uploads/qualifications/${qualificationFile.filename}`;
    }

    // Save to PostgreSQL
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `INSERT INTO therapists (
          first_name, 
          last_name, 
          email, 
          cell, 
          whatsapp, 
          qualification_path, 
          status
        ) VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING id`,
        [
          firstName,
          lastName,
          email,
          cell,
          whatsapp || cell,
          qualificationPath,
        ]
      );

      res.status(200).json({ 
        success: true, 
        message: 'Application submitted successfully',
        therapistId: result.rows[0].id
      });

    } catch (dbError) {
      if (dbError.code === '23505') { // Unique violation
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
      throw dbError;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error saving therapist data:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});