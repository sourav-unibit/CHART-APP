const ConversationModel  = require("../models/conversation.model");
const  MessageModel  = require("../models/message.model");
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if(!conversation){
        conversation=await ConversationModel.create({
            participants:[senderId,reciverId]
        })
    }

    const newMessage = new MessageModel({
      senderId: senderId,
      reciverId: reciverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // SOCKET IO FUNCTIONALITY WILL GO HERE

    // this will work one by one
    // await conversation.save();
    // await newMessage.save();

    //this will run in parallel
    await Promise.all([conversation.save(),newMessage.save()])

    //socket
    const reciverSocketId=getReceiverSocketId(reciverId);
    // if(reciverSocketId){
    //   io.to(reciverSocketId).emit("newMessage",newMessage)
    // }
    
    return res.json({
      status:"success",
      message:"message sent",
      responseCode: 200,
      data:newMessage,
  })
  } catch (error) {
    console.log("error form signup ",error)
    return res.json({
      status:"error",
      message:error.message,
      responseCode: 500,
      data:error.message,
  })
  }
};

exports.getMessage=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        if(userToChatId=='null'){
          return res.json({
            status:"error",
            message:"Id not provided",
            responseCode: 500,
            data:null,
        })
        }
        const conversation=await ConversationModel.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")  //NOT REFERENCE BUT ACTUAL MESSAGE
        
       
        let messages=conversation?conversation.messages:[];
       return res.json({
          status:"success",
          message:"message successfully fetch",
          responseCode: 200,
          data:messages,
      })

    }catch(error){
        console.log("error form getMessage ",error)
        return res.json({
          status:"error",
          message:error.message,
          responseCode: 500,
          data:error.message,
      })
    
    }
}
