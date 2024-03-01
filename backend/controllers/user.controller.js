const User = require("../models/user.model");

exports.getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select({password:0,__v:0})
        return res.json({
            status:"success",
            message:"user fetch successfully",
            responseCode: 200,
            data:filteredUsers,
        })

    }catch(error){
        console.log("Error in getUsersForSlidebar: ",error.message)
        return res.json({
            status:"error",
            message:error.message,
            responseCode: 200,
            data:null,
        })
    }
}