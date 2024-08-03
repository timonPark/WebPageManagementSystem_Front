import { NextApiRequest, NextApiResponse } from 'next';
import {Get, LOCATOR, Post} from "@/app/utils/axios";

const removeApiPrefix = (path: string) => {
  const prefix = '/api';
  if (path.startsWith(prefix)) {
    return path.substring(prefix.length);
  }
  return path;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { email } = req.query;
  req.body
  const url: string = removeApiPrefix(req.url as string);
  try {
    const result = await Post(
      LOCATOR.backend + url,
      req.body,
    );
    const data = result.data;
    res.status(202).json({  ...data });
  } catch(error) {
    const errorObj: any = error;
    res.status(400).json({ message: errorObj.response.data.message });
  }

}