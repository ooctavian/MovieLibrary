import type { NextApiRequest, NextApiResponse } from 'next'
import fetchTMBDdata from '../../../helpers/fetchTMBDdata';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let id = req.query.id;
    return fetchTMBDdata(`/tv/${id}`)(req,res);
}
