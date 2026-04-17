export default async function handler(req: any, res: any) {
  // Redirect to the built index.js server
  res.status(501).json({
    message: "API endpoint not implemented in this setup. Please use localhost:3000 for API calls.",
  });
}
