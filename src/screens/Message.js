
import database from '@react-native-firebase/database';
import moment from "moment"
export const SendMessage = async (currentUid,guestUid,message,imgSource)=>{
    var todayDate=moment()
    try{
        return await database().ref("messages/"+currentUid).child(guestUid).push({
            message:{
                sender:currentUid,
                receiver:guestUid,
                msg:message,
                image:imgSource,
                date:todayDate.format("YYYY-MM-DD"),
                time:todayDate.format("hh:mm A")
                }

        })
    }
    catch(error){
        return error;
    }

}

export const ReceiveMessage = async (currentUid,guestUid,message,imgSource)=>{
    var todayDate=moment()
    try{
        return await database().ref("messages/"+guestUid).child(currentUid).push({
            message:{
            sender:currentUid,
            receiver:guestUid,
            msg:message,
            image:imgSource,
            date:todayDate.format("YYYY-MM-DD"),
            time:todayDate.format("hh:mm A")
            }
            
        })
    }
    catch(error){
        return error;
    }

}
