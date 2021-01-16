import userEvent from '@testing-library/user-event';
import React from 'react';
const Usercart=({ user })=>{
    return(
        <div className="user">
        <div className="card">
            <div className="card-body" style={{backgroundColor:"khaki"}}>
                <img  src={user.avatar_url} className="img-fluid"/>
                <h1>{user.name}</h1> 
                <p>{user.company}</p>
                <p>{user.bio}</p>               
            </div>
        </div>
        </div>
    )
}
export default Usercart;