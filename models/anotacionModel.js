const {Schema , model} = require('mongoose');

const AnotacionSchema = Schema({

    fecha: {
        type : Date,
        require : true
    },
    alumno: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Alumno'
    },
    asignatura: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Asignatura'
    },
    profesor: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    anotacion: {
        type : String,
        require : true
    },
    positiva: {
        type : Boolean,
        require : true
    }
},{ collection: 'anotaciones'})

AnotacionSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Anotacion', AnotacionSchema);