import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { api } from "../api/index";
import { User } from "../types/User";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { Course } from "../types/Course";

interface IAuthContext {
  user: User;
  setUser: (user: User) => void;
  signOut: () => void;
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (course: Course) => void;
}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();

    if (token) {
      api
        .get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
          destroyCookie(null, "token");
        });
    }
  }, []);

  const signOut = () => {
    destroyCookie(null, "token");
    setUser({} as User);
    router.push("/");
  };

  const addToCart = (course: Course) => {
    const courseExists = cartItems.find((item) => item.id === course.id);
    if (courseExists) return;
    setCartItems([...cartItems, course]);
  };

  const removeFromCart = (course: Course) => {
    setCartItems(cartItems.filter((item) => item.id !== course.id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        cartItems,
        setUser,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
