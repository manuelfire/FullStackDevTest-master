import axios from 'axios';

const url =`${process.env.REACT_APP_NODE_SERVER}:${process.env.REACT_APP_NODE_PORT}` ||'https://localhost:4000';
console.log(url);

export const IMAPfetchOne = (id,config) => axios.post(`${url}/imap/getEmail`,{ config: config,uid: id }); 
export const POP3fetchOne = (id,config) => axios.post(`${url}/pop3/getEmail`,{ config: config,uid: id });