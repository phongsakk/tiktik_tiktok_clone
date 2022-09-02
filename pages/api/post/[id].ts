import type { NextApiRequest, NextApiResponse } from 'next'

import { PostPayload } from '../../../types'
import { client } from '../../../utils/client'
import { allPostsQuery, postDetailQuery } from '../../../utils/queries'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query
    if (!id) return
    const query = postDetailQuery(id)
    const data = await client.fetch(query)
    res.status(200).json(data[0])
  }
}