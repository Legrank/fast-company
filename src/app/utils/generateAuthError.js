export function genereteAuthError(message) {
    if (message === 'INVALID_PASSWORD' || message === 'EMAIL_NOT_FOUND') {
        return 'Неправильный логин или пароль'
    }
    if (message === 'USER_DISABLED') {
        return 'Профиль заблокирован. Обратитесь в поддержку.'
    }
    if (message === 'EMAIL_EXISTS') {
        return 'Пользователь с таким Email уже существует'
    }
}
