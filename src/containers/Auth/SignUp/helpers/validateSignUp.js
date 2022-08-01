export const validateSignUp = ({ password, comfirmPassword, image }) => {
  if (password !== comfirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  if (image === null) {
    throw new Error("Debe elegir un avatar");
  }
};
