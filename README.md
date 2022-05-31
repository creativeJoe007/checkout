# Checkout

This project is a product rating and review front and backend application that allows user to input their name, emai, comment and rating.

#### Project Characteristics:
1. Rate a product and add a review
2. View ratings and reviews
3. View how the system rates the product according to total user ratings

#### How We Calculate Our Rating Graph:
1. We calculate the total possible review (5 * total number of reviews)
2. We calculate the total review (sum of all reviews)
3. Calculated Rating = (Total Review / Total Possible Review) * 100
#### If Calculated rating:
    >= 90 (5 stars)
    >= 65 (4 stars)
    >= 45 (3 stars)
    >= 25 (2 stars)
    < 25 (1 stars)


#### How to run front-end:
    npm run start

#### How to run backend-end:
Create a *.env* file and add `MONGO_URL = {YOUR DB CONNECTION STRING}`

Run `node index.js`

#### How to run backend-end test scripts:
Download JEST and run `npm test`

#### What I could have done better:
1. Write test cases for testing the front-end
2. Added more test to get 100% test coverage on my backend (currently stands at 96.42%)

#### Do note:
1. Run npm install on folder level for both the front and backend.
2. I used Material UI for the design
