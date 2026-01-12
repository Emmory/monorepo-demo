import type { User } from '@mi-empresa/interfaces'

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  
  const isAuthenticated = computed(() => !!user.value)
  
  const login = (email: string, password: string) => {
    if (email && password) {
      const newUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        createdAt: new Date().toISOString()
      }
      
      user.value = newUser
      
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(newUser))
      }
      
      return true
    }
    return false
  }
  
  const logout = () => {
    user.value = null
    if (process.client) {
      localStorage.removeItem('user')
    }
  }
  
  const checkAuth = () => {
    if (process.client) {
      const userData = localStorage.getItem('user')
      if (userData) {
        user.value = JSON.parse(userData) as User
      }
    }
  }
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}