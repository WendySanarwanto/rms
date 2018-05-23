const ADMIN_TAB_CLASS = "admin-tab";
const ADMIN_TABS_CHANGED_EVENT = "adminTabs:changed";

(($, window, document) => {

  $(document).ready(() => {
    // console.log(`[DEBUG] - <admin.header> On Ready is called.`);
    // Register onclick event on each admin tabs
    $(`.${ADMIN_TAB_CLASS}`).click((e) => {
      onAdminTabClicked(e.target);
    });
  });

  /**
   * Handle Tab buttons clicked event.
   * @param {*} adminTab Clicked tab button element.
   */
  function onAdminTabClicked(adminTab) {  
    // Select all admin tabs element, and remove 'active' style from them
    $(`.${ADMIN_TAB_CLASS}`).removeClass(`active`);

    // Select the clicked tab as the active tab
    if (adminTab) {
      const tabId = adminTab.id;
      $(`#${tabId}`).addClass(`active`);

      // Raise a jquery event so that other component could listen on this event and act properly against it.
      $(document).trigger(ADMIN_TABS_CHANGED_EVENT, [ tabId ]);
    }
  }

})(window.jQuery, window, document);
