export const  gettokenfromrequset=(req)=>{
const token = req?.headers?.authorization?.split(" ")[1];
console.log(token)
if(token === undefined){
    return "there is no token in the header "
} else {
    return token
}
}