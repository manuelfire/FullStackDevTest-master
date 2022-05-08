import axios from 'axios';

const url = 'http://localhost:3001';

export const IMAPLogin = (data) => axios.post(`${url}/imap/Login`,data);
export const IMAPfetchAll = (data) => axios.get(`${url}/imap/getAllEmails`,data);
export const IMAPfetchOne = (id) => axios.get(`${url}/imap/getEmail`,{ params: { uid: id }}); 
export const POP3fetchAll = (config) => axios.patch(`${url}/pop3/getAllEmails`,config);
export const POP3fetchOne = (id ) => axios.post(`${url}/pop3/getEmail`,{ params: { uid: id }});