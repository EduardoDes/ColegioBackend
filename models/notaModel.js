const {Schema , model} = require('mongoose');

const NotaSchema = Schema({

    nota: {
        type : Number,
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
    fecha: {
        type : Date,
        require : true
    }
},{ collection: 'notas'})

NotaSchema.method('toJSON', function() {
    const {__v, _id,alumno, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Nota', NotaSchema);