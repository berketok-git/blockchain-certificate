import React, { forwardRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const Post = forwardRef(
  
  ({ ownerName,certificateId, instituteName,instituteAddress,certificateType,certificateTypeId,creationDate,additionalKey,additionalValue}, ref) => {
    return (
      
      <div className="card text-center"  ref={ref}>
              <div className="card-header">Certificate ID:{certificateId}</div>
              <ul className="list-group list-group-flush">
              <li className="list-group-item">Owner:{ownerName} </li>
              <li className="list-group-item">Certificate Type:{certificateType} </li>
              <li className="list-group-item">Certificate Type ID:{certificateTypeId} </li>
              <li className="list-group-item">Institute Name:{instituteName} </li>
              <li className="list-group-item">Institute Adress:{instituteAddress} </li>
              <li className="list-group-item">Creation Date:{creationDate} </li>
              <li className="list-group-item">{additionalKey}:{additionalValue} </li>
              </ul>
            </div>
            
    );
  }
);

export default Post;
