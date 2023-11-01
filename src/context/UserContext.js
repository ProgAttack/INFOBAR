import React, { createContext, useReducer } from 'react';


const initialState = {}
const UserContext = createContext({})

/*const actions = {
    createUser(state, action){
        const newUser = action.payload
        newUser.id = Math.random()
        return{
            ...state,
            users: [...state.users, newUser]
        }
    },

    updateUser(state, action){
        const userUpdated = action.payload
        return{
            ...state,
            users: state.users.map(u => u.id === userUpdated.id ? userUpdated: u )
        }
    },
    
    deleteUser(state, action){
        const  userReceive = action.payload
        return {
            ...state,
            users: state.users.filter(u => u.id !== userReceive.id)
        }
    }
}*/

const actions={
    selectUser(state,action){
        const userReceveid = action.payload
        return{
            ...state,
            users: userReceveid
        }
    },

    loginUser(state, action){
        const userLoged = action.payload
        return{
            ...state,
            users: userLoged
        }
    }
}

export const UserProvider = props => {
    function reducer(state, action){
        const fn = actions[action.type]

        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext