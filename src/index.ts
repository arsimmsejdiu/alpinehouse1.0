import express from "express";
import bodyParser from "body-parser";
const app = express();
import { listings } from './listings';

const port = 1992;

app.use(bodyParser.json())
//Listings Routes
app.get('/listings', (_req, res) => {
  return res.send(listings);
})
//Delete Listings
app.post('/delete-listings', (req,res) => {
  const id: String = req.body.id;
  for( let i = 0 ; i < listings.length ; i++ ) {
    if(listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }
  return res.send("Failed to delete listings ... ... ... ")
})

app.listen(port);
console.log(`[app]: http://localhost:${port}`);

//folder 2 modulo 1
