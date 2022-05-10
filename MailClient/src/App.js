import './App.scss';
import React,{useState,useEffect } from 'react';
import EmailList from './components/EmailList.jsx'
import EmailReader from './components/EmailReader';
import ConfigWidget from './components/ConfigWidget'
import {IMAPGetAllMail,POP3GetAllMail} from './redux/Email/email.actions';
import {useDispatch, useSelector} from 'react-redux';
import {EmailConnect} from './redux/Email/email.actions';

function App() {

  

  const dispatch = useDispatch();
  //App States
  const [appState, setAppState] = useState({
    loading: false,
    mail: []  
  });

  const [selectedEmail, setSelectedEmail] = useState({
    emailUID: null,
    containerOpen:false
  });

  const [serverError, setServerError] = useState("");
 

  const [validConfig,setValidConfig] = useState({
    username: "",
    password: "",
    server:"",
    port:"",
    encryption : "",
    serverType : "",

  });

  const emails = useSelector((state)=> state.emails);
  const error = useSelector((state)=> state.error);
  //State effects updaters

  useEffect( ()=>{
    //Connect to Socket IO Redux Action 
    dispatch(EmailConnect(process.env.REACT_APP_NODE_SERVER ,process.env.REACT_APP_NODE_PORT));
 }, [dispatch] );
  //Update emails on change
  useEffect(() => {
    setAppState({mail:emails});
    if(emails.length > 0) setServerError("😇 Server looks fine")
     },[emails])
  
    useEffect(() => {
      setServerError(error);
       },[error])
    useEffect(() => {
      if(validConfig.serverType === "IMAP")
      {
          console.log("IMAP Call");
          dispatch(IMAPGetAllMail(validConfig));
      }else if(validConfig.serverType === "POP3")
      {   
          console.log("POP3 Call");
          dispatch(POP3GetAllMail(validConfig));
      }
         },[validConfig,dispatch])
  //State handler functions
  function onRowClick(data){
      
      
      setSelectedEmail({emailUID:data.uid,containerOpen:true});
     
  }
  function modalCloseButton(){
    setSelectedEmail({...selectedEmail,containerOpen:false});
  }

  
  function setValidStateConfig(conf){
    setValidConfig(conf);
  }
  const data = React.useMemo(() => appState.mail, [appState.mail]);
  const columns = React.useMemo(
    () => [
      {
        Header: "From",
        accessor: "from"
      },
      {
        Header: "Subject",
        accessor: "subject"
      },
      {
        Header: "Date",
        accessor: "date"
      }
    ],
    []
  );
  
  
  return (
    
    <div className="grid-container" width="100%" height="100%">

            <div className="item1">
            <ConfigWidget  validConfig={validConfig} setValidStateConfig={setValidStateConfig} serverError={serverError} ></ConfigWidget>
            </div>

            <div className="item2">
                <EmailList data={data} columns={columns}  onRowClick={onRowClick}></EmailList>
                
            </div>
           
            
            <EmailReader selectedEmailUID = {selectedEmail.emailUID} containerToogle={selectedEmail.containerOpen} closeButton={modalCloseButton} config={validConfig} />
            
            <div  className="item4">Made by Manuel Nuñez for  <img style={{height:'30px'}} src="https://www.getmailbird.com/wp-content/themes/MailbirdTheme/assets/images/footer-logo-mailbird.svg" alt="mailbird logo"></img></div>
    </div>

  );
}

export default App;
