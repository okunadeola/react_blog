import FooterCom from '../components/Footer'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <FooterCom/>
    </div>
  )
}

export default UserLayout
