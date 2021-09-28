import type {NextApiRequest, NextApiResponse} from 'next';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    res.status(200).json('ok');
  } catch (error) {
    res.status(500).json(error.message);
  }
}
