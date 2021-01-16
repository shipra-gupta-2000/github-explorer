import { render } from '@testing-library/react';
import React from 'react';
const  Repocart=({ repo })=>{
    return (
        <div className="repo">
        <div className="card">
            <div className="card-body" style={{backgroundColor:"lightcyan"}}>
               <a href={repo.html_url} target="_blank"><h1>{repo.full_name}</h1></a>
               <p><strong>Stars : </strong>{repo.stargazers_count}</p>
               <p><strong>Watchers : </strong>{repo.watchers_count}</p>
               <p><strong>Last updated : </strong>{repo.updated_at}</p>
            </div>
        </div>
        </div>
    )
}   
export default Repocart;