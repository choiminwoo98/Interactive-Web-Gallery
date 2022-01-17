import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import NotFound from "./components/NotFound";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Main from "./routes/Main";
import Detail from "./routes/Detail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="" element={<Main />} />
                    <Route path="join" element={<Join />} />
                </Route>
                <Route path="/album/:albumId" element={<Detail />} />
                <Route path="/album/:albumId/:photoId" element={<Detail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={true} />
        </BrowserRouter>
    );
}

export default App;
