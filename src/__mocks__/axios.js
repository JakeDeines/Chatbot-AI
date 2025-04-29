export default {
    post: jest.fn(() => Promise.resolve({ data: { choices: [{ text: 'Mocked response' }] } })),
  };
  