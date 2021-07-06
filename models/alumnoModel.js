const {Schema , model} = require('mongoose');

const AlumnoSchema = Schema({

    nombre: {
        type : String,
        require : true
    },
    email : {
        type: String,
        unique : true
    },
    imagen : {
        type : String,
        require : true
    },
    fechaNacimiento : {
        type : Date
    },
    fechaIngreso : {
        type : Date,
        require : true
    },
    curso: {
        required : true,
        type : Schema.Types.ObjectId,
        ref: 'Curso'
    },
    apoderado : {
        required : true,
        type : Schema.Types.ObjectId,
        ref : 'Apoderado'
    }
},{ collection: 'alumnos'})

AlumnoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Alumno', AlumnoSchema);