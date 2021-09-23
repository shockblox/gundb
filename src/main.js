import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Gun from 'gun/gun';
import 'gun/sea';

let app = createApp(App)
  .use(store)
  .use(router);

// Set gun as a global
const gun = Gun(['https://shockblox-gun-server.herokuapp.com/gun']);
app.config.globalProperties.$gun = gun;

// Middleware to check auth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.pubKey) {
      next({
        path: '/login',
        query: {
          redirect: encodeURIComponent(to.fullPath),
          notAuthorized: 'true',
        },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

// Mount the app
app.mount('#app');
