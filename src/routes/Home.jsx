import { useState } from "react";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
import Profile from "../components/Profile";

const Container = styled.div`
    display: flex;
    max-width: 680px;
    margin: 0 auto;
    justify-self: center;
    align-items: center;
    height: 100vh;
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
    padding: 10px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid silver;
    background-color: lightcoral;
    display: flex;
    flex-direction: column;
`;

function Home() {
    const [isLogged, setIsLogged] = useState(false);
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
        </Container>
    );
}

export default Home;
