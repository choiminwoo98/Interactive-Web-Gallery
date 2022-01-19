import { motion } from "framer-motion";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
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
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 15px;
`;

const OverLay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
`;

interface IParams {
    index: number;
    photoId: number;
    imagePath: string;
}

function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    // move to the right spot
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

    // patching the existing style
    return {
        ...style,
        transform: `${translate}`,
        // slowing down the drop because we can
        transition: `all ${curve} ${duration + 0.1}s`,
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
                    <Card
                        onClick={() => onCardClick(photoId)}
                        imagePath={imagePath}
                    >
                        <OverLay layoutId={photoId + ""} />
                    </Card>
                </CardWrapper>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
