import axios from 'axios';

const url = 'http://localhost:3001';

export const IMAPLogin = (data) => axios.post(`${url}/imap/Login`,data);
export const POP3Login = (data) => axios.post(`${url}/pop3/Login`,data);
export const IMAPfetchAll = () => axios.get(`${url}/imap/getAllEmails`);
export const IMAPfetchOne = (id) => axios.get(`${url}/imap/getEmail`,{ params: { uid: id }}); 
export const POP3fetchAll = () => axios.patch(`${url}/pop3/getAllEmails`);
export const POP3fetchOne = (id) => axios.post(`${url}/pop3/getEmail`,{ params: { uid: id }});