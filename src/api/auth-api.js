import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
export const logoutUser = () => {
  auth().signOut()
}

export const AddUser = async (name,email,image,uid,BackgroundImage)=>{
  try {
    return await database().ref("users/"+uid).set({
      name:name,
      email:email,
      image:image,
      uuid:uid,
      BackgroundImage:BackgroundImage
    })
  }
  catch(error){
    return error
  }
}
export const UpdateUser = async (image,uid)=>{
  try {
    return await database().ref("users/"+uid).update({
      image:image
    })
  }
  catch(error){
    return error
  }
}
export const UpdateUserBackground = async (BackgroundImage,uid)=>{
  try {
    return await database().ref("users/"+uid).update({
      BackgroundImage:BackgroundImage
    })
  }
  catch(error){
    return error
  }
}


export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password)
      auth().currentUser.updateProfile({
      displayName: name,
    }).then(()=>{
      AddUser(name,email,"",auth().currentUser.uid,"")
    })
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const user = await 
      auth()
      .signInWithEmailAndPassword(email, password)
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const sendEmailWithPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email)
    return {}
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
