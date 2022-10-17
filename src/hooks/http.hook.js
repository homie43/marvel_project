import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true); // отрисовываем загрузку

        // далее отрправка fetch на сервер
        try {
            const response = await fetch(url, {method, body, headers}); // ждем ответ-промис, приходит url и объект с остальными аргументами

            // проверка овтета
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status}`)
            }

            // в data помещаем тот самый ответ  
            const data = await response.json();

            setLoading(false); // убираем загрузку, тк данные получили
            // функция request возвращает данные, которые были получены
            return data;

        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;

        }

    }, []);
    // чистка ошибки, уберет ошибку и загрузит персонажа
    const clearError = useCallback(() => setError(null), []);

    return {
        loading, 
        error, 
        request, 
        clearError
    }
}

export default useHttp;