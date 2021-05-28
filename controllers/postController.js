const Post = require("../models/postModels");


exports.getAllPosts= async(req,res,next)=>{

    try {
        const posts = await Post.find()
        res.status(200).json({
            status:'sucess',
            results:posts.length,
            data:{
                posts
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail"
        })
    }

}


exports.getOnePost = async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status:'sucess',
            data:{
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail"
        })
    }
}



exports.createPost = async(req,res,next)=>{
    console.log(req.body)
    try {
        const post = new Post(req.body)
        console.log(post);
        await post.save()
        res.status(200).json({
            status:'sucess',
            data:{
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail"
        })
    }
}



exports.updatePost = async(req,res,next)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true  
        })
        res.status(200).json({
            status:'sucess',
            data:{
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail"
        })
    }
}


exports.deletePost = async(req,res,next)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params)
        res.status(200).json({
            status:'sucess',
        })
    } catch (error) {
        res.status(400).json({
            status:"fail"
        })
    }
}