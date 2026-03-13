import { z } from 'zod'

export const studentSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().includes('@', { message: 'Email must contain @' }),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  gender: z.enum(['male', 'female'], { required_error: 'Select a gender' }),
})
