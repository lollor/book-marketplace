import z from 'zod';

export const User = z.object({
   username: z.string().trim().min(3).max(20).regex(/^(?=.*[a-z])[a-z0-9_]+$/),
   password: z.string().trim().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%?&])[a-zA-Z0-9@$!%?&]{8,}$/).optional(),
   email: z.string().trim().email(),
   name: z.string().trim().min(3).max(30),
   surname: z.string().trim().min(3).max(30),
   citta: z.string().trim().min(2).max(40).optional(),
   provider: z.enum(["credentials", "google"]),
   img_id: z.string().trim().optional(),
   idGoogle: z.string().trim().optional(),
});

export const Login = z.object({
   username: z.string().trim(),
   password: z.string().trim()
})