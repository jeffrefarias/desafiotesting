const request = require("supertest");
const server = require("../index");


/*Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
es un arreglo con por lo menos 1 objeto. (3 Puntos)
*/ 
describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        if (response.body.length > 0) {
            expect(response.body).toBeInstanceOf(Array);
        } else {
            expect(response.body).not.toBeInstanceOf(Array);
        }
    });
});

/*Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que
no existe. (2 Puntos)
*/
it("Obteniendo un 404", async () => {
    const response = await request(server).get("/cafes/11").send();
    const status = response.statusCode;
    expect(status).toBe(404);
    expect(response.body).toEqual({ message: "No se encontró ningún cafe con ese id" });
});



/*Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201. (2
Puntos)
*/
it("Enviando un nuevo Cafe", async () => {
    const id = Math.floor(Math.random() * 999);
    const producto = { id, nombre: "Nuevo producto" };
    const response = await request(server).post("/cafes").send(producto);
    const status = response.statusCode;
    expect(status).toBe(201);
    expect(response.body).toContainEqual(producto);
});

/*Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload. (3 Puntos)*/
it('Devuelve 400 al intentar actualiza un id diferente a del payload', async () => {
    const response = await request(server).put('/cafes/1').send({
        id: 10,
        nombre: 'Cafe con distinto payload'
    });

    expect(response.status).toBe(400)
});
