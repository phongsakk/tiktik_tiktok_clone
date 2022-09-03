import { NextApiResponse, NextApiRequest } from "next";

import { client } from "../../utils/client";
import { searchPostsQuery } from "../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { q } = req.query as { q: string }
    console.log({ api_q: q })

    const videosQuery = searchPostsQuery(q)

    const videos = await client.fetch(videosQuery)

    res.status(200).json(videos)
  }
}