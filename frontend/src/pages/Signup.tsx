import { Auth } from "../components/Auth"
import { Feedback } from "../components/Feedback"

export const SignUp = () => {
    return (
        <div className="grid grid-cols-2">
            <div>
                <Auth/>
            </div>
            <div className='invisible lg:visible'>
                <Feedback/>
            </div>
        </div>
    )
}