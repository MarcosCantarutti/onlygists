import type {User} from '@/modules/users/entities/User/User'
import { useSession } from '@/modules/auth/composables/useSession/useSession'
import { useLogger } from '@/composables/userLogger/useLogger'
import type { MyselfContextProvider } from './types'
import type { InjectionKey } from 'vue'

export const myselfKey = Symbol('myself') as InjectionKey<MyselfContextProvider>

export function useMyself(){

    const { logAndTrack } = useLogger()
    const services = useServices()
    const session = useSession()
    const loading = ref<boolean>(true)
    const user = ref<User>() // reactive

    // provide/inject
    provide<MyselfContextProvider>(myselfKey, {user, loading}) // passe valores ref para ser reativo


    const fetchUser = async () => {
        loading.value = true
    
        try {
          const response = await services.users.getMyself(session.user.value?.id!)
          if (!response) {
            return
          }
    
          user.value = response
        } catch (e) {
          logAndTrack(e)
        } finally {
          loading.value = false
        }
      }
    
      onMounted(() => {
        fetchUser()
      })
    
      return {
        loading,
        user,
      }
}