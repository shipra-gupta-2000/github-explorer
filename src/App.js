import React from 'react'
import './App.css';
import Search from './Search.js';
import Usercart from './usercart';
import Repocart from './repocart';
export default class App extends React.Component {
  state={
    user:"",
    usererror:null,
    repoerror:null,
    loading:false,
    repo:[]
  };
  fetchuserdata=async user=>{
    const res = await fetch(`https://api.github.com/users/${user}`);
    if(res.ok){
      const data=await res.json();
      console.log("yes");
      return {data};
    }  
    const error=(await res.json()).message  
    return {error}  
  };
  fetchrepos=async user=>{
    const res=await fetch(`https://api.github.com/users/${user}/repos?page=1`);
    if(res.ok){
      const data=await res.json();
      console.log("repo")
      return {data};
    }  
    const error=(await res.json()).message  
    return {error}  
  }
  fetchdata=async username=>{
    this.setState({loading:true},async()=>{
      this.setState({loading:false})
      try{
         const [user,repo]=await Promise.all([ this.fetchuserdata(username),await this.fetchrepos(username)]);
         await this.fetchuserdata(user);
         if(user.data&&repo.data)
         return this.setState({user:user.data,repo:repo.data})
         this.setState({usererror:user.error,repoerror:repo.error});

        }
        catch(err)
        {
          this.setState({error:"there was some error"});
        }
    }
    );

  }
  render(){
    const {user,usererror,repoerror,loading,repo}=this.state;
    console.log(repo)
  return (
    <div>
      <Search fetch={this.fetchdata}/>
      {loading&&<p className="text-success">loading...</p>}
      {usererror&&<p className="text-danger">user{usererror}</p>}
      {repoerror&&<p className="text-danger">repo{repoerror}</p>}
      {!usererror && !loading && user && <Usercart user={user}/>}
      {!loading&&!repoerror&&
      repo.map((repo,index)=>
      <Repocart key={repo.id} repo={repo}/>)}
    </div>
  );
  }
};