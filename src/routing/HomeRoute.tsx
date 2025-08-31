import '../index.css'
import UserHomePage from '../pages/UserHomePage'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HomeRoute(props : any) {
        return props.loggedIn ? <UserHomePage/> : <Navigate to="/LoginPage"/>
}

export default HomeRoute