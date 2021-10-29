
function validatePassword(str){
    
   
    if(str.length < 8){
      return "пароль закороткий"
    }
    if(str.search(/[a-z]/) === -1){
         return "немає літер нижнього регістру(латинських)"
    }
    if(str.search(/[A-Z]/) === -1){
         return"немає літер верхньго регістру(латин)"
    }
    if(str.search(/[0123456789]/)=== -1){
         return "пароль повинен мати числа"
    }
    if(str.search(/[!@#$%^&*+~|,./<>?]/) === -1){
        return "пароль повинен мати спец символи !@#$%^&*()-=_+~[|,./<>?"
    }
    if(str.search(/\s/) !== -1){
        return "пароль має пробіли"
    }
   
    return true

} 

module.exports = {validatePassword}

//!@#$%^&*()-=_+~[\]{}'"\\|,./<>?]/