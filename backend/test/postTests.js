const assert = require("assert"),
    chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../index.js"),
    should = chai.should(),
    connect = require("../database/connect");
chai.use(chaiHttp);

let token;
let id;

before(done => {
    // Create new user
    chai.request(server)
        .post("/users/createNewUser")
        .send({
            email: "postman@example.com",
            password: "Super secret",
            nickname: "pete",
            visibility: 1
        })
        .end((err, res) => {
            token = res.header["x-access-token"];
            id = res.body.userId;
            console.log("Token: " + token);
            done();
        });
});

describe("Post tests", () => {
    describe("Crete new post", () => {
        describe("Create new post normaly", () => {
            it("Should create new post", done => {
                chai.request(server)
                    .post("/posts/newPost")
                    .set({ "x-access-token": token })
                    .send({ title: "This is a tittle", text: "Testing text", visibility: 1 })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.should.have.deep.equal({ results: "New post ok" });
                        done();
                    });
            });
        });
        describe("Create new post without token", () => {
            it("Should be unauthorized", done => {
                chai.request(server)
                    .post("/posts/newPost")
                    .send({ title: "This is a tittle", text: "Testing text", visibility: 1 })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(401);
                        res.body.should.have.deep.equal({ errors: "Unauthorized" });
                        done();
                    });
            });
        });
    });
    describe("Test get posts", () => {
        describe("Get 10 newest public posts", () => {
            it("Should return 10 newest public posts", done => {
                chai.request(server)
                    .post("/posts/getPublicPosts")
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.posts.length.should.equal(10);
                        done();
                    });
            });
        });
        describe("Get only first post", () => {
            it("Should return first post", done => {
                chai.request(server)
                    .post("/posts/getPublicPosts")
                    .send({ afterId: 2 })
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        const timestamp = res.body.posts[0].timestamp;
                        const comparison = {
                            lastId: 1,
                            posts: [
                                {
                                    postId: 1,
                                    userId: 1,
                                    nickname: "rebel",
                                    timestamp: timestamp,
                                    title: "network dress surface swop",
                                    text: "cancel tree stress basin",
                                    image: null
                                }
                            ]
                        };
                        res.body.should.deep.equal(comparison);
                        done();
                    });
            });
        });
        describe("Get 100 posts (Get whole test data)", () => {
            it("Should return 100 posts", done => {
                chai.request(server)
                    .post("/posts/getPublicPosts")
                    .send({ postCount: 100 })
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.posts.length.should.equal(100);
                        done();
                    });
            });
        });
    });
    describe("Test get user posts", () => {
        describe("Get public user posts", () => {
            it("Should return public user posts", done => {
                chai.request(server)
                    .post("/posts/getUserPosts")
                    .send({
                        userId: "99"
                    })
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        const timestamp = res.body.posts[0].timestamp;
                        const comparison = {
                            lastId: 99,
                            posts: [
                                {
                                    postId: 99,
                                    userId: 99,
                                    nickname: "gem",
                                    timestamp: timestamp,
                                    title: "inspiration suffer traffic confession",
                                    text: "sensitivity dinner import menu",
                                    image: null
                                }
                            ]
                        };
                        res.body.should.deep.equal(comparison);
                        done();
                    });
            });
        });
        describe("Create new private post normaly", () => {
            it("Should create new private post", done => {
                chai.request(server)
                    .post("/posts/newPost")
                    .set({ "x-access-token": token })
                    .send({
                        title: "This is a private tittle",
                        text: "Testing private text",
                        visibility: 0
                    })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.should.have.deep.equal({ results: "New post ok" });
                        done();
                    });
            });
        });
        describe("Get own posts", () => {
            it("Should return own posts (2)", done => {
                chai.request(server)
                    .post("/posts/getUserPosts")
                    .set({ "x-access-token": token })
                    .send({
                        userId: id
                    })
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.posts.length.should.equal(2);
                        done();
                    });
            });
        });
        describe("Access private user without authentication", () => {
            it("Should return 'Unauthorized'", done => {
                chai.request(server)
                    .post("/posts/getUserPosts")
                    .send({
                        userId: 1001
                    })
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
