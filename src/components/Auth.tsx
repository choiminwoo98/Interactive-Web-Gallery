import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, InputColumn, InputGroup } from "../styles";

function AuthForm() {
    const { register, handleSubmit } = useForm();
    const onValid = () => {};
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <InputGroup>
                <InputColumn>
                    <input
                        {...register("email", {
                            required: "이메일을 입력해주세요.",
                        })}
                        type="text"
                        placeholder="이메일"
                    />
                </InputColumn>
                <InputColumn>
                    <input
                        {...register("password", {
                            required: "비밀번호를 입력해주세요.",
                        })}
                        type="password"
                        placeholder="비밀번호"
                    />
                </InputColumn>
            </InputGroup>
            <ButtonGroup>
                <Button type="submit" as="button">
                    로그인
                </Button>

                <Button>
                    <Link to="/join">회원가입</Link>
                </Button>
            </ButtonGroup>
        </form>
    );
}

export default AuthForm;
