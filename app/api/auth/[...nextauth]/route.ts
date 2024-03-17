import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getErrorUrl, getLinkUserImage, randomString } from "@/lib/functions";
import { prisma } from "@/lib/database";
import { MD5 } from "crypto-js";
import { User } from "@/lib/schemas";

export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      CredentialProvider({
         name: "Credentials",
         credentials: {
            username: {
               label: "Username",
               type: "text",
               placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            const { username, password } = credentials as {
               username: string;
               password: string;
            };
            const user = await prisma.user.findFirst({
               where: {
                  username,
                  password: MD5(password).toString(),
                  provider: "credentials",
               },
            });
            if (!user) {
               return null;
            }
            return {
               name: user.name,
               email: user.email,
               image: getLinkUserImage(user.img_id),
               id: user.id + "",
            };
         },
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
   ],

   jwt: {
      maxAge: 24 * 60 * 60, // 24 hours
   },

   session: {
      strategy: "jwt",
   },

   callbacks: {
      async session({ session, token, user }) {
         if (!session.user || !session.user.email) {
            return session;
         }
         await prisma.user.update({
            where: {
               email: session.user.email,
            },
            data: {
               lastTimeOnline: new Date(),
            },
         });
         session.user.name = session.user?.name!.split(" ")[0];
         return session;
      },
      async signIn(params) {
         if (params.account?.provider == "google") {
            const response = (await prisma.user.findFirst({
               where: {
                  email: params.user.email!,
                  provider: "credentials",
               },
            })) != null;
            if (response) {
               return getErrorUrl("EmailExists");
               return "/error?error=EmailExists";
            } else {
               //controllo se è gia registrato
               const check = (await prisma.user.findFirst({
                  where: {
                     idGoogle: params.user.id,
                  },
               })) == null;
               console.log("Risposta dopo check id", check);
               if (!check) {
                  const persona = {
                     username: randomString(10),
                     name: params.user.name!.split(" ")[0],
                     surname: params.user.name!.split(" ")[1],
                     email: params.user.email!,
                     img_id: params.user.image!,
                     idGoogle: params.user.id,
                  };
                  const good = User.safeParse(persona);
                  if (!good.success) {
                     return getErrorUrl("RegisterError");
                     return "/error?error=RegisterError";
                  }
                  try {
                     const token = randomString(64);
                     await prisma.user.create({
                        data: {
                           ...good.data,
                           lastTimeOnline: new Date(),
                           verified: false,
                           verification_info: {
                              create: {
                                 token,
                              }
                           },
                           user_preferences: {
                              create: {
                                 wantOthersSeeCity: true,
                                 wantOthersSeeLastLogin: true,
                                 wantOthersSeeLastMessageDate: true,
                              }
                           }
                        }
                     })
                     const res = await fetch(process.env.BACKEND_URL + "/sendmail", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                           to: good.data.email,
                           subject: "Verifica del profilo",
                           html: `<div><h1>Benvenuto su BookMarkeplace!</h1><p><b>${good.data.username}</b>,${" "}per completare la registrazione clicca sul seguente link:</p><a target="_blank" href="https://www.bookmarketplace.it/api/verify?token=${token}">https://www.bookmarketplace.it/api/verify?token=${token}</a></div>`,
                           auth: "abc"
                        })
                     });
                     return true;
                  } catch (error) {
                     return getErrorUrl("RegisterError");
                  }
               } else {
                  return true;
               }
            }
         }
         return true;
      },
   },

   pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/error",
      verifyRequest: "/auth/verify-request",
      newUser: "/register",
   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
