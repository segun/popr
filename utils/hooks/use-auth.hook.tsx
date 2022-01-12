import React from "react";
import PropTypes from "prop-types";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = (props) => {
    const {auth} = props;
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return React.useContext(AuthContext);
}

AuthProvider.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node
}