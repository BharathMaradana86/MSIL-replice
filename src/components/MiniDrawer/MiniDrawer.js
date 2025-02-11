import React,{useContext} from 'react'
import { Outlet, useNavigate} from 'react-router-dom';
import './MiniDrawer.css'
import hypervise_head_blue from '../../images/hypervise-blue.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsightsIcon from '@mui/icons-material/Insights';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import MobileMenu from '../MobileMenu/MobileMenu';
import Home_Blue from '../../images/home-blue.svg';
import Home_Black from '../../images/home-black.svg';
import Reports_Blue from '../../images/reports-blue.svg';
import Reports_Black from '../../images/reports-black.svg';
import Configure_Dark from '../../images/Configure_Dark.svg';
import Configure_Light from '../../images/Configure_Light.svg';
import Analytics_Dark from '../../images/Analytics_Dark.svg';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Analytics_Light from '../../images/Analytics_Light.svg';
import { handleSignOut } from '../../API/api';
import { AuthContext } from '../../utils/Auth.context';


function MiniDrawer() {

    const { UserCredentials } = useContext(AuthContext)
    const navigate = useNavigate();
    const innerWidth = window.innerWidth<701

    const [datacred,setDatacred] = React.useState()

    const logout = async () => {
        const res = await handleSignOut([]);
        localStorage.setItem('token',null);
        navigate("/Login");
        // const link = document.createElement('a');
        // link.href = '/login';
        // link.click();
      }

  return (
    <>
      {innerWidth && <MobileMenu /> }

      {!innerWidth ?
        <div className='minidrawer_div'>
          <div className='list-element-parent'>
            <div className='list-element' onClick={() => navigate('/')}>
                <img src={Home_Blue} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_blue' />
                <img src={Home_Black} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_black' />
                <p className='list-element-text'>Overview</p>
            </div>
            <div className='list-element' onClick={() => navigate('/analytics')}>
                <img src={Analytics_Dark} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_blue' />
                <img src={Analytics_Light} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_black' />
                <p className='list-element-text'>Analytics</p>
            </div>
            <div className='list-element' onClick={() => navigate('/reports')}>
                <img src={Reports_Blue} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_blue' />
                <img src={Reports_Black} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_black' />
                <p className='list-element-text'>Reports</p>
            </div>
            
          {  (<div className='list-element' onClick={() => navigate('/configure')}>
                <img src={Configure_Dark} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_blue' />
                <img src={Configure_Light} alt='home' style={{width:'24px',height:'24px'}} className='icon_light_black' />
                <p className='list-element-text'>Configure</p>
            </div>)}
            <div className='list-element' onClick={() => navigate('/parts')}>
             
                <SettingsApplicationsIcon sx={{color:'#707784'}}/>
                <p className='list-element-text'>Parts</p>
            </div>
          </div>
          <div className='list-element-1' onClick={logout}>
              <LogoutIcon style={{color:'#FF5630'}}/>
              <p>Sign Out</p>
          </div>
        </div> 
        : 
        <></>
      }

      <Outlet />
    </>
  )
}

export default MiniDrawer
