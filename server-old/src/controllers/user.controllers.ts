import { authenticate } from 'ldap-authentication'

export const AuthService = async (username: string, password: string) => {
    const getUser = (username: string, password: string) => {

        const options = {
            ldapOpts: {
                url: process.env.LDAP_ENDPOINT || ""
            },
            adminDn: process.env.LDAP_ADMIN_DN,
            adminPassword: process.env.LDAP_ADMIN_PASSWORD,
            userSearchBase: process.env.LDAP_USER_SEARCH_BASE,
            usernameAttribute: process.env.LDAP_USERNAME_ATTRIBUTE,
            username: username,
            userPassword: password,
        }
    
        return options
    };

    return (authenticate(getUser(username, password)))
        .then((result) => {
            return result 
        })
        .catch((error) => {
            // console.log(error.mensage) verify error 
            return false
        })
}