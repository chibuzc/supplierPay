import axios from 'axios'
export const isLoggedIn  = async () => {
   const isUser = await axios.get('/api/current_user');
   console.log('isUser', isUser)
   return isUser.data
}

// module.exports = isLoggedIn

// module.exports = async () => {
//     const isUser = await axios.get('http://localhost:5000/currentUser'); 
//     console.log(isUser)
    // if(!req.user){
        // give a status of 401(unauthorized and send an error message)
        // rtun res.status(401).send({ error: "You must be logged in to access this page" })
    // }
    // next()
// }