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

export const postComment = async (text, parentId = null, postId = null, userId = 999) => {
    return  {
        postId,
        id: Math.floor(Math.random() * 1000),
        userName: "UserCanEdit",
        email: "usermail@mail.com",
        body: text,
        parentId,
        userId: userId,
        createdAt: new Date().toLocaleDateString('es-ES')
    }
}

export const deleteComments = async () => {
    return {};
  };

export const updateComments = async (text) => {
    return { text };
  };