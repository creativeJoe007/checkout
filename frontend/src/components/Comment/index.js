import React from 'react';
import { Container, Grid, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow, grey } from '@mui/material/colors';
import './index.css';

const Comment = ({
    data: review
}) => {
    const generateInitials = () => {
        const namesInArray = review.name.split(' ');
        const firstInitial = (namesInArray[0] || "")[0].toUpperCase()
        const secondInitial = 
            namesInArray[1]
            ? namesInArray[1][0].toUpperCase()
            : "";

        return `${firstInitial}${secondInitial}`
    }
    return (
        <Container className="comment_container">
            <Grid
                md={12}
                container
                direction="column"
                className="profile"
            >
                <Grid container md={12}  direction="row">
                    <Grid
                        item
                        justifyContent="center"
                        className="avatar"
                    >
                        <Avatar
                            sx={{
                                width: 45,
                                height: 45,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}
                        >{generateInitials()}</Avatar>
                    </Grid>
                    <Grid
                        md={8}
                        direction="column"
                        container
                        spacing={0.5}
                    >
                        <Grid item justifyContent="center">
                            <span className="name">{review.name}</span>
                            <small className="time">
                                ({new Date(review.reviewedOn).toLocaleDateString()}
                                &nbsp; {new Date(review.reviewedOn).toLocaleTimeString()})
                            </small>
                        </Grid>
                        <Grid item>
                            {
                                [...Array(5).keys()].map((k) => (
                                    (k < review.rating)
                                    ?  <StarIcon
                                            key={k}
                                            aria-label="Rated Star"
                                            sx={{
                                                color: yellow[800],
                                                fontSize: 15,
                                                marginLeft: 0
                                            }}
                                        />
                                    : <StarIcon
                                            key={k}
                                            aria-label="Not Rated Star"
                                            sx={{
                                                color: grey[400],
                                                fontSize: 15,
                                                marginLeft: 0
                                            }}
                                        />  
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
                
                {/* Comment */}
                <Grid item md={12} className="comment_text">
                    <span>
                        {review.comment}
                    </span>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Comment;
