import {Router} from "express";
import validator from 'validator';
import ReviewSchema from '../schema/ReviewSchema.js';

const router = Router()

router.post("/reviews", (req, res) => {
    try {
        const {name, comment, rating, email} = req.body;
        if (validator.isEmail(email) && !isNaN(rating) && rating > 0) {
            // we converted the dialed numbers into an array, so we can get their supported characters
            const review = new ReviewSchema({
                email,
                name,
                comment,
                rating,
                reviewedOn: Date.now()
            });

            review.save()   

            res.status(200).json({ message: "successful", data: review })
            
        } else res.status(400).json({ message: "Invalid api body" })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.get("/reviews", async (req, res, next) => {
    try {
        const reviews = await ReviewSchema.find({})
        res.json({data: reviews.reverse(), message: 'successful'})
    } catch (e) {
        res.status(400).json({ message: e })
    }
})

export default router;
