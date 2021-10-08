import type {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

export default async function node(
  _req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    const response = await axios.get(
      `http://localhost:8000/subgraphs/name/punks`,
    );
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
