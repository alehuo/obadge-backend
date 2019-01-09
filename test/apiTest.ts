import * as dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "test";

import { expect } from "chai";
import chai from "chai";
import ChaiHttp = require("chai-http");
import User from "./../src/model/User";
import Server from "./../src/Server";

if (process.env.NODE_ENV !== "test") {
  throw new Error("Please use 'test' as NODE_ENV to run tests");
}

const should: Chai.Should = chai.should();

const server = new Server(8080).app;

chai.use(ChaiHttp);

describe("UserController", () => {
  it("should get all users", (done) => {
    authenticate("user1@email.com", "HelloWorld").then((token) => {
      chai
        .request(server)
        .get("/api/users")
        .set("Authorization", "Bearer " + token)
        .then((res: ChaiHttp.Response) => {
          const users: User[] = res.body;
          expect(res).status(200);
          expect(res).header("content-type", "application/json; charset=utf-8");
          done();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
  it("should return a single user", (done) => {
    authenticate("user1@email.com", "HelloWorld")
      .then((token) => {
        chai
          .request(server)
          .get("/api/users/1")
          .set("Authorization", "Bearer " + token)
          .then((res: ChaiHttp.Response) => {
            const user: User = res.body;
            expect(res).status(200);
            expect(res).header(
              "content-type",
              "application/json; charset=utf-8",
            );
            expect(user).to.not.equal(undefined);
            expect(user).to.not.equal(null);
            expect(user)
              .to.have.property("id")
              .eql(1);
            expect(user).to.have.property("email");
            expect(user).to.have.property("password");
            expect(user).to.have.property("firstName");
            expect(user).to.have.property("lastName");
            expect(user).to.have.property("telephone");
            expect(user).to.have.property("admin");
            done();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });
  it("should be able to add users that do not exist", (done) => {
    for (let i = 0; i < 1000; i++) {
      const [
        email,
        password,
        firstName,
        lastName,
        telephone,
      ] = createRandomUser();

      chai
        .request(server)
        .post("/api/users")
        .send({
          email,
          password,
        })
        .then((res: ChaiHttp.Response) => {
          expect(res.body)
            .to.have.property("success")
            .eq(true);
          expect(res.body)
            .to.have.property("message")
            .eq("New user inserted");
          expect(res.body).to.have.property("payload");

          const user: User = res.body.payload;
          expect(res).status(201);
          expect(res).header("content-type", "application/json; charset=utf-8");
          expect(user).to.not.equal(undefined);
          expect(user).to.not.equal(null);
          expect(user).to.have.property("id");
          expect(user)
            .to.have.property("email")
            .eq(email);
          expect(user)
            .to.have.property("password")
            .eq(password);
          expect(user)
            .to.have.property("firstName")
            .eq(firstName);
          expect(user)
            .to.have.property("lastName")
            .eq(lastName);
          expect(user)
            .to.have.property("telephone")
            .eq(telephone);
          expect(user)
            .to.have.property("admin")
            .eq(0);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    done();
  });
});
/*
describe("AuthController", () => {
    it("Should authenticate if correct credentials are entered", (done) => {
        chai.request(server).post('/api/authentication').send({
            email: "user1@email.com",
            password: "HelloWorld",
        }).then((res: ChaiHttp.Response) => {
            let result: Message = res.body;
            expect(res).status(200);
            expect(res).header('content-type', 'application/json; charset=utf-8');
            expect(result).to.have.property('success').eq(true);
            expect(result).to.have.property('message').eq('Authentication successful');
            expect(result).to.have.property('payload');
            expect(result.payload).to.have.property('token');
            done();
        }).catch((err) => {
            console.error(err);
        });
    });

    it("Should not authenticate if incorrect credentials are entered", (done) => {
        chai.request(server).post('/api/authentication').send({
            email: "user222@email.com",
            password: "HelloWorld1"
        }).then((res: ChaiHttp.Response) => {
            let result: Message = res.body;
            expect(res).status(401);
            expect(res).header('content-type', 'application/json; charset=utf-8');
            expect(result).to.have.property('success').eq(false);
            expect(result).to.have.property('message').eq('Authentication failure');
            done();
        }).catch((err) => {
            console.log(err);
        });
    });

});
*/

/**
 * Authenticates the user.
 * @param email Email address
 * @param password Password
 * @returns Access token
 */
const authenticate = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .post("/api/authentication")
      .send({
        email,
        password,
      })
      .then((res: ChaiHttp.Response) => {
        resolve(res.body.payload.token);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Creates a random user.
 */
const createRandomUser = () => {
  let email: string = "tester_";
  const randomNumber: number = Math.floor(5000000 * Math.random());
  email += randomNumber + "@tester.com";

  const password: string = "Password123";

  const firstName: string = (Math.random() + 1).toString(36).substring(7);
  const lastName: string = (Math.random() + 1).toString(36).substring(7);
  const telephone: string = Math.floor(Math.random() * 50000000).toString();

  return [email, password, firstName, lastName, telephone];
};
