import { motion } from "framer-motion";
import React from "react";
import { Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 5px 5px;
    margin-top: 10px;
`;

const Card = styled(motion.div)<{ imagePath: string }>`
    width: 100%;
    height: 100%;
    background-image: ${(props) => "url(" + props.imagePath + ")"};
    background-position: center center;
    background-size: cover;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 15px;
`;

interface IParams {
    index: number;
    photoId: number;
    imagePath: string;
}

function getStyle(style: any, snapshot: DraggableStateSnapshot) {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    return {
        ...style,
        transitionDuration: `0.001s`,
    };
}

function DraggableCard({ index, photoId, imagePath }: IParams) {
    const navigate = useNavigate();
    const location = useLocation();
    const onCardClick = (photoId: number) => {
        navigate(`${location.pathname}/${[photoId]}`, { replace: true });
    };
    return (
        <Draggable draggableId={photoId + ""} index={index}>
            {(magic, snapshot) => (
                <CardWrapper
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                    style={getStyle(magic.draggableProps.style, snapshot)}
                >
                    {snapshot.isDragging ? (
                        <Card
                            onClick={() => onCardClick(photoId)}
                            imagePath={imagePath}
                        />
                    ) : (
                        <Card
                            layoutId={photoId + ""}
                            onClick={() => onCardClick(photoId)}
                            imagePath={imagePath}
                        />
                    )}
                </CardWrapper>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
