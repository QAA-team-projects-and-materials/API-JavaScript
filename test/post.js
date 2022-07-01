import supertest from "supertest";
import { expect } from "chai";
import { createRandomUser } from "../fixtures/users_helper.js";

const request = supertest("https://gorest.co.in/public-api");
const TOKEN = 
"6fc03d210d2afad24cbcee1c75547f463a55537e9bb95ab3670966ed86a2fe5a";

describe.only("User Posts", () => {

    let postId, userId;

    before(async ()=>{
        userId = await createRandomUser();
    });

    it("/posts", async () => {

        const data = {
            user_id: userId,
            title: 'my title',
            body:'my blog post',
        };
        
        const postRes = await request
        .post(`/posts?access-token=${TOKEN}`)
        .send(data);
        
        console.log(postRes.body)
        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;
    });

    it("GET /posts/:id", async () => {
        await request
        .get(`/posts/${postId}?access-token=${TOKEN}`)
        .expect(200);
    })
})