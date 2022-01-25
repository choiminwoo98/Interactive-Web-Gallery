import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authLogout } from "../api";
import { cacheUserState } from "../atom";
import { Button } from "../styles";
import { checkLogin } from "../utils";

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
    margin-top: 5px;
`;

interface IParams {
    refetch: any;
}

function Profile({ refetch }: IParams) {
    const cacheUser = useRecoilValue(cacheUserState);
    const onClick = () => {
        authLogout()
            .then(checkLogin)
            .then(() => {
                refetch();
            })
            .catch((error) => {
                alert(error.message);
                window.location.replace("/");
            });
    };
    return (
        <>
            {cacheUser && (
                <>
                    <Username>{`안녕하세요 ${cacheUser.nick}님`}</Username>
                    <GroupBox>
                        <Half>
                            <div>앨범 수</div>
                            <Counter>0</Counter>
                        </Half>
                        <Half>
                            <div>사진 수</div>
                            <Counter>0</Counter>
                        </Half>
                    </GroupBox>
                    <GroupBox>
                        <Button onClick={onClick}>로그아웃</Button>
                    </GroupBox>
                </>
            )}
        </>
    );
}

export default Profile;
