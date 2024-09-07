import { NextApiRequest, NextApiResponse } from 'next';
import { submitDish } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Call the API function with authentication
    const result = await submitDish(req.body, true);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error submitting dish:', error);
    res.status(500).json({ message: 'Error submitting dish' });
  }
}