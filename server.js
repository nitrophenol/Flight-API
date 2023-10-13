const express=require('express');
const app=express();
const port=process.env.PORT || 3001;
const bodyParser=require('body-parser');
const axios = require('axios');
require('dotenv').config();
const moment=require('moment');
const cors=require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
}
app.post('/', async (req,res) => {
let data;
let start=req.body.start;
let destination=req.body.destination;
let dat=req.body.date;
console.log(dat);
let  date=new Date(dat);
let d=moment(date);
let d2=d.toString();
d2=d2.slice(4,15);
let mon=d2.slice(0,3);
console.log(months[mon]);
let dx=`${d2.slice(7,11)}-${months[mon]}-${d2.slice(4,6)}`;
 let org="";
 let dest="";
 date=dx;
const option = await {
  method: 'GET',
  url: 'https://skyscanner44.p.rapidapi.com/autocomplete',
  params: {query: start},
  headers: {
    'X-RapidAPI-Key': process.env.KEY,
    'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
  }
};
try {
	const response = await axios.request(option);
	console.log(response.data[0].iata_code);
  org=response.data[0].iata_code;
} catch (error) {
	console.error(error);
}
const optio = {
  method: 'GET',
  url: 'https://skyscanner44.p.rapidapi.com/autocomplete',
  params: {query: destination},
  headers: {
    'X-RapidAPI-Key': process.env.KEY,
    'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
  }
};
try {
	const response = await axios.request(optio);
	console.log(response.data[0].iata_code);
  dest=response.data[0].iata_code;
} catch (error) {
	console.error(error);
}
  const options = {
    method: 'GET',
    url: 'https://skyscanner44.p.rapidapi.com/search-extended',
    params: {
      adults: '1',
      origin: org,
      destination: dest,
      departureDate: date,
      returnDate: '',
      currency: 'INR',
      stops: '0,1,2',
      duration: '50',
      startFrom: '00:00',
      arriveTo: '23:59',
      returnStartFrom: '00:00',
      returnArriveTo: '23:59',
      locale: 'en-GB',
      market: 'IND'
    },
    headers: {
      'X-RapidAPI-Key': process.env.KEY,
      'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    data=response.data;
  } catch (error) {
    console.error(error);
  }
 price=data.itineraries.results[0].pricing_options[0].price.amount;
 flight=data.itineraries.results[0].legs[0].carriers.marketing[0].name;
 let obj1={};
 for(let i=0;i<data.itineraries.results.length;i++)
  {
    obj1[data.itineraries.results[i].legs[0].carriers.marketing[0].name]=data.itineraries.results[i].pricing_options[0].price.amount;
  }
  console.log(obj1);
  res.send(obj1);
});
app.listen(port,()=>{ console.log(`Server is running on port ${port}`)});


