import React from 'react'

export const Quinto = () => {
    const promesa = new Promise((resolve, reject) => {
        setTimeout( () => (
            console.log("Dentro de la promesa")
        ), 3000)
    })

    promesa.then(()=>(
        console.log("THEN ")
    ))
    promesa.catch()
  return (
    <div>Quinto</div>
  )
}
