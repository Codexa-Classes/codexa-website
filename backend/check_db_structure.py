from app.database import engine
from sqlalchemy import text

def check_table_structure():
    with engine.connect() as conn:
        # Check users table
        result = conn.execute(text('DESCRIBE users'))
        print('Users table structure:')
        for row in result:
            print(row)
        
        print('\n' + '='*50 + '\n')
        
        # Check if tables exist
        result = conn.execute(text('SHOW TABLES'))
        print('Existing tables:')
        for row in result:
            print(row)

if __name__ == "__main__":
    check_table_structure()
