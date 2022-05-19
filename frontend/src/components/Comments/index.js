import React from 'react';
import { Container, Grid } from '@mui/material';
import Comment from '../Comment';
import './index.css';

const Comments = ({
    data
}) => {
    return (
        <Container className="comments_container">
            <div className="heading">
                <span>Comments From Verified Purchases</span>
            </div>

            <Grid
                md={12}
                container
                className="content"
            >
                {
                    data.map((review) => (
                        <Comment key={review._id} data={review} />
                    ))
                }
            </Grid>
        </Container>
    );
};

export default Comments;
