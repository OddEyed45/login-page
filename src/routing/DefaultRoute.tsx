import '../index.css'
import LoginPage from '../pages/LoginPage'
import UserHomePage from '../pages/UserHomePage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SignupRoute(props : any) {
        return props.loggedIn ? <UserHomePage/> : <LoginPage/>
}

export default SignupRoute