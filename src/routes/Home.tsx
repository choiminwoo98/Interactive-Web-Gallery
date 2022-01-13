import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedState } from "../atom";
import AuthForm from "../components/Auth";
import Profile from "../components/Profile";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px;
    @media screen and (min-width: 800px) {
        & {
            width: 800px;
            margin: 0 auto;
        }
    }
`;

const ProfileArea = styled.div`
    width: 100%;
    display: inline-block;
    vertical-align: top;
    margin: 10px 0;

    @media screen and (min-width: 800px) {
        & {
            width: 290px;
            margin-bottom: 0;
        }
    }
`;

const ProfileWrap = styled.div`
    text-align: left;
    padding: 10px 25px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid silver;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
        & {
            margin: 0px;
        }
    }
`;

function Home() {
    const [isLogged, setIsLogged] = useRecoilState(isLoggedState);
    const onClick = () => {
        setIsLogged((prev) => !prev);
    };
    return (
        <Container>
            <ProfileArea>
                <ProfileWrap>
                    {isLogged ? <Profile /> : <AuthForm />}
                </ProfileWrap>
                <button onClick={onClick}>변환</button>
            </ProfileArea>
            <Outlet />
        </Container>
    );
}

export default Home;
