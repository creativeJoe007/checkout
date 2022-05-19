import React, {useState, useEffect} from 'react';
import { Container, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow, grey } from '@mui/material/colors';
import RatingBar from '../RatingBar';
import './index.css';

const RatingGraph = ({
    data: reviews
}) => {
    const [rating, setRating] = useState(0);
    // metrics and calculations goes here
    const ratings = reviews.map((review) => review.rating)
    // Total possible score would 5 (stars) multiplied by the total number of reviews
    const totalPossibleRating = 5 * reviews.length;
    const getTotalRatingCalculation = () => {
        let total = 0
        ratings.forEach((rating) => {
            total += rating
        })
        return total;
    }
    const countTotalRatingOccurence = (rating) => {
        // We count the total occurence of a rating
        const occurrences = ratings.filter((r) => r === rating)
        return occurrences.length
    }
    const getPercentageValue = (getTotalRatingCalculation() / totalPossibleRating) * 100
    
    const calculateRating = () => {
        switch (true) {
            case getPercentageValue >= 90:
                setRating(5);
                break;
            case getPercentageValue >= 65:
                setRating(4);
                break;
            case getPercentageValue >= 45:
                setRating(3);
                break;
            case getPercentageValue >= 25:
                setRating(2);
                break;
            default:
                setRating(1);
                break;
        }
    }

    useEffect(() => {
        calculateRating()
    }, [reviews])

    return (
        <Container maxWidth="sm" className="graph_container">
            <div className="heading">
                <span>Verified Ratings</span>
            </div>

            <Grid
                md={12}
                container
                className="rating_card"
            >
                <Grid
                    container
                    md={12}
                    justifyContent="center"
                    className="rating_card_item"
                >
                    <span className="total_rating">{rating}/5</span>
                </Grid>
                <Grid
                    container
                    md={12}
                    justifyContent="center"
                    className="rating_card_item"
                >
                    {
                        [...Array(5).keys()].map((k) =>
                            (k < rating)
                                ?  <StarIcon
                                        key={k}
                                        aria-label="Rated Star"
                                        sx={{color: yellow[800]}}
                                    />
                                : <StarIcon
                                        key={k}
                                        aria-label="Not Rated Star"
                                        sx={{color: grey[400]}}
                                    />
                        )
                    }
                </Grid>
                <Grid
                    container
                    md={12}
                    justifyContent="center"
                    className="rating_card_item"
                >
                    {reviews.length} Verified Ratings
                </Grid>
            </Grid>

            <Grid
                md={12}
                xs={12}
                container
                className="rating_details_card"
            >
                {
                    [...Array(5).keys()].map((num) =>
                        <RatingBar
                            key={num}
                            total={reviews.length}
                            title={6 - (num + 1)}
                            occurence={countTotalRatingOccurence(6 - (num + 1))}
                        />
                    )
                }
            </Grid>
        </Container>
    );
};

export default RatingGraph;
