import { Request, Response } from 'express';
import path from 'path';

export const getCharts = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html');
    res.sendFile(filePath);
};
