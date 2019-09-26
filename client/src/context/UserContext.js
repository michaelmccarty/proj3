import React from "react";

const UserContext = React.createContext();

export const { Provider: UserProvider, Consumer: UserConsumer } = UserContext;
export default UserContext;