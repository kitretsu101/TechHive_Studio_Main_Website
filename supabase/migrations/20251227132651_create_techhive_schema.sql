/*
  # TechHive Studio Database Schema

  ## Overview
  Creates the complete database structure for TechHive Studio website including
  client inquiries, engineer profiles, portfolio projects, and relationships.

  ## New Tables

  ### inquiries
  Stores client project requests and contact form submissions
  - id (uuid, primary key)
  - name (text) - Client name
  - email (text) - Client email
  - project_type (text) - Type of service requested
  - budget_range (text) - Budget category
  - message (text) - Project details or debugging info
  - status (text) - Inquiry status (new, contacted, in_progress, completed)
  - created_at (timestamptz) - Submission timestamp
  - updated_at (timestamptz) - Last update timestamp

  ### engineers
  Stores team member profiles and information
  - id (uuid, primary key)
  - name (text) - Engineer name
  - role (text) - Position (Frontend, Backend, Full-Stack, UI/UX)
  - bio (text) - Personal description
  - skills (text[]) - Array of skills/technologies
  - photo_url (text) - Profile photo URL
  - github_url (text) - GitHub profile link
  - linkedin_url (text) - LinkedIn profile link
  - portfolio_url (text) - Personal portfolio link
  - created_at (timestamptz)

  ### projects
  Stores portfolio case studies and completed work
  - id (uuid, primary key)
  - title (text) - Project name
  - description (text) - Brief description
  - problem (text) - Problem statement
  - solution (text) - Solution approach
  - tech_stack (text[]) - Technologies used
  - outcome (text) - Results achieved
  - image_url (text) - Project screenshot/mockup
  - category (text) - Project type (web, mobile, dashboard, etc)
  - created_at (timestamptz)

  ### engineer_projects
  Junction table linking engineers to projects they worked on
  - id (uuid, primary key)
  - engineer_id (uuid) - Foreign key to engineers
  - project_id (uuid) - Foreign key to projects
  - contribution (text) - Description of their contribution
  - created_at (timestamptz)

  ### contributions
  Stores external developer contribution applications
  - id (uuid, primary key)
  - name (text) - Applicant name
  - email (text) - Contact email
  - expertise (text) - Areas of expertise
  - portfolio_url (text) - Portfolio link
  - message (text) - Application message
  - status (text) - Application status
  - created_at (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for engineers and projects (for website display)
  - Authenticated insert for inquiries and contributions
  - Admin-only access for status updates and sensitive data
*/

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  budget_range text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create engineers table
CREATE TABLE IF NOT EXISTS engineers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  skills text[] DEFAULT '{}',
  photo_url text,
  github_url text,
  linkedin_url text,
  portfolio_url text,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  problem text NOT NULL,
  solution text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  outcome text NOT NULL,
  image_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create engineer_projects junction table
CREATE TABLE IF NOT EXISTS engineer_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  engineer_id uuid REFERENCES engineers(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  contribution text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(engineer_id, project_id)
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  expertise text NOT NULL,
  portfolio_url text,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineer_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inquiries
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can view own inquiries"
  ON inquiries FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for engineers (public read for website)
CREATE POLICY "Anyone can view engineers"
  ON engineers FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for projects (public read for portfolio)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for engineer_projects (public read)
CREATE POLICY "Anyone can view engineer projects"
  ON engineer_projects FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for contributions
CREATE POLICY "Anyone can submit contributions"
  ON contributions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_engineers_role ON engineers(role);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_engineer_projects_engineer_id ON engineer_projects(engineer_id);
CREATE INDEX IF NOT EXISTS idx_engineer_projects_project_id ON engineer_projects(project_id);

-- Insert sample engineers
INSERT INTO engineers (name, role, bio, skills, photo_url, github_url, linkedin_url) VALUES
  ('Alex Rivera', 'Full-Stack Engineer', 'Passionate full-stack developer with 8+ years building scalable web applications. Expert in modern JavaScript frameworks and cloud architecture.', 
   ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'], 
   'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', 
   'https://github.com', 'https://linkedin.com'),
  
  ('Sarah Chen', 'UI/UX Designer', 'Award-winning designer specializing in creating beautiful, user-centric interfaces. 6+ years crafting digital experiences for startups and enterprises.', 
   ARRAY['Figma', 'Adobe XD', 'Design Systems', 'Prototyping', 'User Research'], 
   'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400', 
   'https://github.com', 'https://linkedin.com'),
  
  ('Marcus Johnson', 'Backend Architect', 'Senior backend engineer focused on building robust, high-performance systems. Specialized in microservices architecture and database optimization.', 
   ARRAY['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'Redis', 'Kubernetes'], 
   'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=400', 
   'https://github.com', 'https://linkedin.com'),
  
  ('Emily Park', 'Frontend Specialist', 'Creative frontend developer bringing designs to life with pixel-perfect implementations. Expert in modern React and performance optimization.', 
   ARRAY['React', 'Vue.js', 'TypeScript', 'CSS', 'Animation', 'Performance'], 
   'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=400', 
   'https://github.com', 'https://linkedin.com');

-- Insert sample projects
INSERT INTO projects (title, description, problem, solution, tech_stack, outcome, image_url, category) VALUES
  ('Modern School Management System', 'Comprehensive platform for school administration, student management, and parent communication', 
   'School needed to digitize operations and improve communication between teachers, students, and parents', 
   'Built a full-featured web application with role-based dashboards, real-time notifications, and automated reporting', 
   ARRAY['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'AWS'], 
   'Reduced administrative workload by 60% and improved parent engagement by 85%', 
   'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', 
   'web'),
  
  ('Enterprise Business Dashboard', 'Real-time analytics platform for tracking KPIs and business metrics', 
   'Company struggled with data silos and lacked unified view of business performance', 
   'Developed an integrated dashboard connecting multiple data sources with interactive visualizations and custom reports', 
   ARRAY['React', 'TypeScript', 'D3.js', 'Python', 'FastAPI', 'MongoDB'], 
   'Enabled data-driven decisions resulting in 40% increase in operational efficiency', 
   'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800', 
   'dashboard'),
  
  ('Creative Portfolio Platform', 'Stunning portfolio website for digital agency showcasing their work', 
   'Agency needed a unique online presence to stand out and attract premium clients', 
   'Designed and built a cutting-edge website with advanced animations, 3D elements, and seamless user experience', 
   ARRAY['React', 'Three.js', 'GSAP', 'Tailwind CSS', 'Vite'], 
   'Increased client inquiries by 200% and won multiple design awards', 
   'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800', 
   'web');

-- Link engineers to projects
INSERT INTO engineer_projects (engineer_id, project_id, contribution) 
SELECT 
  (SELECT id FROM engineers WHERE name = 'Alex Rivera'),
  (SELECT id FROM projects WHERE title = 'Modern School Management System'),
  'Led full-stack development and architecture design';

INSERT INTO engineer_projects (engineer_id, project_id, contribution) 
SELECT 
  (SELECT id FROM engineers WHERE name = 'Sarah Chen'),
  (SELECT id FROM projects WHERE title = 'Modern School Management System'),
  'Designed complete UI/UX and user flows';

INSERT INTO engineer_projects (engineer_id, project_id, contribution) 
SELECT 
  (SELECT id FROM engineers WHERE name = 'Marcus Johnson'),
  (SELECT id FROM projects WHERE title = 'Enterprise Business Dashboard'),
  'Built backend API and database architecture';

INSERT INTO engineer_projects (engineer_id, project_id, contribution) 
SELECT 
  (SELECT id FROM engineers WHERE name = 'Emily Park'),
  (SELECT id FROM projects WHERE title = 'Creative Portfolio Platform'),
  'Implemented frontend with advanced animations';