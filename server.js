import  app from "./app.js";
import cluster from "cluster";
import os from "os";

import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 8081;


const modo = process.env.MODO == "";

if (modo && cluster.isPrimary){
    const numCPUs = os.cpus().length
      
      console.log(`Número de procesadores: ${numCPUs}`)
      console.log(`PID MASTER ${process.pid}`)
  
      for(let i=0; i<numCPUs; i++) {
          cluster.fork()
      }
  
      cluster.on('exit', worker => {
          console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
          cluster.fork()
      })
  }
  
  else {
  
    const server = app.listen(PORT, () => {
      console.log(`https://localhost:${PORT}`);
    })
  
    server.on("error", (error) => console.log(error.message));
  
  }