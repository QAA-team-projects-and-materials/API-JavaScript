import supertest from "supertest";
import { faker } from "@faker-js/faker";

const request = supertest("https://gorest.co.in/public-api");
const TOKEN = 
    "6fc03d210d2afad24cbcee1c75547f463a55537e9bb95ab3670966ed86a2fe5a";

export const createRandomUserWithFaker = async () => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        gender:"female",
        status: 'inactive',
    };

    const res = await request
        .post(`/users?access-token=${TOKEN}`)
        .send(userData);

        console.log(res.body);
    return res.body.data.id;
};