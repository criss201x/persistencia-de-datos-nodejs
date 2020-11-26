const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prueba2', { useNewUrlParser: true, useUnifiedTopology: true })//prueba es la base de datos 
    .then(() => console.log('Conectado a MongoDB'))
    .catch(() => console.log('Error al conectar MongoDB'))

const miEsquema = new mongoose.Schema({
    dato1: {
        type: String,
        required: true,//si el campo va vacio no lo deja guardar
        lowercase: true,//ppara minusculas unicamente
        //uppercase: true,//ppara mayusculas unicamente
        trim: true,//
        minlength: 2,//minuma longitud del campo
        maxlength: 99,// maxima longitud
        enum: ['opcion 1', 'opcion 2'],// solo deja ingresar estos dos nombres 
    },
    dato2: String,
    dato3: Boolean,
    dato4: {
        type: Number,
        required: function(){
            return this.dato3
        }
    },
    dato5: {
        type: Number,
        min: 2000,
        max: 2030,
        get: y => Math.round(y)//redondea al entero mas cercano 
    },
    dato6: [String],
    dato7: {type: Date, default: Date.now},
})

const Objeto = mongoose.model('datos', miEsquema)


crearDocumento()

async function crearDocumento(){
    const datos = new Objeto({
        dato1: 'opcion 2',
        dato2: 'X7',        
        dato4: 2029,
        dato5: 2050,
        dato6:['4*4']
    })
    try{
        const resultado = await datos.save()
        console.log(resultado)
    }catch(e){
        console.group('error al agregar: ',e.message)
    }
    
}

//para mas informacion de validaciones consultar https://mongoosejs.com/docs/validation.html