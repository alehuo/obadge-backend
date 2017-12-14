process.env.NODE_ENV = "development";

import { expect } from "chai";
import * as chai from "chai";
import ChaiHttp = require("chai-http");
import Server from "./../src/Server";
import User from "./../src/model/User";
import Message from "./interface/Message";

var port = process.env.PORT || 8080;

let should: Chai.Should = chai.should();

let server: Express.Application = new Server(8080).app;

chai.use(ChaiHttp);

describe("UserController", () => {
    it("should get all users", (done) => {
        chai.request(server).get('/api/users').end((err, res: ChaiHttp.Response) => {
            let users: User[] = res.body;
            expect(res).status(200);
            expect(res).header('content-type', 'application/json; charset=utf-8');
            done();
        });
    });
    it("should return a single user", (done) => {
        chai.request(server).get('/api/users/1').end((err, res: ChaiHttp.Response) => {
            let user: User = res.body;
            expect(res).status(200);
            expect(res).header('content-type', 'application/json; charset=utf-8');
            expect(user).not.undefined;
            expect(user).not.null;
            expect(user).to.have.property('id').eql(1);
            expect(user).to.have.property('email');
            expect(user).to.have.property('password');
            expect(user).to.have.property('admin');
            done();
        });
    });
});

describe("AuthController", () => {
    it("Should authenticate if correct credentials are entered", (done) => {
        chai.request(server).post('/api/authentication').send({
            email: "user1@email.com",
            password: "HelloWorld"
        }).end((err, res: ChaiHttp.Response) => {
            let result: Message = res.body;
            expect(res).status(200);
            expect(res).header('content-type', 'application/json; charset=utf-8');
            expect(result).to.have.property('success').eql(true);
            expect(result).to.have.property('message').eql('Authentication successful');
            expect(result).to.have.property('payload');
            expect(result.payload).to.have.property('token');
            done();
        });
    });
    it("Should not authenticate if incorrect credentials are entered", (done) => {
        chai.request(server).post('/api/authentication').send({
            email: "user1@email.com",
            password: "HelloWorld1"
        }).end((err, res: ChaiHttp.Response) => {
            let result: Message = res.body;
            expect(res).status(401);
            expect(res).header('content-type', 'application/json; charset=utf-8');
            expect(result).to.have.property('success').eql(false);
            expect(result).to.have.property('message').eql('Authentication failure');
            expect(result).to.have.property('payload');
            expect(result.payload).to.be.empty;
            done();
        });
    });
});
