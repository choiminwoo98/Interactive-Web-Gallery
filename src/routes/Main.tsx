import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoggedState } from "../atom";
import {
    Button,
    ButtonGroup,
    ErrorMessage,
    InputColumn,
    InputGroup,
    TimeLine,
} from "../styles";

const AlbumForm = styled.form`
    border-bottom: 1px solid silver;
    padding: 10px;
    background-color: #b3c8db;
    overflow: hidden;
`;

interface IFormValue {
    name: string;
    description?: string;
    password?: string;
    passwordCheck?: string;
    imagePath?: string;
}

function Main() {
    const isLogged = useRecoilValue(isLoggedState);
    const {
        register,
        watch,
        handleSubmit,
        setError,
        getValues,
        formState: { errors },
    } = useForm<IFormValue>();
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
    const onValid = (data: IFormValue) => {
        console.log("success");
    };
    return (
        <TimeLine>
            {isLogged && (
                <AlbumForm onSubmit={handleSubmit(onValid)}>
                    <InputGroup>
                        <InputColumn messageWidth={"300px"}>
                            <input
                                {...register("name", {
                                    required: "앨범 이름 입력은 필수입니다.",
                                })}
                                size={15}
                                placeholder="앨범 이름"
                            />

                            <ErrorMessage>{errors.name?.message}</ErrorMessage>
                        </InputColumn>
                        <InputColumn messageWidth="120px">
                            <textarea
                                {...register("description")}
                                placeholder="소개글 작성"
                            />
                            <ErrorMessage>
                                {errors.description?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn messageWidth={"320px"}>
                            <input
                                {...register("password", {
                                    maxLength: {
                                        value: 8,
                                        message:
                                            "앨범 비밀번호는 최대 8자 이내입니다.",
                                    },
                                })}
                                size={8}
                                type="password"
                                placeholder="비밀번호"
                            />
                            <ErrorMessage>
                                {errors.password?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn messageWidth={"320px"}>
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
                                size={8}
                                type="password"
                                placeholder="비밀번호 재확인"
                            />
                            <ErrorMessage>
                                {errors.passwordCheck?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("imagePath")}
                                type="url"
                                placeholder="이미지 경로"
                            />
                            <ErrorMessage>
                                {errors.imagePath?.message}
                            </ErrorMessage>
                        </InputColumn>
                    </InputGroup>
                    <ButtonGroup>
                        <Button type="submit" as="button">
                            생성
                        </Button>
                    </ButtonGroup>
                </AlbumForm>
            )}
        </TimeLine>
    );
}

export default Main;
