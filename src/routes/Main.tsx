import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { albumState, checkState, isLoggedState } from "../atom";
import Album from "../components/Album";
import AlbumForm from "../components/AlbumForm";

const SliderWrap = styled.div`
    grid-column: span 2;
    height: 300px;
    position: relative;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #b4d6e2;
`;

const ButtonArrow = styled(motion.div)`
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 1;
`;

const Slider = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    position: absolute;
    justify-content: center;
    align-items: center;
`;

const CircleWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const Circle = styled(motion.div)<{ isClicked: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.isClicked ? (props) => "black" : "white"};
    cursor: pointer;
`;

const sliderVariants = {
    hidden: (isBack: boolean) => ({
        x: isBack ? -800 : 800,
        transition: {
            duration: 1,
        },
    }),
    visible: {
        x: 0,
        transition: {
            duration: 1,
        },
    },
    exit: (isBack: boolean) => ({
        x: isBack ? 800 : -800,
        transition: {
            duration: 1,
        },
    }),
};

function Main() {
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [back, setBack] = useState(false);
    const [isCheck, setIsCheck] = useRecoilState(checkState);
    const albums = useRecoilValue(albumState);
    const isLogged = useRecoilValue(isLoggedState);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onClickIncrease = () => {
        if (leaving) return;
        setBack(false);
        toggleLeaving();
        setIndex((prev) => (prev + 1 === albums.length ? 0 : prev + 1));
    };
    const onClickDecrease = () => {
        if (leaving) return;
        setBack(true);
        toggleLeaving();
        setIndex((prev) => (prev - 1 < 0 ? albums.length - 1 : prev - 1));
    };
    const onClickSelect = (curIndex: number) => {
        if (leaving || index === curIndex) return;
        else if (index < curIndex) {
            setBack(false);
            toggleLeaving();
        } else {
            setBack(true);
            toggleLeaving();
        }
        setIndex(curIndex);
    };
    useEffect(() => {
        if (isCheck) setIsCheck(false);
    }, [isCheck, setIsCheck]);
    return (
        <>
            {isLogged && (
                <>
                    <AlbumForm />
                    {albums.length !== 0 && (
                        <SliderWrap>
                            <ButtonArrow
                                style={{ left: 0 }}
                                onClick={onClickDecrease}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="far"
                                    data-icon="arrow-alt-circle-left"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="svg-inline--fa fa-arrow-alt-circle-left fa-w-16 fa-5x"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"
                                    ></path>
                                </svg>
                            </ButtonArrow>
                            <AnimatePresence
                                initial={false}
                                onExitComplete={toggleLeaving}
                                custom={back}
                            >
                                <Slider
                                    custom={back}
                                    key={index}
                                    variants={sliderVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ type: "tween" }}
                                >
                                    <Album album={albums[index]} />
                                </Slider>
                            </AnimatePresence>
                            <ButtonArrow
                                style={{ right: 0 }}
                                onClick={onClickIncrease}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="far"
                                    data-icon="arrow-alt-circle-right"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="svg-inline--fa fa-arrow-alt-circle-right fa-w-16 fa-5x"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"
                                    ></path>
                                </svg>
                            </ButtonArrow>
                            <CircleWrapper>
                                {albums.map((value, curIndex) =>
                                    curIndex === index ? (
                                        <Circle
                                            key={curIndex}
                                            isClicked={curIndex === index}
                                            onClick={() =>
                                                onClickSelect(curIndex)
                                            }
                                        />
                                    ) : (
                                        <Circle
                                            key={curIndex}
                                            isClicked={curIndex === index}
                                            onClick={() =>
                                                onClickSelect(curIndex)
                                            }
                                        />
                                    )
                                )}
                            </CircleWrapper>
                        </SliderWrap>
                    )}
                </>
            )}
        </>
    );
}

export default Main;
