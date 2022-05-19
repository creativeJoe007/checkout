import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Comments from './components/Comments';
// import CommentBox from './components/CommentBox';
import RatingGraph from './components/RatingGraph';
import CommentBox from './components/CommentBox';
import {BASE_URL} from './utils';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getAllReviews = async () => {
    setLoading(true)
    try {
      const req = await axios.get(`${BASE_URL}/reviews`)
      const { data: { data } } = req;
      setReviews(data)
    } catch (e) {
      const {data} = e.response
      alert(data?.message || "Opps, an error occurred")
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllReviews()
  }, [])

  return (
    <Grid
      container
      justifyContent="center"
      className="superContainer"
    >
      <Grid item md={10} xs={12} className="container">
        <Grid item md={12} className="header">
          <div className="testimonial-heading">
            <span>Ratings &amp; Reviews</span>
          </div>
        </Grid>

        <Grid
          container
          md={12}
          xs={12}
          className="container"
        >
          <Grid item md={5} sm={12} xs={12}>
            <RatingGraph data={reviews} />
          </Grid>
          <Grid item sm={12} md={7} xs={12}>
            <CommentBox triggerReviewRefresh={getAllReviews} />
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          {
            loading 
              ? (
                <Grid
                  container
                  md={12}
                  justifyContent="center"
                  style={{marginBottom: 20, marginTop: 50}}
                >
                  <CircularProgress color="inherit" />
                </Grid>
              )
              : <Comments data={reviews} />
          }
        </Grid>
      </Grid>
      {/* <RatingGraph />
      <Comments /> */}
    </Grid>
  );
}

export default App;
