const {Schema,model} = require('mongoose');

const AsignaturaSchema = Schema({

    nombre: {
        type : String,
        require: true
    }
}, { collection: 'asignaturas'});

AsignaturaSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Asignatura', AsignaturaSchema);