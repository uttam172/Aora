import { Text, View } from 'react-native'

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {

    return (
        <View className={containerStyles}>
            <Text className={`text-center text-white font-psemibold ${titleStyles}`}>{title}</Text>
            <Text className="text-sm text-gray-100 text-center font-pregular">{subtitle}</Text>
        </View>
    )
}

export default InfoBox