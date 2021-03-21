

import user from './user';
import permission from './permission';
import role from './role';

export default app => {
  app.use('/api/user',  user);
  app.use('/api/permission', permission);
  app.use('/api/role', role);
}
