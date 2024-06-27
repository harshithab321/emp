import React, { useContext } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from'../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'
const Navbar = () => {

const{setCurrency}=useContext(CoinContext)
const currencyHandler=(event)=>{
   switch(event.target.value){
    case "usd":{
        setCurrency({name:"usd",Symbol:"$"})
        break;
    }
    case "euro":{
        setCurrency({name:"euro",Symbol:"e"})
        break;
    }
    case "inr":{
        setCurrency({name:"inr",Symbol:"R"})
        break;
    }
   default:{
        setCurrency({name:"usd",Symbol:"$"})
        break;
    }
   }
}

  return (
    <div className='navbar'>
     <Link to={`/`}>
     <img src={logo} alt="" className='logo'></img>
     </Link>
      
      <ul>
        <Link to={`/`}>
        <li>home</li>
        </Link>
    
        <li>features</li>
        <li>pricing</li>
        <li>blog</li>
      </ul>
      <div className="nav-right">
         <select onChange={currencyHandler}>
            <option value="usd">usd</option>
            <option value="euro">euro</option>
            <option value="inr">inr</option>
         </select>
         <button>sign up<img src={arrow_icon} alt=""></img></button>
      </div>
    </div>
  )
}

export default Navbar