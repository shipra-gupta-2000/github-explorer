import React from 'react'
import './App.css';
import Search from './Search.js';
import Usercart from './usercart';
import Repocart from './repocart';
const size=10;
export default class App extends React.Component {
  state={
    user:null,
    usererror:null,
    repoerror:null,
    loading:false,
    repo:[],
    page:1
  };
  fetchuserdata=async user=>{
    const res = await fetch(`https://api.github.com/users/${user}`);
    if(res.ok){
      const data=await res.json();
      return {data};
    }  
    const error=(await res.json()).message  
    return {error}  
  };
  fetchrepos=async (user)=>{
    const page=this.state.page;
    const res=await fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${size}`);
    if(res.ok){
      const data=await res.json();
      return {data,page:page+1};
    }  
    const error=(await res.json()).message  
    return {error}  
  }
  fetchdata=async username=>{
    this.setState({loading:true},async()=>{
      this.setState({loading:false})
      try{
         const [user,repo]=await Promise.all([ this.fetchuserdata(username),this.fetchrepos(username)]);
         if(user.data&&repo.data)
         return this.setState({user:user.data,repo:repo.data,page:repo.page})
         this.setState({usererror:user.error,repoerror:repo.error});

        }
        catch(err)
        { 
          this.setState({error:"there was some error"});
        }
    }
    );

  }
  loadmore=async ()=>{
    const {data,page}=await this.fetchrepos(this.state.user.login);
    if(data)
    this.setState((state)=>({
      repo:[...state.repo,...data],
      page
    }))
  }
  render(){
    const {user,usererror,repoerror,loading,repo,page}=this.state;
    console.log(user);
    let totalrepo=null;
    if(user)
    totalrepo=user.public_repos;
  return (
    <div>
      <Search fetch={this.fetchdata}/>
      {loading&&<p className="text-success">loading...</p>}
      {usererror&&<p className="text-danger">user{usererror}</p>}
      {repoerror&&<p className="text-danger">repo{repoerror}</p>}
      {!usererror && !loading && user && <Usercart user={user}/>}
      {!loading&&!repoerror&&
      repo.map(repo=>
      <Repocart key={repo.id} repo={repo}/>)}
      <div style={{paddingLeft:"47%"}}>
      {user&&repo&&!loading&&!repoerror&&(page-1)*size<totalrepo&&<button className="btn btn-success"onClick={this.loadmore}>load more</button>}
      </div>
    </div>
  );
  }
};