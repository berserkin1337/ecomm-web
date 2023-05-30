import {Route, Routes} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import Shop from "./routes/shop/shop.component";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        return onAuthStateChangedListener((user) => {
            const func = async () => {
                if (user) {

                    await createUserDocumentFromAuth(user);
                }
                dispatch(setCurrentUser(user));
            }
            func();

        });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index={true} element={<Home/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path={"auth"} element={<Authentication/>}/>
                <Route path={"checkout"} element={<Checkout/>}/>
            </Route>
        </Routes>
    );
};

export default App;
