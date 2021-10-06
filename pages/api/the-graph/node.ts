import type {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    await axios.post(`http://127.0.0.1:8020`, {});
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}
