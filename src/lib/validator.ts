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
    location: z.string().min(1, { message: "Location is required" }),
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
  textarea: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be at most 500 characters long" }),
  designation: z
    .string()
    .min(1, { message: "Your designation is required" })
    .max(50, { message: "Designation must be at most 50 characters long" })
    .optional(),
});

const socialProfilesSchema = z.object({
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url(),
  telegram: z.string().url(),
});

const experienceSchema = z.object({
  // start_date: z.string().min(1, { message: "Start date is required" }),
  // end_date: z.string().min(1, { message: "End date is required" }),
  // is_working: z.boolean(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Work Description is required" }),
});

const educationSchema = z.object({
  year_of_graduation: z.coerce
    .number()
    .gte(new Date().getFullYear() - 100, {
      message: "Graduation year cannot be before 1922",
    })
    .lte(new Date().getFullYear() + 6, {
      message: "Graduation year cannot be more than 6 years in the future",
    })
    .or(z.null()),
  gpa: z.coerce.number().gte(0, { message: "CGPA cannot be 0" }),
});

const generalSchema = z.object({
  gender_self_describe: z
    .string()
    .min(1, { message: "Field must not be empty" })
    .optional(),
  pronouns_self_describe: z
    .string()
    .min(1, { message: "Field must not be empty" })
    .optional(),
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
  experienceSchema,
  educationSchema,
  generalSchema,
};
