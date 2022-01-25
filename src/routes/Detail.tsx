import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useQuery } from "react-query";
import {
    useLocation,
    useMatch,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { authAlbum, getAlbum } from "../api";
import { cacheUserState, checkState } from "../atom";
import BigPhoto from "../components/BigPhoto";
import Board from "../components/Board";
import NotFound from "../components/NotFound";
import PhotoForm from "../components/PhotoForm";
import ThreeDotsWave from "../components/ThreeDotsWave";
import { IAlbum } from "../types/model";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px 0px;
    padding-bottom: 400px;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

interface IState {
    state: {
        isCheck: boolean;
    };
}

function Detail() {
    const cacheUser = useRecoilValue(cacheUserState);
    const { albumId } = useParams();
    const { state } = useLocation() as IState;
    const [album, setAlbum] = useState<IAlbum | undefined>();
    const [isCheck, setIsCheck] = useRecoilState(checkState);
    const navigate = useNavigate();
    const bigPhotoMatch = useMatch(`/detail/${albumId}/:photoId`);
    const { isLoading, refetch } = useQuery(
        ["Album", albumId + ""],
        () => (albumId && +albumId ? getAlbum(+albumId) : undefined),
        {
            enabled: !!albumId,
            onSuccess: (data) => {
                if (data && data.code.startsWith("200") && data.result) {
                    setAlbum(data.result.Album);
                } else setAlbum(undefined);
            },
            notifyOnChangeProps: ["isLoading"],
        }
    );
    const clickedPhoto =
        albumId &&
        bigPhotoMatch?.params.photoId &&
        album?.Photos?.find(
            (photo) => String(photo.id) === bigPhotoMatch?.params.photoId
        );
    const isNotFound =
        !albumId || !+albumId || !album || (bigPhotoMatch && !clickedPhoto);
    const onOverlayClick = () =>
        navigate(`/detail/${albumId}`, {
            replace: true,
        });
    const changeIndex = (droppableId: string, index: number) => {
        if (droppableId === "left") return index * 2;
        else return index * 2 + 1;
    };
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;
        if (!album || !album.Photos) return;

        const sourceIndex = changeIndex(source.droppableId, source.index);
        const destinationIndex = changeIndex(
            destination.droppableId,
            destination.index
        );

        if (album.Photos.length <= destinationIndex) return;

        setAlbum((curAlbum) => {
            const albumCopy = { ...curAlbum };
            if (albumCopy.Photos) {
                const photosCopy = [...albumCopy.Photos].filter(
                    (photo) => photo !== undefined
                );

                [photosCopy[destinationIndex], photosCopy[sourceIndex]] = [
                    photosCopy[sourceIndex],
                    photosCopy[destinationIndex],
                ];

                albumCopy.Photos = photosCopy;
            }

            return { ...albumCopy };
        });
    };
    useEffect(() => {
        if (!(state?.isCheck || isCheck) && album && album.locked && album.id) {
            let isWrong = true;
            do {
                let copyIsWrong = true;
                const password = prompt("비밀번호 입력", "");

                if (!password) break;
                authAlbum(album.id, password)
                    .then((data) => {
                        if (data.code.startsWith("200")) copyIsWrong = false;
                    })
                    .catch((error) => {
                        alert(error.message);
                        navigate("/", { replace: true });
                    });

                isWrong = copyIsWrong;
            } while (
                isWrong &&
                window.confirm("비밀번호가 틀렸습니다. 다시 시도하겠습니까?")
            );

            if (isWrong) {
                return navigate(-1);
            }
            setIsCheck(true);
        }
    }, [album, isCheck, navigate, setIsCheck, state]);
    return (
        <>
            {isLoading && <ThreeDotsWave />}
            {!isLoading && isNotFound ? (
                <NotFound />
            ) : (
                <Wrapper>
                    {cacheUser && album?.id && (
                        <PhotoForm albumId={album.id} refetch={refetch} />
                    )}

                    <DragDropContext onDragEnd={onDragEnd}>
                        {["left", "right"].map((value) => (
                            <Board
                                boardId={value}
                                key={value}
                                photos={
                                    album?.Photos
                                        ? album.Photos.filter(
                                              (photo, index) =>
                                                  photo &&
                                                  index % 2 ===
                                                      (value === "left" ? 0 : 1)
                                          )
                                        : []
                                }
                            />
                        ))}
                    </DragDropContext>

                    <AnimatePresence exitBeforeEnter={false}>
                        {bigPhotoMatch && (
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                                <BigPhoto
                                    photoId={bigPhotoMatch.params.photoId}
                                    photo={clickedPhoto || undefined}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </Wrapper>
            )}
        </>
    );
}

export default Detail;
