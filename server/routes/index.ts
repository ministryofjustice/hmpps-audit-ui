import type { RequestHandler, Router } from 'express'

import asyncMiddleware from '../middleware/asyncMiddleware'
import { extractRoles, AUDIT_VIEWER_ROLE } from '../authentication/roles'

export default function routes(router: Router): Router {
  const get = (path: string, handler: RequestHandler) => router.get(path, asyncMiddleware(handler))

  get('/', (req, res) => {
    const roles = extractRoles(res)
    res.render('pages/index', {
      audit: [
        {
          id: 'Audit',
          heading: 'Audit',
          description: 'View audit entries',
          href: '/audit',
          roles: [AUDIT_VIEWER_ROLE],
          enabled: true,
        },
      ].filter(
        audit => Boolean(audit.roles === null || audit.roles.find(role => roles.includes(role))) && audit.enabled
      ),
    })
  })

  return router
}
