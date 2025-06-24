import React, { useEffect, useState } from "react";

const Badge = ({ status , text }) => {
const [badgeColor , setBadgeColor ] = useState()

  useEffect(()=>{

   switch (status) {
    case 'Pending':
      setBadgeColor('blue')
      break;
   
    case 'Running':
      setBadgeColor('yellow')
      break;
   
    case 'Completed':
      setBadgeColor('green')
      break;
   
    case 'Failed':
      setBadgeColor('red')
      break;
   
    default:
      console.log('nothing to in status');
      break;
   }

  },[])
  return (
    <>
      {badgeColor === "blue" && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
          {text}
        </span>
      )}
      {badgeColor === "red" && (
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          {text}
        </span>
      )}
      {badgeColor === "green" && (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          {text}
        </span>
      )}
      {badgeColor === "yellow" && (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          {text}
        </span>
      )}
    </>
  );
};

export default Badge;