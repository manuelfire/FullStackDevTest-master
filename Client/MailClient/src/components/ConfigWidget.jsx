import React, { Component, useState } from 'react';
import './ConfigWidget.scss';
import { useDispatch } from "react-redux";
import {IMAPGetAllMail,POP3GetAllMail} from '../redux/Email/email.actions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

    function handleinputChange(event) {
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Server type</Form.Label>
                   <Form.Select name="serverType" aria-label="IMAP or POP3?" value={config.serverType} onChange={handleinputChange}>
                   <option value="IMAP">IMAP</option>
                    <option value="POP3">POP3</option>
                   </Form.Select>
                   </Form.Group>
                   <Form.Group className="mb-3">
                    <Form.Label>
                    Encryption
                    </Form.Label>
                    <Form.Select name="encryption" value={config.encryption} onChange={handleinputChange}>
                    <option value="Unencrypted">Unencrypted</option>
                    <option value="SSL/TLS">SSL/TLS</option>
                    <option value="STARTTLS">STARTTLS</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>
                     Server
                    </Form.Label>
                    <Form.Control type="text" name="server" value={config.server} onChange={handleinputChange}  />
                  
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>
                     Port
                     </Form.Label>

                    <Form.Control type="text" name="port" value={config.port} onChange={handleinputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={config.username} onChange={handleinputChange} />

                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={config.password} onChange={handleinputChange}/>
                    </Form.Group>
                    <Button type="submit" >Start</Button>
      
        </Form>
      );
    
  }

  export default ConfigWidget
  