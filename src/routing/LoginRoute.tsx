import '../index.css'
import LoginPage from '../pages/LoginPage'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LoginRoute(props : any) {
        return props.loggedIn ? <Navigate to="/HomePage"/> : <LoginPage/>
}

export default LoginRoute