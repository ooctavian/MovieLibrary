import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import axios from 'axios'
import runMiddleware from './runMiddleware'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

function make_url(endpoint:string,query:Data):string{
    let request_url = `${process.env.TMBD_API_URL}${endpoint}?api_key=${process.env.TMBD_API_KEY}`;
    if(query!=={}){
        for(let key in query)
            request_url = `${request_url}&${key}=${query[key]}`;
    }

    return request_url;
}

export function fetchApi(endpoint:string,req:NextApiRequest):Promise{
   return axios(make_url(endpoint,req));
}

export default function makeHandler(endpoint:string){
    return async function(
        req: NextApiRequest,
        res: NextApiResponse
    ) {
        await runMiddleware(req, res, cors);


        return new Promise((resolve,reject)=>{
            fetchApi(endpoint,req.query)
                .then(response=>
                    {
                        res.json(response.data);
                        resolve();
                    })
                .catch(error =>{
                    res.json(error);
                    res.status(405).end();
                    resolve();
                })
        }) }
}
