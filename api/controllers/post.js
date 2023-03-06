const Post = require('../models/Post')
const User = require('../models/User')

//create post
const createPost = async (req, res) => {
    const newPost = await Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

//update
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                const update = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                res.status(200).json(update)
            } catch (err) {
                res.status(500).json(err.message)
            }
        } else {
            res.status(401).send({msg: 'You can only update your post'})
        }

    } catch (err) {
        res.status(500).json(err.message)
    }
}

//delete
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        
        if(post.username === req.body.username){
            try {
                await Post.findByIdAndDelete(post)
                res.status(200).send({msg: 'Post has been deleted'})
            } catch (err) {
                res.status(500).json(err.message)
            }
        } else {
            res.status(500).send({msg: 'You cannot delete this post'})
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

//get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

//get all post
const getAllPost = async (req, res) => {
    const username = req.query.user
    const catname = req.query.cat
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        } else if(catname) {
            posts = await Post.find({categories: {
                $in: [catname]
            }})
        } else {
            posts = await Post.find()
        }
       res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = { createPost, updatePost, deletePost, getPost, getAllPost}