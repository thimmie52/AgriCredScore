// pages/api/save-user.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const dataFile = path.join(process.cwd(), 'data.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const newEntry = req.body;
      const fileData = await fs.readFile(dataFile, 'utf-8');
      const json = JSON.parse(fileData || '[]');
      json.push(newEntry);
      await fs.writeFile(dataFile, JSON.stringify(json, null, 2));
      return res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}
