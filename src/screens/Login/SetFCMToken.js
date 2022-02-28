import Storage from "@/utils/Storage";
import uuid from 'react-native-uuid';

export const FCMToken = async () => {
    let token = await Storage.get('FCMToken');
    if (token) return token
    else {
        let newToken = uuid.v4(Date.now().toString());
        await Storage.save('FCMToken', newToken);
        return newToken
    }
}
