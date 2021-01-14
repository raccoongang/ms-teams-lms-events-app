import { UserAgentApplication } from 'msal';

export class UserAgentApp extends UserAgentApplication {
    logout() {
      var _this = this;
      this.clearCache();
      this.account = null;
      var logout = "";
      if (this.getPostLogoutRedirectUri()) {
          logout = "post_logout_redirect_uri=" + encodeURIComponent(this.getPostLogoutRedirectUri());
      }
      this.authorityInstance.resolveEndpointsAsync().then(function (authority) {
          var urlNavigate = authority.EndSessionEndpoint
              ? authority.EndSessionEndpoint + "?" + logout
              : _this.authority + "oauth2/v2.0/logout?" + logout;
          var logoutWindow = window.open(urlNavigate, "_blank");
          if (logoutWindow === null) {
            alert("Pop-up Blocker is enabled! Please add this site to your exception list.");
          }
          window.location.reload();
      });
  }
};
