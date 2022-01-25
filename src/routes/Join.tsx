import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { createUser } from "../api";
import { cacheUserState } from "../atom";
import {
    Button,
    ButtonGroup,
    ErrorMessage,
    InputColumn,
    InputGroup,
    TimeLine,
} from "../styles";
import { checkLogin } from "../utils";

const JoinForm = styled.form`
    border-bottom: 1px solid silver;
    padding: 10px 35px;
    overflow: hidden;
`;

interface IForm {
    email: string;
    nick: string;
    password: string;
    passwordCheck: string;
}

function Join() {
    const cacheUser = useRecoilValue(cacheUserState);
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        setError,
        getValues,
        formState: { errors },
    } = useForm<IForm>();
    watch(({ password, passwordCheck }) => {
        if (password !== passwordCheck) {
            setError("passwordCheck", {
                message: "동일한 암호를 입력하세요.",
            });
        }
        if (password === passwordCheck) {
            setError("passwordCheck", { message: "" });
        }
    });
    const onValid = ({ email, nick, password }: IForm) => {
        createUser({ email, nick, password })
            .then(checkLogin)
            .then((data) => {
                if (data.code.startsWith("412") && data.result) {
                    setError(data.result.input, { message: data.message });
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                alert(error.message);
                window.location.replace("/");
            });
    };

    return (
        <TimeLine>
            {cacheUser ? (
                <>{navigate("/")}</>
            ) : (
                <JoinForm onSubmit={handleSubmit(onValid)}>
                    <InputGroup>
                        <InputColumn>
                            <input
                                {...register("email", {
                                    required: "이메일 입력은 필수입니다.",
                                })}
                                placeholder="이메일"
                            />
                            <ErrorMessage>{errors.email?.message}</ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("nick", {
                                    required: "닉네임 입력은 필수입니다.",
                                })}
                                placeholder="닉네임"
                            />

                            <ErrorMessage>{errors.nick?.message}</ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("password", {
                                    required: "비밀번호 입력은 필수입니다.",
                                    maxLength: {
                                        value: 100,
                                        message:
                                            "앨범 비밀번호는 최대 100자 이내입니다.",
                                    },
                                })}
                                type="password"
                                placeholder="비밀번호"
                            />

                            <ErrorMessage>
                                {errors.password?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("passwordCheck", {
                                    validate: {
                                        value: (value) => {
                                            const { password } = getValues();
                                            return (
                                                password === value ||
                                                "동일한 암호를 입력하세요."
                                            );
                                        },
                                    },
                                })}
                                type="password"
                                placeholder="비밀번호 재확인"
                            />
                            <ErrorMessage>
                                {errors.passwordCheck?.message}
                            </ErrorMessage>
                        </InputColumn>
                    </InputGroup>
                    <ButtonGroup>
                        <Button type="submit" as="button">
                            회원가입
                        </Button>
                    </ButtonGroup>
                </JoinForm>
            )}
        </TimeLine>
    );
}

export default Join;
