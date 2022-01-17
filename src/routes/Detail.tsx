import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    useLocation,
    useMatch,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { albumState } from "../atom";
import BigPhoto from "../components/BigPhoto";
import Board from "../components/Board";
import PhotoForm from "../components/PhotoForm";
import { IPhoto } from "../types";

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

interface IPhotoList {
    [key: string]: IPhoto[];
}

function Detail() {
    const { albumId } = useParams();
    const { state } = useLocation() as IState;
    const bigPhotoMatch = useMatch(`/album/${albumId}/:photoId`);
    const [photoList, setPhotoList] = useState<IPhotoList>({
        left: [],
        right: [],
    });

    const navigate = useNavigate();
    const albums = useRecoilValue(albumState);
    const clickedPhoto =
        albumId &&
        bigPhotoMatch?.params.photoId &&
        albums
            .find((album) => String(album.id) === albumId)
            ?.photos.find(
                (movie) => String(movie.id) === bigPhotoMatch?.params.photoId
            );
    const onOverlayClick = () =>
        navigate(`/album/${albumId}`, { replace: true });
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;
        if (destination.droppableId === source.droppableId) {
            setPhotoList((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            setPhotoList((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [
                    ...allBoards[destination.droppableId],
                ];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
    };
    useEffect(() => {
        const album = albums.find((album) => String(album.id) === albumId);
        if (!albumId || !album) {
            alert("정상적인 경로로 진입해주세요!");
            return navigate("/");
        } else if (album.password && !state.isCheck) {
            let isWrong = true;
            do {
                isWrong = prompt("비밀번호 입력", "") !== album.password;
            } while (
                isWrong &&
                window.confirm("비밀번호가 틀렸습니다. 다시 시도하겠습니까?")
            );

            if (isWrong) {
                return navigate(-1);
            }
        }
        setPhotoList({
            left: album.photos.filter((photo, index) => index % 2 === 0),
            right: album.photos.filter((photo, index) => index % 2 !== 0),
        });
    }, [albumId, navigate, state, albums]);
    return (
        <>
            <Wrapper>
                <PhotoForm albumId={albumId || ""} />
                <DragDropContext onDragEnd={onDragEnd}>
                    <AnimatePresence>
                        {Object.keys(photoList).map((boardId) => (
                            <Board
                                boardId={boardId}
                                key={boardId}
                                photos={photoList[boardId]}
                            />
                        ))}
                    </AnimatePresence>
                </DragDropContext>
            </Wrapper>
            <AnimatePresence>
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
    );
}

export default Detail;
