import express from 'express';
import Featured from '../models/featured.model.js';


const router = express.Router();


router.get('/get', async(req, res, next)=>{
    try {
        const featured = await Featured.findOne();
        res.status(200).json(featured);
    } catch (error) {
        next(error);
    }

});

export default router;