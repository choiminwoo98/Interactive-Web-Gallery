import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
const InputGroup = styled.div`
    margin-bottom: 15px;
    margin-right: 5px;
    input {
        width: 100%;
        margin: 3px 0px;
        box-sizing: border-box;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;
function AuthForm() {
    const { register, handleSubmit } = useForm();
    const onValid = () => {};
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <InputGroup>
                <input
                    {...register("email", {
                        required: "이메일을 입력해주세요.",
                    })}
                    type="text"
                    placeholder="이메일"
                />
                <input
                    {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                    })}
                    type="password"
                    placeholder="비밀번호"
                />
            </InputGroup>
            <ButtonGroup>
                <Link to="/">
                    <Button>회원가입</Button>
                </Link>
                <Button type="submit" as="button">
                    로그인
                </Button>
            </ButtonGroup>
        </form>
    );
}

/* form#login-form(action="/auth/login" method="post")
                            div.input-group
                                label(for="account") 계정
                                input#account(type="text" name="account" required autofocus)
                            div.input-group
                                label(for="password") 비밀번호
                                input#password(type="password" name="password" required)
                            a#join(href="/join" class="btn") 회원가입
                            button#id(type="submit" class="btn") 로그인
                            a#kakao(href="/auth/kakao" class="btn") 카카오톡
 */
export default AuthForm;
