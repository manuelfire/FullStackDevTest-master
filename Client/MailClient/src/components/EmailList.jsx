import React from 'react';
import styled from 'styled-components'
import RowComponent from './RowComponent';
import './EmailList.scss';


const EmailList  = (props) =>{

   const {mail,onRowClick} = props;

    


    if (!mail || mail.length === 0) return <p>Select a mail.</p>

   
    
    return (
        <div>
        <table className="fixed_headers">
            <thead>
                <tr>
                    <th>From  </th>
                    <th>Subject  </th>
                    <th>Date </th>
                </tr>
            </thead>
        <tbody>
          {
            mail.map(m => (
              <RowComponent
                key={m.uid}
                data={m}
                onClick={onRowClick}
              />))
          }
        </tbody>
        </table>
        </div>
    );

};



export default EmailList

