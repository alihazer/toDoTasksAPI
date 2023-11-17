import app from './app/app.js';
import http from 'http';


const server = http.createServer(app);

server.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});