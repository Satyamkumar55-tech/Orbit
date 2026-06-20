This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Troubleshooting MongoDB

If you see a connection error like `ECONNREFUSED` or `MongoDB connection failed` when calling the API (`/api/startup`), check the following:

- Ensure the `MONGODB_URI` environment variable is set in `..env.local` (or `.env.local`) at the project root and points to a valid MongoDB Atlas URI or local MongoDB instance.
- If using MongoDB Atlas, confirm your cluster is running and your IP address is allowed in the Network Access (IP whitelist).
- Make sure your network allows outbound connections to MongoDB Atlas (`mongodb.net`) on the required ports.
- For local development, you can run a local MongoDB (e.g., using `mongod` or Docker) and set `MONGODB_URI=mongodb://localhost:27017/your-db-name`.
- After updating `.env.local`, restart the Next.js dev server so environment variables are reloaded.

If the issue persists, run the API route locally and inspect server logs for the exact error message.
