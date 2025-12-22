
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;


app.use(cors()); 
app.use(bodyParser.json());


const SUPABASE_URL = 'https://zjeonchhugvhdkhgsqao.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZW9uY2hodWd2aGRraGdzcWFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjI3ODM4MywiZXhwIjoyMDgxODU0MzgzfQ.ie0fKuCEy6DeoBEZSI-vD7Clq9u3XUrukiK-RVtUmV8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get('/test', async (req, res) => {
  const { data, error } = await supabase.from('favorites').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});


app.get('/favorites', async (req, res) => {
  const { data, error } = await supabase.from('favorites').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});


app.post('/favorites', async (req, res) => {
  const { meal_id, meal_name, meal_thumb } = req.body;
  console.log('Received POST:', req.body); // debug

  if (!meal_id || !meal_name || !meal_thumb) {
    return res.status(400).json({ error: 'Missing meal data' });
  }

  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ meal_id, meal_name, meal_thumb }]);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: err.message });
  }
});


app.delete('/favorites/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('favorites').delete().eq('meal_id', id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
