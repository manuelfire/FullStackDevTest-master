import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import React,{useState,useEffect } from 'react';
import EmailList from './components/EmailList.jsx'
import EmailLoader from './components/EmailLoader.jsx'
import EmailReader from './components/EmailReader';
import ConfigWidget from './components/ConfigWidget'
import {useDispatch, useSelector} from 'react-redux';
import {IMAPGetMail} from './redux/Email/email.actions';

function App() {

  const dispatch = useDispatch();
  const ListLoading = EmailLoader(EmailList);
  const [appState, setAppState] = useState({
    loading: false,
    mail: null,
    containerOpen : false
  });

  const [selectedEmail, setSelectedEmail] = useState({
    emailUID: null,
    containerOpen:false
  });

  const emails = useSelector((state)=> state.emails);

  useEffect(() => {
    let loaded = true;
    if(emails !=null) loaded = false;
    setAppState({loading:loaded,mail:emails});
     },[emails])
  
  
  // },[setAppState]);

  function onRowClick(data){
      console.log(data);
      
      setSelectedEmail({emailUID:data.uid,containerOpen:true});
     
  }
  function closeButton(){
    setSelectedEmail({...selectedEmail,containerOpen:false});
  }
  
  return (
    
    <div className="grid-container" width="100%" height="100%">

            <div className="item1">
             <ConfigWidget></ConfigWidget>
            </div>

            <div className="item2">
                <ListLoading isLoading={appState.loading} mail={appState.mail}  onRowClick={onRowClick} />
            </div>
           
            <div >
                <EmailReader selectedEmail = {selectedEmail.emailUID} containerToogle={selectedEmail.containerOpen} closeButton={closeButton} />
            </div>
            <div className="item4">Footer</div>
    </div>

  );
}

export default App;
