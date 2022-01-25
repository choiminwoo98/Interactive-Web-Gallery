import { IResMessage } from "./types/response";

export const checkLogin = (data: IResMessage) => {
    return new Promise<IResMessage>((resolve, reject) => {
        try {
            if (data.code.startsWith("301")) {
                return reject(new Error(data.message));
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject(error);
        }
    });
};
