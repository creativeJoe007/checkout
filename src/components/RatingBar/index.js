import React from 'react';
import { Grid } from '@mui/material';
import { yellow } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import './index.css';

const RatingBar = ({
    total,
    title,
    occurence
}) => {
    const getBarSize = 100 / (total/occurence);
    console.log("occurence", occurence)

    return (
        <Grid
            container
            direction="row"
            md={12}
            xs={12}
            className="rating_details_liner"
        > 
            <Grid item className="spacing_05">
                {title}
            </Grid>
            <Grid item className="spacing_05">
                <StarIcon
                    fontSize="small"
                    aria-label="Rated Star"
                    sx={{ color: yellow[800] }}
                />
            </Grid>
            <Grid item md={8} xs={9} className="spacing_4">
                <div className="bar_container">
                    <div className="bar" style={{width: `${getBarSize}%`}}></div>
                </div>
            </Grid>
            <Grid item md={2} xs={2} className="spacing_6">
                <span>
                    {Math.ceil(getBarSize)}%
                </span>
            </Grid>
        </Grid>
    );
};

export default RatingBar;
