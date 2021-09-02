const listaElementos = [
    {
    row: 0,
    rut: "12807041-9",
    nombre: "Jos",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 1,
    rut: "27200878-7",
    nombre: "Andres",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 2,
    rut: "15728867-9",
    nombre: "David",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 3,
    pasaporte: "ABCD1234",
    nombre: "Carla",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 4,
    rut: "8596164-0",
    nombre: "Sofia",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 5,
    pasaporte: 123456,
    nombre: "Marcos",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 6,
    rut: "9399898-7",
    nombre: "Jorge Luis",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  },
  {
    row: 7,
    rut: "12807041-9",
    nombre: "Jos",
    apellidoPaterno: "Melo",
    apellidoMaterno: "Rella",
    correo: "test@test.cl",
  }];

const problemas = {}
const dataResult = listaElementos.filter((item) => {
    if(item.rut != undefined){
        if(problemas[item.rut] === undefined){
            problemas[item.rut] = [{row : item.row, value : item.rut}]
        } else {
            problemas[item.rut].push({row : item.row, value : item.rut})
        }
    }
    return true
})
//console.log(Object.entries(problemas).find(element => element.length > 1))
console.log(problemas["12807041-9"])