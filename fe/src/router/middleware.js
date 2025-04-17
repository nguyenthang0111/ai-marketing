import { register, login } from '@/services/auth.service'
import { getProfile } from '@/services/user.service'
import { getAllWorkspaceOfUser } from '@/services/workspace.service'
import { getWorkspacesByUser } from '@/services/workspace-member.service'
import { useAuthStore } from '@/stores/auth.store'
import { useLoadingStore } from '@/stores/loading.store'
import { useWorkspaceStore } from '@/stores/workspace.store'

const setAccessToken = (accessToken) => {
  localStorage.setItem('ai-marketing-token', accessToken)
}

export const fetchUserData = async () => {
  const authStore = useAuthStore()
  const workspaceStore = useWorkspaceStore()

  try {
    const [authRes, workspaceRes] = await Promise.all([getProfile(), getWorkspacesByUser()])
    if (!authRes.data.avatarUrl) {
      authRes.data.avatarUrl =
        'https://images.aiscribbles.com/thumb/2e53266b9ee742aeaf7aae51d16594bf-md.jpg?v=e70380'
    }
    authStore.updateState(authRes.data)
    workspaceStore.updateState({
      workspaceId: localStorage.getItem('workspaceId') || workspaceRes.data[0].workspaceId,
      name: localStorage.getItem('nameWorkspace') || workspaceRes.data[0].name,
      listWorkspaceOfUser: workspaceRes.data,
      creditCodes: JSON.parse(localStorage.getItem('creditCodes')) || workspaceRes.data[0].creditCodes[0]
    })
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    throw error
  }
}

export async function handleLoginByGoogleProvider(to, from, next) {
  const { googleId, email, firstName, lastName, picture, access_token } = to.query

  if (!access_token && !googleId) {
    return next()
  }

  try {
    if (googleId && email) {
      await register({
        googleId,
        email,
        name: `${firstName} ${lastName}`,
        avatarUrl: picture,
        password: googleId
      })

      await login({ email, password: googleId })
    } else {
      setAccessToken(access_token)
    }

    next({ name: 'Dashboard' })
  } catch (error) {
    console.error('Google login failed:', error)
    next({ name: 'Login' })
  }
}

export async function handleReloadPage(to, from, next) {
  if (from.name === undefined && to.meta.requiresAuth !== false) {
    await fetchUserData()
  }
  next()
}

export async function handleLoading(to, from, next) {
  const loadingStore = useLoadingStore()

  loadingStore.setIsLoading(true)
  next()
}