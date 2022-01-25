import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cacheUserState } from "../atom";
import AuthForm from "../components/Auth";
import Profile from "../components/Profile";

const Container = styled.div`
    width: 100%;
    height: 100%;
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-content: center;
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
    background-color: #bde2b9;
    @media screen and (max-width: 800px) {
        & {
            margin: 0px;
        }
    }
`;

interface IParams {
    refetch: any;
}

function Home({ refetch }: IParams) {
    const cacheUser = useRecoilValue(cacheUserState);
    return (
        <Container>
            <ProfileArea>
                <ProfileWrap>
                    {cacheUser ? (
                        <Profile refetch={refetch} />
                    ) : (
                        <AuthForm refetch={refetch} />
                    )}
                </ProfileWrap>
            </ProfileArea>

            <Outlet />
        </Container>
    );
}

export default Home;
