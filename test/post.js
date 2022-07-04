import request from '../config/common.js';
import {faker} from '@faker-js/faker';

import { expect } from "chai";
import { createRandomUserWithFaker } from "../fixtures/users_helper.js";

const TOKEN = 
        "6fc03d210d2afad24cbcee1c75547f463a55537e9bb95ab3670966ed86a2fe5a";

describe("User Posts", () => {

    let postId, userId;

    before(async ()=>{
        //userId = await createRandomUser();
        userId = await createRandomUserWithFaker();
    });

    it("/posts", async () => {

        const data = {
            user_id: userId,
            title: faker.lorem.sentence(),
            body: faker.lorem.sentence(),
        };
        
        const postRes = await request
        .post(`/posts?access-token=${TOKEN}`)
        .send(data);
        
        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;
    });

    it("GET /posts/:id", async () => {
        await request
        .get(`/posts/${postId}?access-token=${TOKEN}`)
        .expect(200);
    })

    describe('Negative tests', () => {
        it('401 Authentification failed',async () =>{
            const data = {
                user_id: userId,
                title: 'my title',
                body:'my blog post',
            };
            
            const postRes = await request.post(`/posts`).send(data);
            
            console.log(postRes.body);
            expect(postRes.body.code).to.eq(401);
            expect(postRes.body.data.message).to.eq('Authentication failed');
        });

        it('422 Validation failed', async () =>{
            const data = {
                user_id: userId,
                title: 'my title',
            };
            
            const postRes = await request
                .post(`/posts?access-token=${TOKEN}`)
                .send(data);

            expect(postRes.body.code).to.eq(422);
            expect(postRes.body.data[0].field).to.eq('body');
            expect(postRes.body.data[0].message).to.eq("can't be blank");
        });

    })
})