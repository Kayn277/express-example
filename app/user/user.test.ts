import request from "supertest";
import app from "../app";
import { UserDTO } from "./dto/user.dto";
import { User } from "./model";
import UserController from "./user.controller";


let userForUpdate: User;

it("Create user", (done) => {
    const exceptedUser = {
        email: "test@gmail.com",
        password: "s56u9555"
    } as User;
    
    const postUser = {
        email: "test@gmail.com",
        password: "s56u9555"
    }
    
    request(app.listen())
    .post("/user")
    .send(postUser)
    .expect(exceptedUser)
    .expect(200)
    .expect('OK')
    .expect('Content-Type', /json/)
    .end((err: any, res: any) => {
        userForUpdate = res.body as User;
        done();
    });
})

it("Update user", (done) => {

    const exceptedUser = {
        email: "tested@gmail.com",
        password: "s56u9555"
    } as User;
    
    const putUser = {
        id: userForUpdate.id,
        email: "tested@gmail.com",
        password: "s56u9555"
    }
    
    request(app.listen())
    .put(`/user/${putUser.id}`)
    .send(putUser)
    .expect(exceptedUser)
    .expect(200)
    .expect('OK')
    .expect('Content-Type', /json/)
    .end((err: any, res: any) => {
        done();
    });
})

it("Find user", (done) => {
    
    const exceptedUser = {
        id: userForUpdate.id,
        email: "tested@gmail.com",
        password: "s56u9555"
    } as User;
   
    request(app.listen())
    .get(`/user/${exceptedUser.id}`)
    .expect(exceptedUser)
    .expect(200)
    .expect('OK')
    .expect('Content-Type', /json/)
    .end((err: any, res: any) => {
        userForUpdate = res.body as User;
        done();
    });
})


it("Delete user", (done) => {

    const deleteUser = {
        id: userForUpdate.id,
        email: "tested@gmail.com",
        password: "s56u9555"
    }
    
    request(app.listen())
    .delete(`/user/${deleteUser.id}`)
    .send(deleteUser)
    .expect((res: any) => {
        if(res.body == 0) { throw new Error("Cant delete user")};
    })
    .expect(200)
    .expect('OK')
    .end((err: any, res: any) => {
        done();
    });
})