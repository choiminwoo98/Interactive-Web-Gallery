import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

const Wrapper = styled.div`
    width: 400px;
    height: 100vh;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MessageWrap = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 1px solid ${(props) => props.theme.gray.very};
    padding-bottom: 10px;
    svg {
        width: 120px;
    }
`;

const MessageHeader = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    h3 {
        font-size: 25px;
        font-weight: 600;
    }
    span {
        font-size: 16px;
    }
`;

const ButtonWrap = styled.div`
    width: 50%;
    padding: 10px 0px;
`;

function NotFound() {
    const navigate = useNavigate();
    const onClick = () => {
        return navigate("/", { replace: true });
    };
    return (
        <Wrapper>
            <MessageWrap>
                <MessageHeader>
                    <h3>Inform.</h3>
                    <span>I can not find the page you want...</span>
                </MessageHeader>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="file-alt"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="svg-inline--fa fa-file-alt fa-w-12 fa-7x"
                >
                    <path
                        fill="currentColor"
                        d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                    ></path>
                </svg>
            </MessageWrap>
            <ButtonWrap>
                <Button onClick={onClick}>Confirm</Button>
            </ButtonWrap>
        </Wrapper>
    );
}

export default NotFound;
