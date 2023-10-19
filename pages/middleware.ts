import { authMiddleware as clerkAuthMiddleware } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';

// Specify the API routes you want to exclude from auth middleware
const excludedRoutes = ['/api/route1', '/api/route2'];

export const authMiddleware = (handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    // Use Clerk middleware unless it's an excluded route
    if (!excludedRoutes.includes(req.url!)) {
        return clerkAuthMiddleware()(req, res, handler);
    } else {
        return handler(req, res);
    }
};

export default authMiddleware;