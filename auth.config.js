/** @type {import("next-auth").NextAuthConfig} */
export const authConfig = {
  pages: {
    signIn: "/admin/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnAdminApi = nextUrl.pathname.startsWith("/api/admin");

      if (isOnAdmin || isOnAdminApi) {
        if (isLoggedIn) return true;
        return false;
      }

      return true;
    }
  },
  providers: []
};
