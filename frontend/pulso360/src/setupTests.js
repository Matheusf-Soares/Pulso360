// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock global axios to avoid ESM parsing issues in Jest
jest.mock('axios', () => {
	const mockInstance = {
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
		patch: jest.fn(),
		interceptors: {
			request: { use: jest.fn(), eject: jest.fn() },
			response: { use: jest.fn(), eject: jest.fn() }
		}
	};
	const axios = {
		create: jest.fn(() => mockInstance),
		...mockInstance
	};
	return axios;
});
