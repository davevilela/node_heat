/**
 * Receber code(string)
 * Recuperar o access_token do github
 * Verificar se o usuário existe no DB
 * ---- SIM = Gera um token
 * ---- Não = Cria no DB, gera um token
 * Retornar o token com as infos do user
 */

import { prisma, User } from ".prisma/client";
import axios from "axios";
import signale from "signale";
import { prismaClient } from "../lib/prisma";
import { sign } from "jsonwebtoken";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../constants";

interface IAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface IUserResponse {
  avatar_url: string;
  name: string;
  login: string;
  id: number;
}

class AuthenticateUserService {
  async execute(code: string): Promise<{ token: string; user: User }> {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse, status } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    signale.debug("access token response:", accessTokenResponse, status);

    const { data: userDataResponse } = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    signale.success("user data:", userDataResponse);

    const { avatar_url, id, login, name } = userDataResponse;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: { github_id: id, avatar_url, login, name },
      });
    }

    const secret = `${process.env.JWT_SECRET}`;

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
        },
      },
      secret,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
