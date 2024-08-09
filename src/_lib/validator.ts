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
    phone_number: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters long" })
      .max(10, { message: "Phone number must be at most 10 characters long" }),
    // looking_for: z.string(),
    // hiring_skills:z.string(),
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
    experience: z
      .string()
      .min(0, { message: "Experience must be at least 0" })
      .max(3, { message: "Experience must be at most 100" }),
    phone_number: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters long" })
      .max(10, { message: "Phone number must be at most 10 characters long" }),
    // technical_skills:z.string(),
    how_heard_about_codeunity: z.string(),
    location: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const postJobSchema = z
  .object({
    company_name: z.string().min(1, { message: "Company name is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    emptype: z.string(),
    primtg: z.string(),
    tags: z.array(z.string()),
    locns: z.string(),
    minSal: z.number(),
    maxSal: z.number(),
    desc: z.string().min(1, { message: "Job description is required" }),
    benefits: z.string(),
    how2apply: z.string(),
    email4jobappl: z.string().email(),
    apply_url: z.string().url(),
    feedback: z.string(),
  })
  .refine((data) => data.minSal <= data.maxSal, {
    message: "Minimum salary must be less than or equal to maximum salary",
    path: ["minSal", "maxSal"],
  });

export {
  forgotPasswordSchema,
  resetPasswordSchema,
  loginFormSchema,
  recruiterSignupFormSchema,
  seekerSignupFormSchema,
  postJobSchema,
};
