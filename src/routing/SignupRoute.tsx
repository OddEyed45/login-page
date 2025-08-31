import '../index.css'
import SignUpPage from '../pages/SignUpPage'
import UserHomePage from '../pages/UserHomePage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SignupRoute(props : any) {
        return props.loggedIn ? <UserHomePage/> : <SignUpPage/>
}

export default SignupRoute