// api/main.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description required' });
    }

    const { data, error } = await supabase
      .from('help')
      .insert({ name, description });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ success: true, data });
  } else if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('help')
      .select('*')
      .order('id', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
