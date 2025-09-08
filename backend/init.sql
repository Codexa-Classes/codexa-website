-- Initialize the database with some sample data
USE codexa_db;

-- Create admin user (password: admin123)
INSERT INTO users (email, username, hashed_password, full_name, is_active, is_admin) 
VALUES (
    'admin@codexa.com', 
    'admin', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8.8.8.8', 
    'Admin User', 
    TRUE, 
    TRUE
);

-- Insert sample courses
INSERT INTO courses (title, description, duration, price, instructor, is_active) VALUES
('Python Programming', 'Complete Python programming course from basics to advanced', '3 months', '₹15,000', 'Dr. Viraj Kadam', TRUE),
('Data Science with Python', 'Learn data science using Python, pandas, numpy, and scikit-learn', '4 months', '₹20,000', 'Prof. Aarush Wagh', TRUE),
('Web Development', 'Full-stack web development with React and Node.js', '6 months', '₹25,000', 'Ms. Ananya Kulkarni', TRUE),
('Machine Learning', 'Introduction to machine learning algorithms and applications', '5 months', '₹22,000', 'Dr. Chaitanya Wagh', TRUE);

-- Insert sample jobs
INSERT INTO jobs (title, company, location, description, requirements, salary_range, is_active) VALUES
('Python Developer', 'TCS', 'Pune', 'Looking for Python developer with 2+ years experience', 'Python, Django, SQL, Git', '₹6-10 LPA', TRUE),
('Data Scientist', 'Infosys', 'Mumbai', 'Data scientist position for analytics team', 'Python, R, SQL, Machine Learning', '₹8-12 LPA', TRUE),
('Full Stack Developer', 'HCL', 'Bangalore', 'Full stack developer for web applications', 'React, Node.js, MongoDB, AWS', '₹7-11 LPA', TRUE);
