// https://medium.com/kanssfer-consulting/testing-expressjs-rest-api-with-mocha-and-chai-90bf4178f15e

const assert = require("assert"),
    chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../index.js"),
    should = chai.should(),
    connect = require("../database/connect");
chai.use(chaiHttp);

let token;

describe("User tests", () => {
    describe("Crete new user", () => {
        describe("Create new user normaly", () => {
            it("Should create new user and return details and token", done => {
                chai.request(server)
                    .post("/users/createNewUser")
                    .send({
                        email: "henry@example.com",
                        password: "Super secret",
                        nickname: "henz",
                        visibility: 1
                    })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.should.have.property("email");
                        res.body.should.have.property("nickname");
                        res.header.should.have.property("x-access-token");
                        done();
                    });
            });
        });
        describe("Create new user with same email", () => {
            it("Should return error 'Email allready exists'", done => {
                chai.request(server)
                    .post("/users/createNewUser")
                    .send({
                        email: "henry@example.com",
                        password: "My password",
                        nickname: "henry",
                        visibility: 1
                    })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(400);
                        res.body.should.have.deep.equal({ errors: "Email allready exists" });
                        done();
                    });
            });
        });
        describe("Create new user without password", () => {
            it("Should return error about missing value", done => {
                chai.request(server)
                    .post("/users/createNewUser")
                    .send({
                        email: "henry123@example.com",
                        nickname: "henryzf",
                        visibility: 0
                    })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(400);
                        res.body.should.have.deep.equal({
                            errors: [{ msg: "Invalid value", param: "password", location: "body" }]
                        });
                        done();
                    });
            });
        });
    });
    describe("Authentication", () => {
        describe("Authenticate with correct password", () => {
            it("Should return new access token", done => {
                chai.request(server)
                    .post("/users/authenticate")
                    .send({
                        email: "henry@example.com",
                        password: "Super secret"
                    })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        const userId = res.body.userId;
                        res.should.have.status(200);
                        res.body.should.have.deep.equal({
                            userId: userId,
                            email: "henry@example.com",
                            nickname: "henz"
                        });
                        res.header.should.have.property("x-access-token");
                        token = res.header["x-access-token"];
                        done();
                    });
            });
        });
        describe("Authenticate with bad password", () => {
            it("Should return 'Password is incorrect'", done => {
                chai.request(server)
                    .post("/users/authenticate")
                    .send({
                        email: "henry@example.com",
                        password: "This is wrong password"
                    })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(400);
                        res.body.should.have.deep.equal({ errors: "Password is incorrect" });
                        done();
                    });
            });
        });
        describe("Logout with correct details", () => {
            it("Should return 'Logout ok'", done => {
                chai.request(server)
                    .post("/users/logout")
                    .set({ "x-access-token": token })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.should.have.deep.equal({ results: "Logout ok" });
                        done();
                    });
            });
        });
        describe("Logout with old token", () => {
            it("Should return 'Token has expired.'", done => {
                chai.request(server)
                    .post("/users/logout")
                    .set({ "x-access-token": token })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(401);
                        res.body.should.have.deep.equal({ errors: "Token has expired." });
                        done();
                    });
            });
        });
        describe("Logout without token", () => {
            it("Should return 'Unauthorized'", done => {
                chai.request(server)
                    .post("/users/logout")
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(401);
                        res.body.should.have.deep.equal({ errors: "Unauthorized" });
                        done();
                    });
            });
        });
    });
});
