import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getApi } from '@/bknd.ts';

export const server = {
  register: defineAction({
    input: z.object({
      email: z.string().email('Please enter a valid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
    handler: async (input, context) => {
      const { email, password } = input;

      try {
        const api = await getApi(context.request.headers, { verify: true, mode: "dynamic" });

        const { data } = await api.auth.register("password", {
          email,
          password,
          role: "default"
        });

        return {
          success: !!data.user,
          message: !!data.user ? 'User registered successfully' : 'User registration failed',
          user: data.user
        };
      } catch (error) {
        console.error('Registration error:', error);
        throw new Error('Registration failed. Please try again.');
      }
    },
  }),

  login: defineAction({
    input: z.object({
      email: z.string().email('Please enter a valid email address'),
      password: z.string().min(1, 'Password is required'),
    }),
    handler: async (input, context) => {
      const { email, password } = input;

      try {
        const api = await getApi(context.request.headers, { verify: true, mode: "dynamic" });
        const { data } = await api.auth.login("password", {
          email,
          password,
        });

        return {
          success: !!data.user,
          message: !!data.user ? 'Login successful' : 'Login failed',
          user: data.user
        };
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Invalid credentials. Please try again.');
      }
    },
  }),
};
