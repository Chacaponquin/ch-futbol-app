import { notification } from "antd";

export const showError = (error) => {
    notification.open({
        type: "error",
        message: "Hubo un error",
        description: error.message,
        duration: 7,
    });
};