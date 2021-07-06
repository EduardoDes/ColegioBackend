const {Schema , model} = require('mongoose');

const ApoderadoSchema = Schema({

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
    }
},{ collection: 'apoderados'})

ApoderadoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Apoderado', ApoderadoSchema);