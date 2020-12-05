


export function createEmail(email: string, email_from: string, url: string) {
    return {
        from: email_from,
        to: email,
        subject: 'Аккаунт создан',
        html: `
      <h1>Добро пожаловать</h1>
      <p>Вы успешно создали аккаунт - ${email}</p>
      <hr/>
      <a href="${url}">Перейдите по ссылке, чтобы подтвердить аккаунт</a>
    `
    }
}