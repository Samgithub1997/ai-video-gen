"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type ProviderProps = {
  children: ReactNode;
};

function Provider({ children }: ProviderProps) {
  const [user, setUser] = React.useState(null);
  const createUser = useMutation(api.users.createNewUser);

  useEffect(() => {
    const isUserLogedIn = onAuthStateChanged(auth, async (user: any) => {
      if (!user) return;
      console.log(user);
      // Setting user variable from firebase
      setUser(user);

      // Insert user to the convex database
      const userRecord = await createUser({
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      });
      // Setting user variable from convex database
      setUser(userRecord);
    });
    return () => isUserLogedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user } as any}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
