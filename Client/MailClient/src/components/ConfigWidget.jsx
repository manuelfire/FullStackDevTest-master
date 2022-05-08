import React, { Component, useState } from 'react';
import './ConfigWidget.scss';
import { useDispatch } from "react-redux";
import {IMAPGetAllMail,POP3GetAllMail} from '../redux/Email/email.actions'

const ConfigWidget = () => {
    
    
const dispatch = useDispatch();
   const [config,setConfig] = useState({
        username: "",
        password: "",
        server:"",
        port:"",
        encryption : "",
        serverType : "",

      });

    function handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      console.log(event);
      setConfig({
        ...config,[name]: value
      });
    }

    function handleSubmit(event) {
        event.preventDefault();
       
        if(config.serverType == "IMAP")
        {
            console.log("fui IMAP");
            dispatch(IMAPGetAllMail(config));
        }else if(config.serverType == "POP3")
        {
            dispatch(POP3GetAllMail(config));
        }
      }
  
    
      return (
        <form onSubmit={handleSubmit}>
            <label>Server type
                   <select name="serverType" value={config.serverType} onChange={handleInputChange}>
                   <option value="IMAP">IMAP</option>
                    <option value="POP3">POP3</option>
                   </select>
                    </label>
                    <label>
                    Encryption
                    <select name="encryption" value={config.encryption} onChange={handleInputChange}>
                    <option value="Unencrypted">Unencrypted</option>
                    <option value="SSL/TLS">SSL/TLS</option>
                    <option value="STARTTLS">STARTTLS</option>
                    </select>
                    </label>
                    <label>
                     Server
                    <input type="text" name="server" value={config.server} onChange={handleInputChange}  />
                    </label>
                    <label>
                     Port
                    <input type="text" name="port" value={config.port} onChange={handleInputChange} /></label>
                    <label>Username
                    <input type="text" name="username" value={config.username} onChange={handleInputChange} />
                    </label>
                    
                    <label>Password
                    <input type="password" name="password" value={config.password} onChange={handleInputChange}/></label>
                    <button type="submit" >Start</button>
      
        </form>
      );
    
  }

  export default ConfigWidget
  