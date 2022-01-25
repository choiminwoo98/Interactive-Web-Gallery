import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { addPhoto, uploadPhotoImage } from "../api";
import {
    Button,
    ButtonGroup,
    ErrorMessage,
    InputColumn,
    InputGroup,
} from "../styles";
import { IPhoto } from "../types/model";
import { checkLogin } from "../utils";
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
    albumId: number;
    refetch: any;
}

interface IForm {
    title: string;
    description?: string;
    hashtags?: string;
    img: FileList;
}

function PhotoForm({ albumId, refetch }: IParams) {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<IForm>();
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { files },
        } = event;
        if (files) {
            setIsLoading(true);
            const fd = new FormData();
            fd.append("img", files[0]);
            uploadPhotoImage(fd)
                .then(checkLogin)
                .then((data) => {
                    if (data.result) {
                        setUrl(data.result.url);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    alert(error.message);
                    window.location.replace("/");
                });
        }
    };
    const onValid = (data: IForm) => {
        const newObj = {} as IPhoto;
        newObj["title"] = data["title"];
        newObj["description"] = data["description"];
        newObj["url"] = url;
        if (data["hashtags"]) {
            newObj["Hashtags"] = data["hashtags"]
                .trim()
                .split("#")
                .slice(1)
                .map((str) => str.trim());
        } else {
            newObj["Hashtags"] = [];
        }

        addPhoto(albumId, newObj)
            .then(checkLogin)
            .then((data) => {
                if (data.code.startsWith("412") && data.result) {
                    setError(data.result.input, { message: data.message });
                    return;
                }

                setIsLoading(false);
                setUrl("");
                reset();
                refetch();
            })
            .catch((error) => {
                alert(error.message);
                window.location.replace("/");
            });
    };
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onValid)}>
                <PreviewWrap>
                    {isLoading ? (
                        <ThreeDotsWave />
                    ) : (
                        <Preview imagePath={url} />
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
                                {...register("hashtags", {
                                    pattern: {
                                        value: /#([0-9a-zA-Z가-힣]*)/g,
                                        message:
                                            "태그는 (# 태그 ...) 방식으로 입력하셔야 합니다.",
                                    },
                                })}
                                placeholder="태그 입력"
                            />
                            <ErrorMessage>
                                {errors.hashtags?.message}
                            </ErrorMessage>
                        </InputColumn>
                        <InputColumn>
                            <input
                                {...register("img", {
                                    required: "이미지 입력은 필수입니다.",
                                    onChange: onChange,
                                })}
                                type="file"
                                accept="image/*"
                            />
                            <ErrorMessage>{errors.img?.message}</ErrorMessage>
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
