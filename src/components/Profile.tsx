import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

const Username = styled.div`
    font-weight: bold;
    font-size: 18px;
`;

const GroupBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Half = styled.div`
    float: left;
    width: 50%;
    margin: 10px 0;
`;

const Counter = styled.div`
    font-weight: bold;
    color: crimson;
    font-size: 18px;
`;

function Profile() {
    return (
        <>
            <Username>안녕하세요 정재현님</Username>
            <GroupBox>
                <Half>
                    <div>앨범 수</div>
                    <Counter>1</Counter>
                </Half>
                <Half>
                    <div>사진 수</div>
                    <Counter>2</Counter>
                </Half>
            </GroupBox>
            <GroupBox>
                <Link to="/">
                    <Button>로그아웃</Button>
                </Link>
            </GroupBox>
        </>
    );
}

export default Profile;
