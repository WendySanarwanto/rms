const USER_ACCOUNT_ADMIN_TAB_ID = "admin-user-account-tab";
const SE_ADMIN_TAB_ID = "admin-se-tab";
const PROJECT_MANAGERS_ADMIN_TAB_ID = "admin-pm-tab";
const PROJECTS_ADMIN_TAB_ID = "admin-projects-tab";

const ADMIN_TAB_CLASS = "admin-tab";

$(document).ready(() => {
  // console.log(`[DEBUG] - <admin.header> On Ready is called.`);
  // Register onclick event on each admin tabs
  $(`.${ADMIN_TAB_CLASS}`).click((e) => {
    onAdminTabClicked(e.target);
  });
});

function onAdminTabClicked(adminTab) {  
  // Select all admin tabs element, and remove 'active' style from them
  $(`.${ADMIN_TAB_CLASS}`).removeClass(`active`);

  // Select the clicked tab as the active tab
  if (adminTab) {
    const tabId = adminTab.id;
    $(`#${tabId}`).addClass(`active`);

    // Raise a jquery event so that other component could listen on this event and act properly against it.
    $(document).trigger("adminTabs:changed", [ tabId ]);
  }
}  
