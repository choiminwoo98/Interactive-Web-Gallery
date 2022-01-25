import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { createAlbum, uploadAlbumImage } from "../api";
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

const Form = styled.form`
    border-bottom: 1px solid silver;
    padding: 10px;
    background-color: #b3c8db;
    overflow: hidden;
`;

interface IForm {
    name: string;
    description?: string;
    password?: string;
    img?: FileList;
}

interface IParams {
    refetch: any;
}

function AlbumForm({ refetch }: IParams) {
    const cacheUser = useRecoilValue(cacheUserState);
    const [url, setUrl] = useState<undefined | string>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IForm>();
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { files },
        } = event;
        if (files) {
            const fd = new FormData();
            fd.append("img", files[0]);
            uploadAlbumImage(fd)
                .then(checkLogin)
                .then((data) => {
                    if (!data) return;
                    if (data.result) {
                        setUrl(data.result.url);
                    }
                })
                .catch((error) => {
                    alert(error.message);
                    window.location.replace("/");
                });
        }
    };
    const onValid = (data: IForm) => {
        createAlbum({
            name: data.name,
            description: data.description,
            password: data.password,
            url,
        })
            .then(checkLogin)
            .then(() => {
                reset();
                refetch();
            })
            .catch((error) => {
                alert(error.message);
                window.location.replace("/");
            });
    };
    return (
        <TimeLine>
            {cacheUser && (
                <Form
                    onSubmit={handleSubmit(onValid)}
                    encType="multipart/form-data"
                >
                    <InputGroup>
                        <InputColumn>
                            <input
                                {...register("name", {
                                    required: "앨범 이름 입력은 필수입니다.",
                                })}
                                placeholder="앨범 이름"
                            />

                            <ErrorMessage>{errors.name?.message}</ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <textarea
                                {...register("description")}
                                placeholder="소개글 작성"
                            />
                            <ErrorMessage>
                                {errors.description?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("password", {
                                    maxLength: {
                                        value: 8,
                                        message:
                                            "앨범 비밀번호는 최대 8자 이내입니다.",
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
                                {...register("img", {
                                    onChange: onChange,
                                })}
                                type="file"
                                accept="image/*"
                            />
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
