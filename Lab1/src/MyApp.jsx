import React from 'react'
import {heroes} from './data/heroes.js'

export const MyApp = () => {
    const nombre = 'Jorge'
    const apellido = 'Perez'
    const nombreCom = `${nombre} ${apellido}`
    const elemento = <h1>Hello, {nombre}</h1>


    const estudiante = {
        matricula: 'A000001',
        nombre: 'Jorge',
        edad: '20',
        dirección: {
        ciudad: 'Mty',
        zip: 64800
        }
        };
        //console.table(estudiante);
        const estudiante2 ={...estudiante};
        estudiante2.nombre ='Ramon';
        //console.log (estudiante);
        //console.log (estudiante2);

    //console.log(elemento)
    //console.log(`Este es un texto: ${getSaludo("Rafa")}`)

    const arreglo = [1,2,3,5,5]
    arreglo.push('hh')
    let arreglo2 = [...arreglo, 78]

    let doubles = arreglo2.map(function(x){
        return x*2
    })

    console.log(arreglo)
    console.log(arreglo2)
    console.log(doubles)
    
    const saludo = (nombre) => `Hola ${nombre}`
    const saludo2 = (nombre) => {
        return `Hola ${nombre}`
    }
    console.log(saludo('holaa'))
    console.log(heroes)

    const getHeroeById = (id) => heroes.find((heroe)=> heroe.id===id)
    console.log(getHeroeById(2))

    const getHeroeByEmpresa = (empresa) => heroes.find((heroe)=> heroe.owner===empresa)
    console.log(getHeroeByEmpresa('Marvel'))

}

// function saludo(nombre){
//     return 'Hola ' + nombre;
// }