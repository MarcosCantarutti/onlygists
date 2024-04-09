import { useClipboard , useShare } from '@vueuse/core'

export function useUserProfileActions(){
    
    const toast = useToast(); // ja vem no prime vue!
    const { share: nativeShare, isSupported } = useShare()
    const { copy } = useClipboard()

    const share = async (username: string) => {
        const url = `${window.location.origin}/${username}`

        if(!isSupported.value){
            await copy(url)


            toast.add({
                severity: 'info',
                summary: 'Sucesso!',
                detail: 'Link do perfil copiado!',
                life: 2000,
            })

            return
        }

        nativeShare({
            title: 'Perfil do onlygists',
            text: `Veja esse perfio do @${username}`,
            url: url,
        })
    }
    
    return {
        share
    }
}