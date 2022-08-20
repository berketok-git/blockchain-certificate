import React, { useState, useEffect } from "react";
import Post from "../utils/Post.js";
import FlipMove from "react-flip-move";
import { CWContractAddress } from '../utils/config.js';
import {ethers} from 'ethers';
import ContractAbi from '../utils/Contract.json'


function Feed({}) {
  const [posts, setPosts] = useState([]);

  const getUpdatedCertificates = (allCertificates) => {
    let updatedCertificates = [];
    for(let i=0; i<allCertificates.length; i++) {
        let certificate = {
          'owner_address': allCertificates[i].owner_address,
          'owner_name':allCertificates[i].owner_name,
          'certificate_id':allCertificates[i].certificate_id,
          'certificate_type_id':allCertificates[i].certificate_type_id,
          'creation_date':allCertificates[i].creation_date,
          '_institute_address':allCertificates[i]._institute_address,
          '_institute_name':allCertificates[i]._institute_name,
          '_certificate_type':allCertificates[i]._certificate_type,
          '_additional_fields_key':allCertificates[i]._additional_fields_key,
          '_additional_fields_value':allCertificates[i]._additional_fields_value
        };
        updatedCertificates.push(certificate);
       
    }
    return updatedCertificates;
  }

  const getAllCertificates = async() => {
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const CWContract = new ethers.Contract(
            CWContractAddress,
          ContractAbi.abi,
          signer
        )

        let allCertificates = await CWContract.getMyCertificates();
        setPosts(getUpdatedCertificates(allCertificates, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCertificates();
  }, []);

  return (
    <div className="">
      <div className="">
        <h2>View Your Certificates</h2>
      </div>
      <FlipMove >
        {posts.map((post) => (
          <Post
          ownerName={post.owner_name}
          instituteName={post._institute_name}
          certificateId={post.certificate_id.toString()}
          certificateType={post._certificate_type}
          certificateTypeId={post.certificate_type_id.toString()}
          instituteAddress={post._institute_address.toString()}
          creationDate={post.creation_date.toString()}
          additionalKey={post._additional_fields_key}
          additionalValue={post._additional_fields_value}

          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
