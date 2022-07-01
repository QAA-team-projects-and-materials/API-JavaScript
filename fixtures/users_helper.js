import supertest from "supertest";

const request = supertest("https://gorest.co.in/public-api");
const TOKEN = 
    "6fc03d210d2afad24cbcee1c75547f463a55537e9bb95ab3670966ed86a2fe5a";

export const createRandomUser = async () => {
    const userData = {
        email:`Test-${Math.floor(Math.random()* 9999)}@gmail.com`,
        name: 'Test name',
        gender:"female",
        status: 'inactive',
    };

    const res = await request
        .post(`/users?access-token=${TOKEN}`)
        .send(userData)
    return res.body.data.id;
};