import Vue from 'vue'

export default class UserService {

    constructor() {
    }

    login(params) {
        this.setUserCookie(params.getData());
    }

    setUserCookie(data) {
        const cookieService = this._getCookieService();
        let expiringDate = cookieService.getExpirationDate(data.expires_in);
        let cuser = {
          user: data.user,
          token: data.token,
          expiringDate: expiringDate
        };
        cookieService.setCookie("user", cuser, data.expires_in);
    }

    restrictDashboard(to, from, next) {
        const app = Vue.prototype.$uncle.getApp();
        const cookieService = app.serviceManager.getCookie();
        const user = cookieService.getCookie("user");
        if (user) {
            next();
        } else {
            next('/login');
        }
    }

    logout() {
        this._getCookieService().erase("user");
    }
    
    _getCookieService(){
        const app = Vue.prototype.$uncle.getApp();
        return app.serviceManager.getCookie();
    }


}