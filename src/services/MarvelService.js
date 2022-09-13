


class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?apikey=72d543b70c30dd47ad2680e074f996be')
    }
}

export default MarvelService;