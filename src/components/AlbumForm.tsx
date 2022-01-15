import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { albumState, isLoggedState } from "../atom";
import {
    Button,
    ButtonGroup,
    ErrorMessage,
    InputColumn,
    InputGroup,
    TimeLine,
} from "../styles";
import { IAlbum } from "../types";

const Form = styled.form`
    border-bottom: 1px solid silver;
    padding: 10px;
    background-color: #b3c8db;
    overflow: hidden;
`;

function AlbumForm() {
    const isLogged = useRecoilValue(isLoggedState);
    const setAlbums = useSetRecoilState(albumState);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IAlbum>();
    const onValid = (data: IAlbum) => {
        data["createdAt"] = new Date().toLocaleDateString();
        setAlbums((prev) => [data, ...prev]);

        setValue("name", "");
        setValue("description", "");
        setValue("password", "");
        setValue("imagePath", "");
    };
    return (
        <TimeLine>
            {isLogged && (
                <Form onSubmit={handleSubmit(onValid)}>
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
                </Form>
            )}
        </TimeLine>
    );
}

export default AlbumForm;
