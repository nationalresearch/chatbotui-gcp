import { withSession } from '@clerk/clerk-sdk-node/nextjs';

// Here's a Next.js API Route
export default withSession((req, res) => {
  const { session } = req;
  // You now have access to `session` in your API Route.
});