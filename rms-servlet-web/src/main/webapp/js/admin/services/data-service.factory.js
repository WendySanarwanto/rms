class DataServiceFactory {
  static create(type) {
    switch(type) {
      case ADMIN_USER_ACCOUNT_TAB_ID: 
        return new UserAccountDataService();
      case ADMIN_PM_TAB_ID:
        return new ProjectManagerDataService();
      case ADMIN_PROJECTS_TAB_ID:
        return new ProjectsDataService();
      case ADMIN_SE_TAB_ID:
        return new SoftwareEngineersDataService();
      default:
        return null;
    }
  }
}