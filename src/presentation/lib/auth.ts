
interface UserJwtPayload {
  jit: string;
  id: string;
  iat: number;
}

export const getJwtSecretKey = () => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("A variável NEXT_PUBLIC_JWT_SECRET esta vazia");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = token || null
    return verified
  } catch (err) {
    throw new Error("Seu token expirou");
  }
};
