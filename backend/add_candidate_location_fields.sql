-- Add city and state fields to candidates table
-- Run this script to update the database schema

ALTER TABLE candidates 
ADD COLUMN city VARCHAR(100) NULL,
ADD COLUMN state VARCHAR(100) NULL;

-- Update existing records with sample data (optional)
-- You can modify these values as needed
UPDATE candidates 
SET 
    city = CASE 
        WHEN address LIKE '%San Francisco%' THEN 'San Francisco'
        WHEN address LIKE '%New York%' THEN 'New York'
        WHEN address LIKE '%Los Angeles%' THEN 'Los Angeles'
        WHEN address LIKE '%Chicago%' THEN 'Chicago'
        ELSE 'Unknown'
    END,
    state = CASE 
        WHEN address LIKE '%CA%' OR address LIKE '%California%' THEN 'California'
        WHEN address LIKE '%NY%' OR address LIKE '%New York%' THEN 'New York'
        WHEN address LIKE '%IL%' OR address LIKE '%Illinois%' THEN 'Illinois'
        ELSE 'Unknown'
    END
WHERE city IS NULL OR state IS NULL;

-- Verify the changes
SELECT id, full_name, address, city, state, pincode 
FROM candidates 
LIMIT 5;
