import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    useLocation,
    useMatch,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { albumState } from "../atom";
import BigPhoto from "../components/BigPhoto";
import Board from "../components/Board";
import NotFound from "../components/NotFound";
import PhotoForm from "../components/PhotoForm";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px 0px;
    margin-bottom: 400px;
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
    const [isNotFound, setIsNotFound] = useState(false);
    const { albumId } = useParams();
    const { state } = useLocation() as IState;
    const bigPhotoMatch = useMatch(`/album/${albumId}/:photoId`);
    const navigate = useNavigate();
    const [albums, setAlbums] = useRecoilState(albumState);
    const [albumIndex] = useState(
        albums.findIndex((album) => String(album.id) === albumId)
    );
    const clickedPhoto =
        albumId &&
        bigPhotoMatch?.params.photoId &&
        albums[albumIndex]?.photos.find(
            (movie) => String(movie.id) === bigPhotoMatch?.params.photoId
        );
    const onOverlayClick = () =>
        navigate(`/album/${albumId}`, { replace: true });
    const changeIndex = (droppableId: string, index: number) => {
        if (droppableId === "left") return index * 2;
        else return index + 1;
    };
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;
        setAlbums((allAlbums) => {
            const allAlbumsCopy = [...allAlbums];
            const albumCopy = { ...allAlbumsCopy[albumIndex] };
            const photosCopy = [...albumCopy.photos];
            const sourceIndex = changeIndex(source.droppableId, source.index);
            const destinationIndex = changeIndex(
                destination.droppableId,
                destination.index
            );

            const sourceObj = photosCopy[sourceIndex];

            photosCopy.splice(sourceIndex, 1);
            photosCopy.splice(destinationIndex, 0, sourceObj);

            albumCopy.photos = photosCopy;

            allAlbumsCopy.splice(albumIndex, 1);
            allAlbumsCopy.splice(albumIndex, 0, albumCopy);

            return [...allAlbumsCopy];
        });
    };
    useEffect(() => {
        if (!albumId || albumIndex === -1) {
            return setIsNotFound(true);
        } else if (albums[albumIndex].password && !state.isCheck) {
            let isWrong = true;
            do {
                isWrong =
                    prompt("비밀번호 입력", "") !== albums[albumIndex].password;
            } while (
                isWrong &&
                window.confirm("비밀번호가 틀렸습니다. 다시 시도하겠습니까?")
            );

            if (isWrong) {
                return navigate(-1);
            }
        }
    }, [albumId, navigate, state, albums, albumIndex]);
    return (
        <>
            {(bigPhotoMatch && !clickedPhoto) || isNotFound ? (
                <NotFound />
            ) : (
                <>
                    <Wrapper>
                        <PhotoForm albumId={albumId || ""} />
                        <DragDropContext onDragEnd={onDragEnd}>
                            <AnimatePresence>
                                <Board
                                    boardId="left"
                                    key="left"
                                    photos={
                                        albums[albumIndex]
                                            ? albums[albumIndex].photos.filter(
                                                  (photo, index) =>
                                                      photo && index % 2 === 0
                                              )
                                            : []
                                    }
                                />
                                <Board
                                    boardId="right"
                                    key="right"
                                    photos={
                                        albums[albumIndex]
                                            ? albums[albumIndex].photos.filter(
                                                  (photo, index) =>
                                                      photo && index % 2 !== 0
                                              )
                                            : []
                                    }
                                />
                            </AnimatePresence>
                        </DragDropContext>
                    </Wrapper>
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
                </>
            )}
        </>
    );
}

export default Detail;
