import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .max(50, { message: "Email must be at most 50 characters long" }),
});

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one symbol."
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string(),
});

const recruiterSignupFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z
      .string()
      .email()
      .max(50, { message: "Email must be at most 50 characters long" }),
    working_email: z
      .string()
      .email()
      .max(50, { message: "Working email must be at most 50 characters long" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one symbol."
      ),
    confirm_password: z.string(),
    how_heard_about_codeunity: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const seekerSignupFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z
      .string()
      .email()
      .max(50, { message: "Email must be at most 50 characters long" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one symbol."
      ),
    confirm_password: z.string(),
    location: z.string(),
    experience: z.coerce
      .number()
      .gte(0, { message: "Experience must be a non-negative number" })
      .lte(50, { message: "Experience must be at most 50 years" }),
    how_heard_about_codeunity: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const postJobSchema = z.object({
  company_name: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  email4jobappl: z.string().email(),
  apply_url: z.string().url(),
});

const aboutSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  last_name: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" }),
  email: z
    .string()
    .email()
    .max(50, { message: "Email must be at most 50 characters long" }),
  textarea: z.string().min(1, { message: "This field is required" }),
  designation: z.string().optional(),
});

const socialProfilesSchema = z.object({
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url(),
  telegram: z.string().url(),
});

export {
  forgotPasswordSchema,
  resetPasswordSchema,
  loginFormSchema,
  recruiterSignupFormSchema,
  seekerSignupFormSchema,
  postJobSchema,
  aboutSchema,
  socialProfilesSchema,
};
