const { createClient } = require('@supabase/supabase-js');

export default async function handler(req, res) {
  // Allow requests from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the recipe data from the request
    const { meal_id, meal_name, meal_thumb, category } = req.body;

    // Check if recipe already exists
    const { data: existing } = await supabase
      .from('favorite_recipes')
      .select('*')
      .eq('meal_id', meal_id)
      .single();

    if (existing) {
      return res.status(200).json({ 
        success: true, 
        message: 'Recipe already saved',
        data: existing 
      });
    }

    // Save to database
    const { data, error } = await supabase
      .from('favorite_recipes')
      .insert([
        { meal_id, meal_name, meal_thumb, category }
      ])
      .select();

    if (error) throw error;

    return res.status(200).json({ 
      success: true, 
      message: 'Recipe saved successfully!',
      data 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}