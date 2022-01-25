import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import NotFound from "./components/NotFound";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Main from "./routes/Main";
import Detail from "./routes/Detail";
import { getUser } from "./api";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { cacheUserState } from "./atom";

function App() {
    const setCacheUser = useSetRecoilState(cacheUserState);
    const { refetch } = useQuery(["user", "newUser"], getUser, {
        refetchInterval: 5 * 60 * 1000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (data.code.startsWith("200") && data.result) {
                setCacheUser(data.result.User);
            } else {
                setCacheUser(undefined);
            }
        },
    });
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home refetch={refetch} />}>
                    <Route path="" element={<Main />} />
                    <Route path="join" element={<Join />} />
                </Route>
                <Route path="/detail/:albumId" element={<Detail />} />
                <Route path="/detail/:albumId/:photoId" element={<Detail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
    );
}

export default App;
