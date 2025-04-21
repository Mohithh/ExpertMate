export async function POST(request) {
    try {
      const data = await request.json();
      // Here you would typically save to a database
      // For now, we'll just return the received data
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to process request' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }