import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { albumState } from "../atom";
import {
    Button,
    ButtonGroup,
    ErrorMessage,
    InputColumn,
    InputGroup,
} from "../styles";
import { IPhoto } from "../types";
import ThreeDotsWave from "./ThreeDotsWave";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
    grid-column: span 2;
`;

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const PreviewWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`;

const Preview = styled.div<{ imagePath: string }>`
    width: 50%;
    height: 50%;
    background-image: ${(props) => "url(" + props.imagePath + ")"};
    background-position: center center;
    background-size: cover;
`;

const GroupWrap = styled.div`
    width: 100%;
    height: 100%;
    border-left: 2px solid ${(props) => props.theme.gray.very};
    padding-left: 10px;
`;

interface IParams {
    albumId: string;
}

interface IForm {
    title: string;
    description?: string;
    hashTags?: string;
    url: string;
}

function PhotoForm({ albumId }: IParams) {
    const [imagePath, setImagePath] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [albums, setAlbums] = useRecoilState(albumState);
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        formState: { errors },
    } = useForm<IForm>();
    const onValid = (data: IForm) => {
        if (isLoading) {
            setError(
                "url",
                {
                    message: "이미지를 불러오는 중 입니다.",
                },
                { shouldFocus: true }
            );
            return;
        }
        if (!isValid) {
            setError(
                "url",
                {
                    message: "이미지를 찾을 수 없습니다.",
                },
                { shouldFocus: true }
            );
            return;
        }

        const newObj = {} as IPhoto;
        const albumIndex = albums.findIndex(
            (album) => String(album.id) === albumId
        );
        if (albumIndex !== -1) {
            const allAlbums = [...albums];
            const albumCopy = { ...albums[albumIndex] };
            newObj["id"] = Date.now();
            newObj["title"] = data["title"];
            newObj["createdAt"] = new Date().toLocaleString();
            newObj["description"] = data["description"];
            newObj["url"] = data["url"];
            if (data["hashTags"]) {
                newObj["hashTags"] = data["hashTags"]
                    .trim()
                    .split("#")
                    .slice(1)
                    .map((str) => str.trim());
            } else {
                newObj["hashTags"] = [];
            }
            albumCopy.photos = [...albumCopy.photos, newObj];

            allAlbums.splice(albumIndex, 1);
            allAlbums.splice(albumIndex, 0, albumCopy);

            setAlbums([...allAlbums]);

            setImagePath("");
            setValue("title", "");
            setValue("description", "");
            setValue("hashTags", "");
            setValue("url", "");
            setIsLoading(false);
            setIsValid(false);
        }
    };
    const onUrlBlur = () => {
        const img = new Image();
        const url = getValues("url");
        setIsLoading(true);

        img.onload = () => {
            setIsLoading(false);
            setIsValid(true);
            setImagePath(url);
        };

        img.onerror = () => {
            setIsLoading(false);
            setIsValid(false);
            setImagePath(
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            );
        };

        img.src = url;
    };
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onValid)}>
                <PreviewWrap>
                    {isLoading ? (
                        <ThreeDotsWave />
                    ) : (
                        <Preview imagePath={imagePath} />
                    )}
                </PreviewWrap>
                <GroupWrap>
                    <InputGroup>
                        <InputColumn>
                            <input
                                {...register("title", {
                                    required: "사진 제목 입력은 필수입니다.",
                                })}
                                placeholder="사진 제목"
                            />

                            <ErrorMessage>{errors.title?.message}</ErrorMessage>
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
                                {...register("hashTags", {
                                    pattern: {
                                        value: /#([0-9a-zA-Z가-힣]*)/g,
                                        message:
                                            "태그는 (# 태그 ...) 방식으로 입력하셔야 합니다.",
                                    },
                                })}
                                placeholder="태그 입력"
                            />
                            <ErrorMessage>
                                {errors.hashTags?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("url", {
                                    required: "이미지 경로 입력은 필수입니다.",
                                    pattern: {
                                        value: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g,
                                        message:
                                            "알맞은 URL 형식으로 입력하세요.",
                                    },
                                })}
                                type="url"
                                placeholder="이미지 경로"
                                onBlur={onUrlBlur}
                            />
                            <ErrorMessage>{errors.url?.message}</ErrorMessage>
                        </InputColumn>
                    </InputGroup>
                    <ButtonGroup>
                        <Button type="submit" as="button">
                            생성
                        </Button>
                    </ButtonGroup>
                </GroupWrap>
            </Form>
        </Wrapper>
    );
}

export default PhotoForm;
