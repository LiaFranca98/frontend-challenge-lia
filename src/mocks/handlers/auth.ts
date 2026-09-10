import { http, HttpResponse } from 'msw';
import { db, saveDb } from '../db';
import type { User } from '@/domain/types';

// Helper to check authentication
export const getUserFromAuth = (request: Request): User | null => {
  const authHeader = request.headers.get('Authorization');
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    const cookieHeader = request.headers.get('Cookie');
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => c.trim().split('='))
      );
      token = cookies['auth-token'];
    }
  }
  if (!token) return null;

  const userId = db.sessions.get(token);
  if (!userId) return null;

  return db.users.find(u => u.id === userId) || null;
};

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email } = await request.json() as any;
    
    // Simple mock: just find user by email or create if admin@test.com
    let user = db.users.find(u => u.email === email);
    
    // For demo purposes, if they login with demo@example.com and it doesn't exist, create it
    if (!user) {
      if (email === 'demo@example.com') {
        user = {
          id: 'user-demo',
          name: 'Demo User',
          email: 'demo@example.com',
          wallets: [{ address: '0x123...abc', balance: '10.5 ETH' }]
        };
        db.users.push(user);
        saveDb();
      } else {
        return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }
    }

    const token = `token-${user.id}-${Date.now()}`;
    db.sessions.set(token, user.id);
    saveDb();

    return HttpResponse.json({ user, token }, {
      headers: {
        'Set-Cookie': `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax`,
      }
    });
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const { name, email } = await request.json() as any;
    
    if (db.users.find(u => u.email === email)) {
      return HttpResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      wallets: []
    };
    db.users.push(newUser);
    saveDb();

    const token = `token-${newUser.id}-${Date.now()}`;
    db.sessions.set(token, newUser.id);
    saveDb();

    return HttpResponse.json({ user: newUser, token }, {
      headers: {
        'Set-Cookie': `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax`,
      }
    });
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ success: true }, {
      headers: {
        'Set-Cookie': `auth-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
      }
    });
  }),

  http.get('/api/profile', ({ request }) => {
    const user = getUserFromAuth(request);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return HttpResponse.json({ user });
  }),

  http.patch('/api/profile', async ({ request }) => {
    const user = getUserFromAuth(request);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const updates = await request.json() as Partial<User>;
    Object.assign(user, updates);
    saveDb();
    
    return HttpResponse.json({ user });
  })
];
