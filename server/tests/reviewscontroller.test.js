import request from "supertest";
import app from "../app";
import ReviewSchema from '../schema/ReviewSchema.js';
import {connectDB, disconnectDB} from '../db.js';

const postReview = request(app);
// jest.setTimeout(120000)

describe("REVIEWS API", () => {
    // TEST CODESS
    beforeAll(async () => {
        await process.nextTick(() => {})
        await connectDB()
    })
    afterAll(async () => {
        await process.nextTick(() => {})
        await disconnectDB()
    })

    describe("CREATING REVIEWS", () => {
        it("Confirm that empty body fails", async () => {
            const body = {
            }
            
            await process.nextTick(() => {})
            const res = await postReview
                .post("/reviews")
                .send(body)

            expect(res.statusCode).toEqual(400)
            return undefined;
        });

        it("Confirm that when email is invalid, system fails", async () => {
            const body = {
                email: "1000",
                name: "creative",
                comment: "Hello",
                rating: 1,
            }

            await process.nextTick(() => {})
            const res = await postReview
                .post("/reviews")
                .send(body)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "Invalid api body"
                })
            );
            return undefined;
        });

        it("Confirm system fails when 0 is passed as rating", async () => {
            const body = {
                email: "you@itscreativejoe.com",
                name: "creative",
                comment: "Hello",
                rating: 0,
            }
            
            await process.nextTick(() => {})
            const res = await postReview
                .post("/reviews")
                .send(body)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "Invalid api body"
                })
            );
            return undefined;
        });

        it("Confirm system fails when a text is passed as rating", async () => {
            const body = {
                email: "you@itscreativejoe.com",
                name: "creative",
                comment: "Hello",
                rating: 'dwfr',
            }
            
            await process.nextTick(() => {})
            const res = await postReview
                .post("/reviews")
                .send(body)

            expect(res.statusCode).toEqual(400)
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "Invalid api body"
                })
            );
            return undefined;
        });

        it("Confirm posting review works", async () => {
            const body = {
                email: "you@itscreativejoe.com",
                name: "creative",
                comment: "Hello",
                rating: 2,
            }
            
            await process.nextTick(() => {})
            const res = await postReview
                .post("/reviews")
                .send(body)

            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "successful",
                    data: expect.any(Object)
                })
            );
        });
    });

    describe("FETCHING REVIEWS", () => {
        it("Confirm fetch DB api call works", async () => {
            const data = await ReviewSchema.find({})
            expect(data).toEqual(
                expect.any(Object)
            )
        });

        it("TConfirm that fetch all review works", async () => {
            await process.nextTick(() => {})
            const res = await postReview
                .get("/reviews")

            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: "successful",
                    data: expect.any(Object)
                })
            );
        });
    });
});

// --detectOpenHandles
