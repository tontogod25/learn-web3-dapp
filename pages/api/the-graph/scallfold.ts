import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    fs.readFileSync('./subgraph/punks01/subgraph.yaml', 'utf8');
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
