import jwt from "jsonwebtoken";

export const autenticarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Pega o token no cabeçalho Authorization

  console.log("Token recebido:", token); // Log do token recebido

  if (!token) {
    return res
      .status(401)
      .json({ mensagem: "Acesso negado. Token não fornecido. " });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verifica a token
     console.log("Payload do token:", payload);
    req.usuario = payload; // Adiciona o payload decodificado na requisição
    next(); // Continua para a próxima função no middleware
  } catch (error) {
    return res.status(403).json({ mensagem: "Token inválido ou expirado." });
  }
};
