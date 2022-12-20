const service = require('./credentials.json')
const FieldValue = require('firebase-admin').firestore.FieldValue;

var admin = require("firebase-admin");

var serviceAccount = service


const FirebaseConnection = async () => {
    try{
       
        
        const app = () => {admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        })};

        app()
        
        console.log('Base Firebase conectada')
        
        try {
            //const db = admin.firestore();
            /*const carritos = db.collection("carritos").doc("y6Hhel9ZmElTNt09p66f")
            const guardado = await carritos.update({ productos: FieldValue.arrayUnion(
                {"id":1,"timestamp":"20/10/2022","title":"Escuadra","description":"Escuadra nueva","code":20001100,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png","price":5,"stock":3}
            )});*/

            /*const productos = db.collection("productos")
            const guardado = await productos.add({"id":2,"timestamp":"20/11/2022","title":"Calculadora","description":"Calculadora nueva","code":2000110,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png","price":10,"stock":1})

            console.log("hola",guardado)*/

        } catch (error) {
            console.log(`Error en operación de base de datos ${error}`)
        }
       

    } catch (error) {
        console.log(`Error de conexión a la base de datos de Firebase ${error}`)
    }
}

module.exports = {FirebaseConnection, FieldValue}