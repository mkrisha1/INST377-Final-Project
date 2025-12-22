const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('help.html');
});

app.get('/customers', async (req, res) => {
  console.log('Attempting to GET all descriptions');

  const { data, error } = await supabase.from('customer').select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
    return;
  } else {
    res.send(data);
  }
});

app.post('/help', async (req, res) => {
  console.log('Request:', req.body);

  const name = req.body.name;
  const description = req.body.description;


  const { data, error } = await supabase
    .from('help')
    .insert({
      help_name: name,
      help_description: description,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
    return;
  } else {
    res.send(data);
  }
  res.send(req.body);
});

app.listen(port, () => {
  console.log('App is available on port:', port);
});