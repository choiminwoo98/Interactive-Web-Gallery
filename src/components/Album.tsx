import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { checkState } from "../atom";
import { Button, InputColumn } from "../styles";
import { IAlbum } from "../types";

const Wrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 100px;
    justify-content: center;
    align-items: center;
`;

const BookCover = styled.div`
    width: 150px;
    height: 250px;
    padding: 20px 0px;
`;

const Book = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transform: rotateZ(-30deg);
    border: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
`;

const Overview = styled.div`
    height: 100%;
    width: 240px;
    display: flex;
    padding: 30px 0px;
    flex-direction: column;
    gap: 10px;
`;

const Title = styled.h3`
    font-size: 25px;
    font-weight: bold;
`;

const CreateAt = styled.span`
    font-size: 14px;
    font-weight: 700;
`;

const Description = styled.p`
    font-size: 12px;
    line-height: 1.2;
    width: 100%;
    height: 120px;
    font-weight: 700;
    overflow-wrap: break-word;
    overflow-y: auto;
`;

const wrapperVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 1 },
    },
};

interface IValue {
    album: IAlbum;
}

function Album({ album }: IValue) {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setIsCheck = useSetRecoilState(checkState);
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(target.value);
    const onClick = () => {
        if (album.password && password !== album.password) {
            alert("비밀번호가 틀렸습니다. 다시 시도해주세요");
            return;
        }
        setPassword("");
        setIsCheck(true);
        navigate(`/album/${album.id}`, {
            state: { isCheck: true },
        });
    };
    return (
        <Wrapper variants={wrapperVariants}>
            <BookCover>
                <Book
                    style={{
                        backgroundImage: `url(${
                            album.imagePath
                                ? album.imagePath
                                : "https://blog.kakaocdn.net/dn/XlVZH/btqIH50as13/LwCnDkeRzRz9kETtUMaHyk/img.jpg"
                        })`,
                    }}
                />
            </BookCover>
            <Overview>
                <Title>{album.name}</Title>
                <CreateAt>{album.createdAt}</CreateAt>
                <Description>{album.description}</Description>
                {album.password && (
                    <InputColumn>
                        <input
                            value={password}
                            onChange={onChange}
                            type="password"
                            placeholder="비밀번호 입력"
                        />
                    </InputColumn>
                )}
                <Button onClick={onClick}>열기</Button>
            </Overview>
        </Wrapper>
    );
}

export default Album;
