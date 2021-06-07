import type { Response } from 'express'
import jwtDecode from 'jwt-decode'

const AUDIT_VIEWER_ROLE = 'ROLE_AUDIT_VIEWER'

const extractRoles = (res: Response): Array<string> => {
  const token = res?.locals?.user?.token
  const decodedToken = token && (jwtDecode(res.locals.user.token) as { authorities?: string[] })
  return (decodedToken && decodedToken.authorities) || []
}

export { AUDIT_VIEWER_ROLE, extractRoles }
