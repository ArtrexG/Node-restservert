// ==================
//Puerto
// ==================

process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV|| 'dev';

let urlDB;

if(process.env.NODE_ENV == 'dev'){
    urlDB ='mongodb://localhost:27017/database';
}else{
    urlDB = "mongodb+srv://ARTREX:xbox3600A@cluster0-oyphd.mongodb.net/cafe"
}

process.env.urlDB = urlDB;