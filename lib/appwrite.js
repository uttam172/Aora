import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66b9f3cd0009ac20e449',
    databaseId: '66b9f578002eddf27855',
    userCollectionId: '66b9f59c002edd27ecd3',
    videosCollectionId: '66b9f5c80027d6067ccd',
    storageId: '66b9f6f6002539ef8a35',
}

// Init React Native SDK
const client = new Client()
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

//Create User
const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}