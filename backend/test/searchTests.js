const assert = require("assert"),
    chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../index.js"),
    should = chai.should(),
    connect = require("../database/connect");
chai.use(chaiHttp);

let searchToken;

before(done => {
    // Create new user and one private post
    chai.request(server)
        .post("/users/createNewUser")
        .send({
            email: "searchman@example.com",
            password: "Hello123",
            nickname: "searchie",
            visibility: 1
        })
        .end((err, res) => {
            searchToken = res.header["x-access-token"];
            id = res.body.userId;
            // console.log(res.header);
            // console.log(res.body);
            chai.request(server)
                .post("/posts/newPost")
                .set({ "x-access-token": searchToken })
                .send({ title: "This is a tittle", text: "Super secret", visibility: 0 })
                .end((err, res) => {
                    console.log("Response Body:", res.body);
                    res.should.have.status(200);
                    res.body.should.have.deep.equal({ results: "New post ok" });
                    done();
                });
        });
});

describe("Search tests", () => {
    describe("General search queries", () => {
        describe("Create basic search without authentication", () => {
            it("Return 3 users and 3 posts that contains string 'che'", done => {
                chai.request(server)
                    .post("/search/fuzzy")
                    .send({ query: "che" })
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.posts.length.should.equal(3);
                        res.body.users.length.should.equal(3);
                        done();
                    });
            });
        });
        describe("Search without authentication", () => {
            it("Should return empty results with string 'Super secret'", done => {
                chai.request(server)
                    .post("/search/fuzzy")
                    .send({ query: "Super secret" })
                    .end((err, res) => {
                        console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.posts.length.should.equal(0);
                        res.body.users.length.should.equal(0);
                        done();
                    });
            });
        });
        describe("Search with authentication", () => {
            it("Should now find super secret post", done => {
                chai.request(server)
                    .post("/search/fuzzy")
                    .set({ "x-access-token": searchToken })
                    .send({ query: "Super secret" })
                    .end((err, res) => {
                        // console.log("Response Body:", res.body);
                        res.should.have.status(200);
                        res.body.posts.length.should.equal(1);
                        res.body.users.length.should.equal(0);
                        done();
                    });
            });
        });
    });
});
