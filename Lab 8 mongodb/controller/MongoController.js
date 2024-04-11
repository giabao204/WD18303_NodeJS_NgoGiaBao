const { result } = require('lodash');
const Post = require('../model/Posts');

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post ({ title: title, content: content});
    post.save()
    .then(result => {
        res.status(201).json({
            message: 'Them thanh cong bai viet',
            post: result
        })
    })
    .catch(err =>{
        next(err);
    })
}