const Post = require('../../models/Post.js');
exports.getPost = (req, res, next) => {
    // Goi model
    Post.getAll(function (data) {
        res.status(200).json({
            posts: data
        });
    });
}

exports.getOnePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(404).json({
            "message": "INVALID id",
            "data": []
        })
    }
    Post.getOne(id, function (data) {
        res.status(200).json({
            posts: data
        });
    });
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const post = {
        title: title,
        body: body,
    }
    Post.savePost(post, function (data) {
        res.status(201).json({
            message: 'Thêm bài viết thành công',
            posts: data
        });
    });
};


exports.updatePost = (req, res, next) => {
    const id = req.params.id;
    let updatedPost = {
        title: req.body.title,
        body: req.body.body,
    };
    Post.updatePost(id, updatedPost, function (err, data) {
        if (err) {
            // Handle error
            return res.status(500).json({
                error: err.message
            });
        }
        res.status(200).json({
            message: 'Cập nhật bài viết thành công',
            updatedPost: data
        });
    });
};

// Delete a post
exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    Post.deletePost(id, function (err, data) {
        if (err) {
            // Handle error
            return res.status(500).json({
                error: err.message
            });
        }
        res.status(200).json({
            message: 'Xóa bài viết thành công',
            deletedPostId: id
        });
    });
};