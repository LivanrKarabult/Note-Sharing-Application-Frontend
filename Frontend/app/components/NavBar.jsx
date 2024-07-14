import React,{useState} from 'react'
import "./NavBar.css"
import { useRouter } from 'next/navigation';


export const NavBar = () => {

  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className='app_navbar'>
      
        <a className='app_header' to='/'> NoteTrove</a>
    
        <ul className='nav_list'>
          <li className='item'>
              <a  href ='/information'>Information</a>
          </li>
          <li className='item'>
              <a  href ='/home'>Home</a>
          </li>
          <li className='item'>
              <a  href ='/profile'>Profile</a>
          </li>
          <span className='exit' onClick={handleLogout}>Log Out</span>

        </ul>
        
       
    </nav>
  )
}

