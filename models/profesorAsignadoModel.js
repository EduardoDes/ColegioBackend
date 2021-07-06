const {Schema , model} = require('mongoose');

const ProfesorAsignadoSchema = Schema({

    profesor: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    asignatura: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Asignatura'
    }
},{ collection: 'ProfesoresAsignados'})

ProfesorAsignadoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('ProfesorAsignado', ProfesorAsignadoSchema);