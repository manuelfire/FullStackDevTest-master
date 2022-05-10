import React from 'react';

export default function RowComponent(props) {
  const { data, onClick } = props;

  function handleClick() {
    onClick(data);
  }

  const from = data.from !=null && data.from.length > 0 ? data.from.split('<') : "";
  return (
    <tr onClick={handleClick}  >
      <td className = "mail-from">{from[0]}</td>
      <td className = "mail-subject">{data.subject}</td>
      <td className = "mail-date">{data.date}</td>
    </tr>
  );
}