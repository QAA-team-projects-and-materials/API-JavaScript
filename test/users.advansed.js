import { expect, use } from 'chai';
import supertest from 'supertest';

const request = supertest("https://gorest.co.in/public-api");

const TOKEN = "6fc03d210d2afad24cbcee1c75547f463a55537e9bb95ab3670966ed86a2fe5a";

xdescribe("Users", () => 
{
    let userId;

    describe("POST", ()=>{
        it('/users', () => {
            const data = {
                email:`Test-${Math.floor(Math.random()* 9999)}@gmail.com`,
                name: 'Test name',
                gender:"female",
                status: 'inactive',
            }
    
            return request
                .post(`/users?access-token=${TOKEN}`)
                //.set('Authorization', "Bearer" + {TOKEN})
                .send(data)
                .then((res) => {
                    expect(res.body.data).to.deep.include(data);
                    userId = res.body.data.id;
                    console.log(userId);
                    //or
                    //expect(res.body.data.email).to.eq.(data.email)
                });
                
        });   
    });

    describe("GET", () => {
        it("/users", () => {
            request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
                console.log(err);
                expect(res.body.data).to.not.be.empty;
            });
        });  
        
        it("/users/:id", () => {
            return request.get(`/users/${userId}?access-token=${TOKEN}`).then((res)=>{ 
                expect(res.body.data.id).to.be.equal(userId);
                
            })
        });
        
        it("/users with query params", () =>{
            const url = `/users?access-token=${TOKEN}&gender=male&status=active`;
            return request.get(url).then((res) => {
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach((data) =>{
                    expect(data.gender).to.eq('male');
                    expect(data.status).to.eq('active');
                });
            });
        });
    });

    describe('PUT', () => {
        it("PUT /users/:id", () => {
            const data = {
                status:"active",
                name: `Luffy' - ${Math.floor(Math.random() * 9999)}`,
            }
    
            return request
                .put(`/users/${userId}?access-token=${TOKEN}`)
                .send(data)
                .then(res => {
                    expect(res.body.data).to.deep.include(data);
                });
        });
    });
    
    describe("DELETE", () => {
        it("DELETE/users/:id", () =>{
            return request
                .delete(`/users/${userId}}?access-token=${TOKEN}`)
                .then((res) => {
                    expect(res.body.data).to.be.eq(null);
                });     
        });  
    });

});
    