import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './EmailReader.scss';
import {IMAPGetMail,POP3GetMail} from '../redux/Email/email.actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';


const EmailReader  = (props) =>{
    const dispatch = useDispatch();
    const {selectedEmailUID,containerToogle,closeButton,config} = props;
    const [openEmail,setOpenEmail] = useState({'from':"",'subject':"",'date':"",'html':""});
    const emailInfo = useSelector(state => state.emails.filter(x=>x.uid == selectedEmailUID));
    
    useEffect(() =>{
        console.log(emailInfo);
        if(selectedEmailUID !=null){
            switch(config.serverType){
                case "IMAP":
                    dispatch(IMAPGetMail(selectedEmailUID,config));
                    break;
                case "POP3" :
                    dispatch(POP3GetMail(selectedEmailUID,config));
                    break;
                default:
                    console.log("Select a server type");
                    break;
            }
         
        }

    },[selectedEmailUID,dispatch]);
    useEffect(() =>{

        setOpenEmail(emailInfo[0]);
       
},[emailInfo[0]]);

    if (openEmail == null) return <div style={{display:'none'}}></div>
    
    
    return (
        <Modal  show={containerToogle} fullscreen={true} onHide={() => closeButton()}>
      
        <Modal.Header closeButton>
        
        <Modal.Title>Subject : {openEmail.subject}</Modal.Title>
        </Modal.Header>
        <Card>
        <Card.Body>
                <Card.Text> From : {openEmail.from} </Card.Text>
                
                <Card.Text>Date : {openEmail.date}</Card.Text>
        </Card.Body>   
        </Card>
      
        <Modal.Body> <div dangerouslySetInnerHTML={{ __html: openEmail.html }} /> </Modal.Body>
                   

        </Modal >
    );

};

export default EmailReader

