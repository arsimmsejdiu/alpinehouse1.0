import express from "express";
const app = express();
import { listings } from './listings';

const port = 1992;

app.get("/", (_req, res) => {
  res.send("hello from simple server :)");
});
//Listings Routes
app.get('/listings', (_req, res) => {
  return res.send(listings);
})
//Delete Listings
app.delete('/listings/:id', (_req,res) => {
  
})

app.listen(port);
console.log(`[app]: http://localhost:${port}`);

//folder 1 modulo 9
