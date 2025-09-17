// Mock data for authentication testing
function generateMockUsers() {
  const timestamp = Date.now();
  return {
    validUser: {
      email: `test${timestamp}@example.com`,
      mobile: `9876543${timestamp.toString().slice(-3)}`,
      password: "TestPassword123!",
      full_name: "Test User"
    },
    invalidUser: {
      email: "invalid@example.com",
      mobile: "1234567890",
      password: "WrongPassword"
    },
    adminUser: {
      email: `admin${timestamp}@example.com`,
      mobile: `9876543${(timestamp + 1).toString().slice(-3)}`,
      password: "AdminPassword123!",
      full_name: "Admin User"
    }
  };
}

const mockUsers = generateMockUsers();

const loginCredentials = {
  valid: {
    email_or_mobile: mockUsers.validUser.email,
    password: "TestPassword123!"
  },
  invalid: {
    email_or_mobile: mockUsers.validUser.email,
    password: "WrongPassword"
  }
};

module.exports = {
  mockUsers,
  loginCredentials
};
