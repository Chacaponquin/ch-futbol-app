import { notification } from "antd";

export const showError = (error) => {
    notification.open({
        type: "error",
        message: "Hubo un error",
        description: error.message,
        duration: 7,
    });
};

export const showSucces = (message) => {
    notification.success({
        type: "success",
        message: message.header,
        description: message.description,
        duration: 7,
    });
};