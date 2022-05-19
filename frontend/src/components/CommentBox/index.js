import React, {useState} from 'react';
import { Grid, Box, TextField, Rating, Button } from '@mui/material';
import axios from 'axios';
import {BASE_URL} from '../../utils';
import './index.css';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NAME_REGEX = /^([a-z']+(-| )?)+$/i;

const CommentBox = ({
    triggerReviewRefresh
}) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        rating: 1,
        name: '',
        comment: '',
        email: ''
    });
    const updateForm = (key, value) => {
        console.log("value", value)
        setForm({
            ...form,
            [key]: value
        })
    }
    const clearForm = () => {
        setForm({
            rating: 1,
            name: '',
            comment: '',
            email: ''
        })
    }
    const submitForm = () => {
        const {name, comment, email} = form;
        if (!NAME_REGEX.test(name)) alert("Name cannot be empty")
        else if ((comment || "").trim().length < 1) alert("Comment cannot be empty")
        else if (!EMAIL_REGEX.test(email)) alert("Invalid email")
        else createReview()
    }
    const createReview = async () => {
        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/reviews`, form)
            clearForm()
            alert("Success")
            triggerReviewRefresh()
        } catch (e) {
            const {data} = e.response
            alert(data?.message || "Opps, an error occurred")
        }
        setLoading(false)
    }

  return (
    <Box
      component="form"
      className="comment_box_container"
      noValidate
      autoComplete="off"
    >
        <div className="heading">
            <span>Write a Comment</span>
        </div>
        <div className="form_container">
            <Grid
                container
                className="rating_box"
                md={12}
            >
                <Rating
                    name="rate product"
                    value={form.rating}
                    onChange={($e, val) => updateForm('rating', val)}
                    size="large"
                />
            </Grid>
            <Grid container spacing={0.5} md={12}>
                <Grid item md={6}>
                    <TextField
                        label="Enter Name"
                        variant="outlined"
                        value={form.name}
                        sx={{ width: '100%' }}
                        onChange={(e) => updateForm('name', e.target.value)}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        type={'email'}
                        variant="outlined"
                        value={form.email}
                        label="Enter Email"
                        sx={{ width: '100%' }}
                        onChange={(e) => updateForm('email', e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                md={12}
                spacing={0.5}
                style={{marginTop: 10}}
            >
                <TextField
                    label="Enter Your Comment"
                    value={form.comment}
                    variant="outlined"
                    onChange={(e) => updateForm('comment', e.target.value)}
                    multiline
                    rows={5}
                    sx={{ width: '100%' }}
                />
            </Grid>
            <Grid
                container
                md={12}
                spacing={0.5}
                style={{marginTop: 10}}
            >
                <Button
                    className="submit_btn"
                    variant="contained"
                    onClick={submitForm}
                    disabled={loading}
                >
                    {loading ? 'LOADING....' : 'SUBMIT'}
                </Button>
            </Grid>
        </div>
    </Box>
  );
};

export default CommentBox;
