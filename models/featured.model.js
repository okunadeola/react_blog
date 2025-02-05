import mongoose from 'mongoose';

const featuredPostSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', 
      required: true,
    },
  },
  { timestamps: true }
);

const Featured = mongoose.model('FeaturedPost', featuredPostSchema);

export default Featured;