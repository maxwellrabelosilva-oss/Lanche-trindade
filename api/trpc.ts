export default async function handler(req: any, res: any) {
  const { query } = req;
  
  // Handle tRPC requests
  if (req.url?.includes('/api/trpc/menu.list')) {
    return res.status(200).json({
      result: {
        data: [
          {
            id: '1',
            name: 'X-Frango',
            description: 'Frango crocante com salada e molho especial',
            price: 22.50,
            category: 'Sanduíches',
          },
          {
            id: '2',
            name: 'X-Bacon',
            description: 'Carne, bacon, queijo derretido',
            price: 25.00,
            category: 'Sanduíches',
          },
        ],
      },
    });
  }

  // Default response
  res.status(404).json({ error: 'Not found' });
}
