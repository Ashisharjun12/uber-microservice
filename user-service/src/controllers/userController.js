

export const RegisterUser = async (req, res) => {
res.status(200).json({message: "User registered successfully"});
};


export const LoginUser = async (req, res) => {
  res.status(200).json({ message: "User logged in successfully" });
};
