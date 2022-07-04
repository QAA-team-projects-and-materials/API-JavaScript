import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest("https://gorest.co.in/public-api");

const TOKEN = "6fc03d210d2afad24cbcee1c75547f463a55537e9bb95ab3670966ed86a2fe5a";

xdescribe("Users", () => {
    it("GET/Users", () => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            console.log(err);
            expect(res.body.data).to.not.be.empty;
        });
    });  
    
    it("GET/users/:id", () => {
        return request.get(`users/3714?access-token=${TOKEN}`).then((res)=>{
            console.log(res.body);
            expect(res.body.data.id).to.be.equal(3714);
        })
    });

    
    it("GET /users with query params", () =>{
        const url = `users?access-token=${TOKEN}&gender=male&status=active`
        return request.get(url).then((res) => {
            console.log(res.body)
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach((data) =>{
                expect(data.gender).to.eq('male');
                expect(data.status).to.eq('active');
            });
        });
    });

    it('POST/users', () => {
        const data = {
            email:`Test-${Math.floor(Math.random()* 9999)}@gmail.com`,
            name: 'Test name',
            gender:"male",
            status: "active"
        }

        return request
            .post(`/users?access-token=${TOKEN}`)
            //.set('Authorization', "Bearer" + {TOKEN})
            .send(data)
            .then((res) => {
                console.log(data);
                expect(res.body.data).to.deep.include(data);
                //or
                //expect(res.body.data.email).to.eq.(data.email)
            });
    });   
    
    it("PUT /users/:id", () => {
        const data = {
            status:"unactive",
            name: `Luffy' - ${Math.floor(Math.random()* 9999)}`,
        }

        return request
            .put(`/users/5082?access-token=${TOKEN}`)
            .send(data)
            .then(res => {
                expect(res.body.data).to.deep.include(data);
            })

    }); 
    
    it("DELETE/users/:id", () =>{
        return request
            .delete(`/users/3687?access-token=${TOKEN}`)
            .then((res) => {
                console.log(res.body);
                expect(res.body.data).to.be.eq(null);
            });     
    });  
});
