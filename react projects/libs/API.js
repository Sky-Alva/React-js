import firebase from 'firebase'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import {v4 as uniqueID} from 'uuid';
import {ref} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC5JvqXFNMsD5qIm7Pfl1C6S8NSTKPfFAM",
    authDomain: "to-do-list-6edae.firebaseapp.com",
    projectId: "to-do-list-6edae",
    storageBucket: "to-do-list-6edae.appspot.com",
    messagingSenderId: "1042487875773",
    appId: "1:1042487875773:web:d64d8cd3ed7910866cbfd4"
  };

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const Users = db.collection('users')
const Tasks= db.collection('tasks')
const Count = db.collection('number')
const Photo=db.collection('photo')

const Storage = firebase.storage()

export async function getUsers()
{
    let userArray = []
    const response = await Users.get()
    for (let i =0; i<response.docs.length;i++)
    {
        const document = response.docs[i]
        userArray.push({
            id: document.id,
            name:document.data().name,
            username:document.data().username,
            password: document.data().password
        })
    }
    return userArray
}

export async function addUser(username,password,name)
{
    if (username && password && name)
    {
        const user = await Users.add({
            name: name,
            //if the variable and the results are same can be simplified like this
            username,
            password: encryptText(password)

        })
        return user;
    }
    return null;
}

const PRIVATE_KEY = 'fbanfbasfgasjfhkasfhj'
export function encryptText(text)
{
    const hashDigest = sha256(text);
    const hmac = hmacSHA512(hashDigest, PRIVATE_KEY)

    return Base64.stringify(hmac)
}


export async function login(username,password)
{
    const user = await Users.where('username', '==', username).
                            where('password', '==', encryptText(password))
                            .get()

    if (user.docs.length > 0)
    {
        alert ('Login Successful')
        return {
            id: user.docs[0].id,
            name:user.docs[0].data().name,
            username: user.docs[0].data().username
        }
    }
    else{
        alert ('Invalid Username or Password')
        return null;
    }
}

export async function logout()
{
    window.localStorage.clear()
}

export async function getUserList()
{

    const response = await Users.get()
    const userList = []
    for (let i =0;i<response.docs.length;++i)
    {
        userList.push({
            id: response.docs[i].id,
            name: response.docs[i].data().name,
            username: response.docs[i].data().username,
        })
    }

    return userList;
}


export async function getTaskList(userID){

    const response = await Tasks.where('user','==',userID).get()
    let tasklist = []
    for(let i = 0; i<response.docs.length;i++)
    {
        tasklist.push(
            {
                id: response.docs[i].id,
                task: response.docs[i].data().name,
                complete: response.docs[i].data().complete,
                created: response.docs[i].data().createdAt.toDate()
            }
        )
    }
    return tasklist
}

export async function addTask(userID,taskName){
    if (taskName){
        const task= await Tasks.add({
            name: taskName,
            //Date.now() untuk mendapatkan timestamp 
            createdAt: new Date(),
            complete: false,
            user: userID
    
        })
        const TaskID = task.id
        return task
    }
    return null

}

export async function removeTask(id){
    if(id)
    { 
        await Tasks.doc(id).delete()
    }
    return null
}

export async function updateTask(id,name,complete){
    let updateData={} //empty object
    if (name!=undefined)
        updateData.name = name
    if (complete!=undefined)
        updateData.complete = complete
    await Tasks.doc(id).update(updateData)

}

export async function getNumber(userID){
    console.log(userID)
    const response = await Count.where('user','==',userID).get()
    if (response.docs.length > 0 ){
        
        const number = response.docs[0].data().number
        return number;
    }
    else{
        const new_numb = await Count.add({
            number: 0,
            user: userID
        })
        return 0;
    }
}

export async function updateNumber(number,userID){
    const response = await Count.where('user','==',userID).get()
    let docID = response.docs[0].id
    if(docID){
        let updateData={}
        updateData.number = number
        await Count.doc(docID).update(updateData)
        return null
    }
    return null;

}

export async function UploadFile(file,userID, userName)
{
    if (file){
        const extension = file.name.split('.').pop();
        const uniquename= `${uniqueID()}.${extension}`

        const result = await Storage.ref(uniquename).put(file)
        const result2 = await Photo.add({
            name:file.name,
            username: userName,
            createdAt: new Date(),
            StorageID: uniquename,
            type: extension,
            user: userID,
            sharedto: []
        })
    }
}

export async function getUserPhoto(userID){
    const response = await Photo.where('user','==',userID).get()
    let photolist = []
    for (let i = 0;i<response.docs.length;i++){
        photolist.push({
            id: response.docs[i].id,
            photoID:response.docs[i].data().StorageID,
            photoName: response.docs[i].data().name,
            createdAt: response.docs[i].data().createdAt.toDate(),
            number: i,
        })
    }

    for (let image of photolist){
        let url = await getImageLink(image.photoID)
        image.url = url 
    }
    return photolist;
}

export async function getSharedPhoto(userName){
    const response = await Photo.where('sharedto', 'array-contains',userName).get()
    let photolist=[]
    for (let i = 0;i<response.docs.length;i++){
        photolist.push({
            id: response.docs[i].id,
            photoID:response.docs[i].data().StorageID,
            photoName: response.docs[i].data().name,
            createdAt: response.docs[i].data().createdAt.toDate(),
            number: i,
        })
    }

    for (let image of photolist){
        let url = await getImageLink(image.photoID)
        image.url = url 
    }
    return photolist;
}

export async function getImageLink(StorageID){
    if(StorageID){
        const url = await Storage.ref(StorageID).getDownloadURL()
        return url;
    }
    return null;
}

export async function ShareImage(StorageID,userName){
    const response = await Photo.where('StorageID','==',StorageID).get()
    let username = response.docs[0].data().username
    if (username == userName)
        return null
    else{
    let sharedto=response.docs[0].data().sharedto
    let shared = [...sharedto, userName]
    await Photo.doc(response.docs[0].id).update({
        sharedto: shared
    })

}
}

export async function DeleteImage(StorageID){
    const response = await Photo.where('StorageID','==',StorageID).get()
    let fileID= response.docs[0].id
    await Photo.doc(fileID).delete()
    await Storage.ref(StorageID).delete()
}