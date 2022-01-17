import axios from 'axios';
import { COMMENTS, POSTS } from './ApiRoutes';

export const config = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Acces-Control-Allow-Origin": "*",
    }
}

export const getPosts = async () => {
    try {
        const req = await axios.get(POSTS, config)
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export const getComments = async () => {
    try {
        const req = await axios.get(COMMENTS, config)
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export const postComment = async (text, postId = null, userId = 999) => {
    return  {
        id: Math.floor(Math.random() * 1000),
        body: text,
        postId,
        userId: userId,
        userName: "UserCanEdit",
        email: "usermail@mail.com",
        createdAt: new Date().toLocaleDateString('es-ES')
    }
}

export const deleteCommentApi = async () => {
    return {};
  };