import styled from "styled-components";

export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 5px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    height: 37px;
    line-height: 37px;
    vertical-align: top;
    font-size: 12px;
    background-color: ${(props) => props.theme.yellow};
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 15px;
`;

export const TimeLine = styled.div`
    flex: 1;
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    vertical-align: top;
`;

export const ErrorMessage = styled.span`
    color: red;
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

export const InputColumn = styled.div<{ messageWidth?: string }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
    input {
        width: 100%;
        padding: 12px 8px;
        border: none;
        border-bottom: 3px solid ${(props) => props.theme.gray.normal};
        background: none;
        border-radius: 2px;
        &::placeholder {
            color: ${(props) => props.theme.gray.very};
        }
    }

    textarea {
        width: 100%;
        height: 100px;
        border: 1px solid silver;
        border-radius: 4px;
    }

    span {
        width: ${(props) => (props.messageWidth ? props.messageWidth : "auto")};
        display: flex;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }
`;
