import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { extractErrorMessage, ErrorResponse } from './extractErrorMessage';

jest.mock('axios', () => {
  return {
    ...jest.requireActual('axios'),
    isAxiosError: (error: any) => {
      return !!(error && error.isAxiosError)
    }
  }
});

describe('extractErrorMessage', () => {
  it('should extract error message from AxiosError', () => {
    const errorResponse: ErrorResponse = { error: 'Test error message' };
    const axiosError: AxiosError<ErrorResponse> = {
      isAxiosError: true,
      toJSON: () => ({}),
      config: { headers: new Map() as unknown as AxiosRequestHeaders },
      name: '',
      message: '',
      response: {
        data: errorResponse,
        status: 400,
        statusText: '',
        headers: new Map() as unknown as AxiosRequestHeaders,
        config: { headers: new Map() as unknown as AxiosRequestHeaders },
      },
    };

    expect(extractErrorMessage(axiosError, 'Default error message')).toBe('Test error message');
  });

  it('should return default error message when response is not an AxiosError', () => {
    const regularError = new Error('Regular error message');
    expect(extractErrorMessage(regularError, 'Default error message')).toBe('Default error message');
  });

  it('should return default error message when AxiosError has no response', () => {
    const axiosError: AxiosError<ErrorResponse> = {
      isAxiosError: true,
      toJSON: () => ({}),
      config: { headers: new Map() as unknown as AxiosRequestHeaders },
      name: '',
      message: '',
    };

    expect(extractErrorMessage(axiosError, 'Default error message')).toBe('Default error message');
  });
});
