// USERS CONSTANTS
export const regName = /[a-zA-Zа-яёА-ЯЁ]{4,8}/
export const regSurname = /[a-zA-Zа-яёА-ЯЁ]{2,15}/
export const regId = /[0-9]{1,999999}/
export const regAge = /[0-9]{1,3}/
export const parseLocalUsers = JSON.parse(localStorage.getItem("users"))
export const checkParams = ["userId", "name", "surName", "age"]
export const validParams = /[A-Za-zа-яёА-ЯЁ0-9]{1,10}/
//POSTS CONSTANTS
export const parseLocalPosts = JSON.parse(localStorage.getItem("posts"))


