import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import AppHeader from "../appHeader/AppHeader";
import SingleComicPage from "../pages/SingleComicPage";
import Page404 from "../pages/404";


const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/marvel_build" element={<MainPage/>} />
                        <Route path="/comics" element={<ComicsPage/>} />
                        <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;