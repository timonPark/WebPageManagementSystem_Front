import { NextApiRequest, NextApiResponse } from 'next';
import {Get, LOCATOR} from "@/app/utils/axios";

const removeApiPrefix = (path: string) => {
  const prefix = '/api';
  if (path.startsWith(prefix)) {
    return path.substring(prefix.length);
  }
  return path;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { email } = req.query;
  const url: string = removeApiPrefix(req.url as string);
  try {
    const result = await Get(
      LOCATOR.backend + url,
    );
    const data = result.data;
    res.status(202).json({  ...data });
  } catch(error) {
    const errorObj: any = error;
    res.status(400).json({ message: errorObj.response.data.message });
  }

}