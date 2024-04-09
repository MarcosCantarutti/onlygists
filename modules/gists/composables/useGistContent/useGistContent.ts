import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist';
import { useLogger } from '@/composables/userLogger/useLogger';

interface UseGistContentOptions {
    gist: Ref<GistVirtual | undefined>
}

export function useGistContent ({ gist }:UseGistContentOptions){
    const { logAndTrack } = useLogger()
    const services = useServices()
    const loading = ref<boolean>(false)
    const gistId = ref<string>()
    const isPaid = ref<boolean>()
    const gistContent = ref<string>()

    const fetchGistById = async () => {
        if(!gistId.value){
            return
        }

        if(isPaid.value){
            return
        }

        loading.value = true
        try {
            const response = await services.gists.readOneContent(gistId.value)
            if (response) {
              gistContent.value = response.content
            }
        } catch (e) {
         logAndTrack(e)   
        }finally{
            loading.value = false
        }
    }

    watchEffect(() => {
        if(!gist.value){
            return
        }

        gistId.value = gist.value.id
        isPaid.value = gist.value.isPaid
    })

    onMounted(() => {
        fetchGistById()
    })

    return {
        loading,
        gistId,
        gistContent
    }
}