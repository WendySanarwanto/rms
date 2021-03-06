const ADMIN_MAIN_CONTAINER_ID = "admin-main-container";
const ADMIN_USER_ACCOUNT_TAB_ID = "admin-user-account-tab";
const ADMIN_PM_TAB_ID = "admin-pm-tab";
const ADMIN_PROJECTS_TAB_ID = "admin-projects-tab";
const ADMIN_SE_TAB_ID = "admin-se-tab";
const ADMIN_CONTENT_ID = "admin-content";

const TABLE_LIST_CLASS = "table-list";

(($, window, document) => {
  $(document).ready(() => {
    // Register adminTabs:changed event.
    $(document).on(ADMIN_TABS_CHANGED_EVENT, (e, tabId) => {
      // console.log(`[DEBUG] - <admin.index.adminTabs:changed> e=\n`,e);
      console.log(`[DEBUG] - <admin.index.adminTabs:changed> tabId=\n`, tabId);
      // TODO: Display spinning progress, hide the displayed table list
      // TODO: Make an AJAX call to get a list of records specified by record type
      const dataService = DataServiceFactory.create(tabId);
      const retrievedData = dataService.getAll();
      let dataSet = flattenRetrievedData(retrievedData);

      // Reload the table list with the retrieved records    
      renderTableListInAdminContainer(tabId, dataSet);

      // TODO: Show the hidden table list
    });

    // Toggle user accounts tab at initial load
    $(`#${ADMIN_USER_ACCOUNT_TAB_ID}`).get(0).click();
  });
  
  /**
   * A helper to render table list inside admin main container
   * @param {*} tabId Id of the toggled tab element
   * @param {*} dataSet array of data to render on the table list
   */
  function renderTableListInAdminContainer(tabId, dataSet) {
    const adminMainContainerUrl = getAdminMainContainerUrl(tabId);
    if (adminMainContainerUrl) {

      // Render retrieved records on table list
      // TODO: Add Action column on the table list which has 2 buttons inside : delete, edit.    
      $(`#${ADMIN_MAIN_CONTAINER_ID}`).load(adminMainContainerUrl, () => {
        $(`#${ADMIN_CONTENT_ID}`).load(`views/shared/tableList.html`, () => {
          var tableList =
            $(`.${TABLE_LIST_CLASS}`).DataTable({
              data: dataSet,
              columns: getTableListHeaderNames(tabId),
              processing: true,
              columnDefs: [{
                targets: -1,
                data: null,
                defaultContent: `&nbsp;&nbsp;&nbsp;&nbsp;<button class="ui button basic teal">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="ui button basic red">Delete</button>`
              }]
            });
          
          // TODO: Handle Edit & Delete's on click events using RxJS
          $(`.${TABLE_LIST_CLASS} tbody`).on('click', 'button', (e) => {
            var clickedData = tableList.row($(e.target).parents('tr')).data();
            var clickedButtonName = e.target ? e.target.innerText : null;
            console.log(`[DEBUG] - <admin.index> tabId: ${tabId}`);
            switch (clickedButtonName) {
              case 'Edit':
                // TODO: Show edit modal dialog
                // TODO: Handle on confirm:
                //        - change the edit button's style to progressing
                //        - get proposed value from the modal dialog instance
                //        - call Change Record API
                //        - restore the edit button's progressing style when process is finished
                //        - show error toast when edit process is failing
                break;
              case `Delete`:
                // TODO: Show delete pop up confirmation
                // TODO: handle on confirm: 
                //        - change the delete button's style to progressing
                //        - call Delete Record api
                //        - restore the delete button's progressing style when process is finished.
                //        - show error toast when delete process is failing
                break;
            }
            // console.log(`[DEBUG] - <admin.index> clickedData: \n`, clickedData);
          });

          // Re-styling the Table List's Search input
          const filterElement = $(`.dataTables_filter label`);
          filterElement.addClass("ui input");
          filterElement.contents().filter(function() { return this.nodeType === 3; }).remove();
          $(filterElement).children('input').prop("placeholder", "Search . . . ");
        });
      });
    }
  }

  /**
   * A helper for flatten the JSON Data retrieved from calling the get API.
   * @param {*} retrievedData JSON Data retrieved from calling the get API.
   */
  function flattenRetrievedData(retrievedData) {
    let dataSet = [];
    let propNames = [];
    if (Array.isArray(retrievedData)) {
      if (retrievedData.length > 0) {
        propNames = Object.keys(retrievedData[0]);
        // propNames.splice(0, 1); // Remove id column
      }

      dataSet = retrievedData.map(data => {
        const dataSetItem = [];
        for (const propName of propNames) {
          dataSetItem.push(data[propName]);
        }
        return dataSetItem;
      });
    }

    return dataSet;
  }

  /**
   * A helper for getting a list of table's header names by specified toggled Tab's id.
   * @param {String} tabId Id of the toggled tab element.
   */
  function getTableListHeaderNames(tabId) {
    // TODO: Generate the header names from retrieved data
    switch (tabId) {
      case ADMIN_USER_ACCOUNT_TAB_ID:
        return [{
            title: "ID"
          },
          {
            title: "Full Name"
          },
          {
            title: "Email address"
          },
          {
            title: "Role"
          },
          {
            title: "Actions"
          }
        ];
      case ADMIN_SE_TAB_ID:
        return [{
          title: "Full Name"
        }, {
          title: "Email address"
        }, {
          title: "Actions"
        }];
      case ADMIN_PM_TAB_ID:
        return [{
          title: "Full Name"
        }, {
          title: "Email address"
        }, {
          title: "Actions"
        }];
      case ADMIN_PROJECTS_TAB_ID:
        return [{
          title: "Name"
        }, {
          title: "Description"
        }, {
          title: "Actions"
        }];
      default:
        return null;
    }
  }

  /**
   * A helper for selecting the URL Of Admin Main Container template by specified toggled Tab's id.
   * @param {String} tabId Id of the toggled tab element.
   */
  function getAdminMainContainerUrl(tabId) {
    switch (tabId) {
      case ADMIN_USER_ACCOUNT_TAB_ID:
        return `views/admin/userAccounts/index.html`;
      case ADMIN_SE_TAB_ID:
        return `views/admin/softwareEngineers/index.html`;
      case ADMIN_PM_TAB_ID:
        return `views/admin/projectManagers/index.html`;
      case ADMIN_PROJECTS_TAB_ID:
        return `views/admin/projects/index.html`;
      default:
        return null;
    }
  }

})(window.jQuery, window, document);