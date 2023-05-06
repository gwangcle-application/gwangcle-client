import Axios from 'axios';
import {GoogleLogin} from '@react-oauth/google';
import {GoogleOAuthProvider} from '@react-oauth/google';


const GoogleLoginButton = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID

    const test = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8080/api/members';
        await Axios.get(url);
    }

    return (
        <div>
            <div>
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={(res) => {
                            const url = 'http://localhost:8080/api/oauth/google/members';
                            const config = { 'content-type': 'application/json' };
                            const token = {
                                "idToken" : res.credential
                            };
                            Axios.post(url, token, config)
                            .then((response) => {
                                localStorage.setItem("id",response.data);
                            })    
                            .catch((error) => {
                                console.error(error);
                            });
                        }}
                        onFailure={(err) => {
                            console.log(err);
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
            <div>
                <button onClick={test}> 테스트 </button>
            </div>
        </div>
    );
};

export default GoogleLoginButton
