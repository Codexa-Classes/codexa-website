// Mock data for authentication testing
const mockUsers = {
  validUser: {
    email: "test@example.com",
    mobile: "9876543210",
    password: "TestPassword123!",
    full_name: "Test User"
  },
  invalidUser: {
    email: "invalid@example.com",
    mobile: "1234567890",
    password: "WrongPassword"
  },
  adminUser: {
    email: "admin@example.com",
    mobile: "9876543211",
    password: "AdminPassword123!",
    full_name: "Admin User"
  }
};

const loginCredentials = {
  valid: {
    email_or_mobile: "test@example.com",
    password: "TestPassword123!"
  },
  invalid: {
    email_or_mobile: "test@example.com",
    password: "WrongPassword"
  }
};

module.exports = {
  mockUsers,
  loginCredentials
};
