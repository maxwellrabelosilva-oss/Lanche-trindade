import fs from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
  // For API routes
  if (req.url?.startsWith('/api/')) {
    if (req.url.includes('/api/trpc/menu.list')) {
      return res.status(200).json({
        result: {
          data: [
            {
              id: '1',
              name: 'X-Frango',
              description: 'Frango crocante com salada',
              price: 22.50,
              category: 'Sanduíches',
            },
          ],
        },
      });
    }
    return res.status(404).json({ error: 'Not found' });
  }

  // Serve SPA
  try {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    const content = fs.readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
}
