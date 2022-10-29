export const users = [
    {
        nombre: "Fernando Escobar",
        email: "prueba@prueba.com",
        cuenta: 1,
        password: "5432",
        saldo: 300,
        log: [
        {
            fecha: new Date(),
            monto: 100,
            type: "deposito"
        },
        {
            fecha: new Date("2022-10-27T00:38:50.932Z"),
            monto: 200,
            type: "deposito"
        },
        ]    
    },
    {
        nombre: "Erika Galindo",
        email: "prueba2@prueba.com",
        cuenta: 2,
        password: "1234",
        saldo: 1000,
        log: [
        {
            fecha: new Date(),
            monto: 900,
            type: "deposito"
        },
        {
            fecha: new Date("2022-10-27T00:38:50.932Z"),
            monto: 200,
            type: "deposito"
        },
        {
            fecha: new Date("2022-10-26T13:25:50.932Z"),
            monto: -100,
            type: "retiro"
        }
        ]
    }
]