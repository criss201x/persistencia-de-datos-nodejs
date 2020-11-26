const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prueba', { useNewUrlParser: true, useUnifiedTopology: true })//prueba es la base de datos 
    .then(() => console.log('Conectado a MongoDB'))
    .catch(() => console.log('Error al conectar MongoDB'))



//esquema para mongo     
const esquema = new mongoose.Schema({
    dato1: String,
    dato2: String,
    dato3: Number,
    dato4: Number,
    dato5: Boolean,
    dato6: [String],
    fecha_creacion: { type: Date, default: Date.now }
})
//cuando hablamos de clases dejamos la primera en mayuscula
const Objetico = mongoose.model('objetos', esquema)//el primer parametro es el nombre de la coleccion, el segundo es el equema 




//funciones de crud *********************************************************************************
//crearDocumento()
//getTodos()
//getFiltrar()
//getFiltrarOtros()
//getFiltrarOperadores()
//getFiltrarOperadores2()
//getfiltrarAndOr()
//getContar()
//getPaginacion()
//updateDocumento('5fbfee41d1f01228b079ac10')
//updatePrimero('5fbfee41d1f01228b079ac10')
deleteDocumento('5fbfee41d1f01228b079ac10')
//**************************************************************************************************





//elimina un documento 
async function deleteDocumento(id){
    const result = await Objetico.deleteOne({_id: id})
    console.log('borrado', result)
}




//actualiza el primero
async function updatePrimero(id){
    const resultado = await Objetico.update(
        {_id: id},
        {
            $set:{
                dato1: 'holaaa',
                dato2: 'dato 5'
            }
        }
    )
    console.log(resultado)

}



//actualizar un documento
async function updateDocumento(id){
    const dato = await Objetico.findById(id)
    if(!dato) return

    dato.dato1 = 'holaa'
    dato.dato2 = 'dato 4'

    const resultado = await dato.save()
    console.log(resultado)
}



//paginar resultados, util para grandes volumenes
async function getPaginacion(){
    const numeroPagina = 1
    const tamanioPagina = 2

    const datos = await Objetico
        .find()
        .skip((numeroPagina-1)*tamanioPagina)//intervalo de saltos 
        .limit(tamanioPagina)//cantidad de elementos a ver por pagina
        console.log(datos)
}


//contar documentos (equivalente a tuplas, filas, registros de bd)
async function getContar(){
    const datos = await Objetico
        //.find()
        .find({dato2: 'dato 3'})
        .count()

    console.log(datos)
}



//filtrar con operadores logicos 
async function getfiltrarAndOr(){
    const datos = await Objetico
        .find()
        //.and([{dato1: 'hola'},{dato2:'dato 2'}])//o todos en la cama o todos en el suelo
        .or([{dato1: 'hola'},{dato2:'dato 2'}])//positivo si encuentra alguito al menos 
    console.log(datos)
}


//getFilterPriceInNinCars()
async function getFiltrarOperadores2(){
    const datos = await Objetico
        .find({dato6: {$in: 'esto es otro array'}})//$in busca coincidencias con cualquier de los valores de un array espeficidado
    console.log(datos)
}



//filtro con operadores
async function getFiltrarOperadores(){
    const datos = await Objetico
        .find({dato3: {$gte: 50000, $lt: 70000}})//gte hace referencia a mas grande que e it hace referencia a menor que 

    console.log(datos)
}


//otros filtros 
async function getFiltrarOtros(){
    const datos = await Objetico
    .find({dato2: 'dato 2', dato5: true})
    .sort({dato3: -1})//-1 de mayor a menor o +1 de menor a mayor 
    .limit(2)//limite de registros o tuplas para mostrar 
    .select({dato1: 1, dato2: 1, dato3: 1})//permite mostrar solo algunos campos del documento 

    console.log(datos)
}




//filtrar documentos
async function getFiltrar(){
    const datos = await Objetico.find({dato2: 'dato 2', dato5: true})
    console.log(datos)
}


//leer todos los documentos
async function getTodos(){
    const datos = await Objetico.find()
    console.log(datos)
}




//insertar documento
async function crearDocumento() {
    const datos = new Objetico({
        dato1: 'hola otra vez',
        dato2: 'dato 2',
        dato3: 70000,
        dato4: 2090,
        dato5: true,
        dato6: ['esto es otro array', 'esto es el mismo array'],
    })
    const resultado = await datos.save()//tener especial cuidado de no enviar documentos repetidos ya que mongo los aceptara
    console.log(resultado)//en el resultado ___v0 en mongo hace referencia a la version de la llave, esto es propio de mongoose
} 