import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import { IPhoto } from "../types";

const Wrapper = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    padding: 20px;
    padding-bottom: 50px;
`;

const BigContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const BigHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
        color: tomato;
        font-size: 46px;
    }

    span {
        color: tomato;
        font-size: 20px;
    }
`;

const BigOverview = styled.p`
    padding: 15px 0px;
`;

const BigCover = styled.div<{ url: string }>`
    width: 100%;
    flex: 1;
    background-image: ${(props) => "url(" + props.url + ")"};
    background-size: cover;
    background-position: center center;
`;

const BigHashTag = styled.span`
    width: 100%;
    position: absolute;
    bottom: 20px;
    span {
        width: 100%;
        padding: 20px 0px;
    }
`;

interface IParams {
    photoId?: string;
    photo?: IPhoto;
}

function BigPhoto({ photoId, photo }: IParams) {
    const { scrollY } = useViewportScroll();
    const y = useMotionValue(scrollY.get() + 100);
    useEffect(() => {
        scrollY.onChange(() => {
            y.set(scrollY.get() + 100);
        });
    }, [scrollY, y]);
    console.log(photo);
    return (
        <Wrapper layoutId={photoId} style={{ top: y }}>
            {photo && (
                <BigContainer>
                    <BigHeader>
                        <h3>{photo.title}</h3>
                        <span>{photo.createdAt}</span>
                    </BigHeader>
                    <BigOverview>{photo.description}</BigOverview>
                    <BigCover url={photo.url} />
                    <BigHashTag>
                        <span>
                            {photo.hashTags
                                .map((hashTag) => `#${hashTag}`)
                                .join(" ")}
                        </span>
                    </BigHashTag>
                </BigContainer>
            )}
        </Wrapper>
    );
}

export default BigPhoto;
