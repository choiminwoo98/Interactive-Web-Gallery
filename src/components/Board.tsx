import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IPhoto } from "../types";
import DraggableCard from "./DraggableCard";

const Col = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
`;

interface IParams {
    boardId: string;
    photos: IPhoto[];
}

function Board({ boardId, photos }: IParams) {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Col ref={magic.innerRef} {...magic.droppableProps}>
                    {photos.map((photo, index) => (
                        <DraggableCard
                            key={photo.id}
                            index={index}
                            photoId={photo.id}
                            imagePath={photo.url}
                        ></DraggableCard>
                    ))}
                    {magic.placeholder}
                </Col>
            )}
        </Droppable>
    );
}

export default Board;
