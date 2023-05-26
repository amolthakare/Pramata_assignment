
const users = []


// Join users to chat
 
function userJoin(id,username,room){
    const user = {id,username,room};
    users.push(user)
    return user;
}

function getCurrentUser(id){
    return users.find(user=>user.id==id)
}

function getRoomUsers(room) {
    return users.filter(user=> user.room == room)
}

function userLeave(id){
    //console.log(id)
    //console.log(users)
    const index = users.findIndex(user=>user.id==id)

    
    if(index !== -1) {
        const deltuser= users.splice(index,1)[0]
        console.log(deltuser)
        return deltuser;
    }
}

module.exports = {
    userJoin,
    getRoomUsers,
    getCurrentUser,
    userLeave
}
