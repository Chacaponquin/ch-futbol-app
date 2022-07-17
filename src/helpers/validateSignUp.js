export const validateSignUp = ({ password, comfirmPassword, image }) => {
  if (password !== comfirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  if (!/^[a-z]*[-._]?[a-z]*$/.test(password)) {
    throw new Error("Mal patron para la contraseña");
  }
  if (image === null) {
    throw new Error("Debe elegir un avatar");
  }
};
