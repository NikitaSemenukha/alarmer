// apiController.ts
import { Request, Response } from 'express';
import { dataHandler } from '../../handlers/dataHandler.handler';

/**

Handler for retrieving data.

@param req The request object.

@param res The response object.
*/
export const getData = async (req: Request, res: Response) => {
    try {
        const { mode } = req.query;
        let data;

        if (mode === 'latest') {
            data = await dataHandler.getLatestData();
        } else if (mode === 'history') {
            data = await dataHandler.getHistoryData();
        }

        if (data) {
            res.json(data);
        } else {
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
