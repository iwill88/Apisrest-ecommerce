const logRequestInfo = (request, response, next) => {
    console.log(`METODO: ${request.method} ${request.path}`);
    next();
  }
  
export default logRequestInfo