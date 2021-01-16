import React from 'react'
export default class Search extends React.Component{
    state={
        username:'',
    };
    handlechange=e=>{
        const value=e.target.value;
        this.setState({
            username:value
        })
    }
    render()
    {   const {username}=this.state;
        const {fetch}=this.props;
         return (
         <div className="header">  
            <div >
               <div className="row">
                     <input className="col-7"value={username}onChange={this.handlechange}type="text" name="username" placeholder="enter username"></input>
                     <div className="col-1"></div>
                     <button onClick={()=>fetch(username)} className="col-2 btn btn-success">search</button>
                </div>
            </div>
        </div>
         )
    }
}
