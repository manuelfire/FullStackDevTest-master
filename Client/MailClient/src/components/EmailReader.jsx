import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './EmailReader.scss';
import {IMAPGetMail,POP3GetMail} from '../redux/Email/email.actions'


const EmailReader  = (props) =>{
    const dispatch = useDispatch();
    const {selectedEmail,containerToogle,closeButton} = props;
    const [openEmail,setOpenEmail] = useState({'from':"def",'subject':"def",'date':"def",'html':"def"});
    const emailInfo = useSelector(state => state.email !=null ? state.email.filter(x=>x.uid == selectedEmail):null);
    useEffect(() =>{

        if(selectedEmail !=null) dispatch(IMAPGetMail(selectedEmail));

    },[selectedEmail,dispatch]);
    useEffect(() =>{

        setOpenEmail(emailInfo);
        console.log("EmailReader");
         console.log(openEmail);
},[emailInfo]);

    if (openEmail == null) return <p>Select a mail!</p>
    
    
    return (
        <div className={`detail ${containerToogle  ? "open" : ""}` }>
            <div className="detail-nav">
            <button className="close" onClick={closeButton}>Close</button>
        </div>
        <div className="detail-container">
        <table className = "fixedHead">
        <thead>
            <tr>
                <th>From : {openEmail.from} </th>
                <th>Subject : {openEmail.subject}</th>
                <th>Date : {openEmail.date}</th>
                
            </tr>
        </thead>
        <tbody>
           
            <tr>
                <td>
                    <span className="EReader">
                        <div dangerouslySetInnerHTML={{ __html: openEmail.html }} />
                    </span>
                </td>
            </tr>
        </tbody>
        </table>
        </div>
        
        </div>
    );

};

export default EmailReader

