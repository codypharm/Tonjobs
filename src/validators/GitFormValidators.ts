import { ZodIssueCode, strictObject, z } from "zod";

// export const erc20Schema = z.object({
//   token: z.string().min(3, "Please select a valid token"),
//   receiver: z.string().startsWith("0x", "Invalid address entered"),
//   amount: z.string().transform((v) => {
//     const number = Number(v) || 0;
//     if (number <= 0) {
//       throw new z.ZodError([
//         {
//           code: ZodIssueCode.custom, // Or use a relevant built-in code
//           message: "Number must be greater than zero.",
//           path: ["amount"],
//         },
//       ]);
//     }
//     return number.toString();
//   }),
// });
export const jobSchema = z.object({
  orgName: z.string(),
  repoName: z.string(),
});

// export const uniswapSchema = z.object({
//   tokenToPay: z.string().min(3, "Invalid"),
//   tokenToReceive: z.string().min(3, "Invalid"),
//   amtToPay: z.string().transform((v) => {
//     const number = Number(v) || 0;
//     if (number <= 0) {
//       throw new z.ZodError([
//         {
//           code: ZodIssueCode.custom, // Or use a relevant built-in code
//           message: "Number must be greater than zero.",
//           path: ["amtToPay"],
//         },
//       ]);
//     }
//     return number.toString();
//   }),
//   amtToReceive: z.string().optional(),
// });

// export const liquiditySchema = z.object({
//   amount: z.string().transform((v) => {
//     const number = Number(v) || 0;
//     if (number <= 0) {
//       throw new z.ZodError([
//         {
//           code: ZodIssueCode.custom, // Or use a relevant built-in code
//           message: "Number must be greater than zero.",
//           path: ["amount"],
//         },
//       ]);
//     }
//     return number.toString();
//   }),
//   pool: z.string().min(3, "Invalid"),
// });
