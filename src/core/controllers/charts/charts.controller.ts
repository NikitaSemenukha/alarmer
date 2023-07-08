import { Request, Response } from 'express';
import path from 'path';

/**

Handler for serving the charts page.
@param req The request object.
@param res The response object.
*/
export const getCharts = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html');
    res.sendFile(filePath);
};
