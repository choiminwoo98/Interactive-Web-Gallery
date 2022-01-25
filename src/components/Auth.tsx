import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../api";
import {
    Button,
    ButtonGroup,
    ErrorMessage,
    InputColumn,
    InputGroup,
} from "../styles";
import { checkLogin } from "../utils";

interface IForm {
    account: string;
    password: string;
}

interface IParams {
    refetch: any;
}

function AuthForm({ refetch }: IParams) {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<IForm>();
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/join");
    };
    const onValid = ({ account, password }: IForm) => {
        authLogin({ account, password })
            .then(checkLogin)
            .then((data) => {
                if (data.code.startsWith("412") && data.result) {
                    setError(data.result.input, { message: data.message });
                } else {
                    refetch();
                    reset();
                }
            })
            .catch((error) => {
                alert(error.message);
                window.location.replace("/");
            });
    };
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <InputGroup>
                <InputColumn>
                    <input
                        {...register("account", {
                            required: "이메일 혹은 닉네임을 입력해주세요.",
                        })}
                        type="text"
                        placeholder="이메일 혹은 닉네임"
                    />
                    <ErrorMessage>{errors.account?.message}</ErrorMessage>
                </InputColumn>
                <InputColumn>
                    <input
                        {...register("password", {
                            required: "비밀번호를 입력해주세요.",
                        })}
                        type="password"
                        placeholder="비밀번호"
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>
                </InputColumn>
            </InputGroup>
            <ButtonGroup>
                <Button type="submit" as="button">
                    로그인
                </Button>

                <Button onClick={onClick}>회원가입</Button>
            </ButtonGroup>
        </form>
    );
}

export default AuthForm;
