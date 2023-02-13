export const AdminMenus = {
  ApplicantCommunity: 1,
  ApplyingEntity: 2,
  CompletionStatus: 3,
  ProjectStatus: 4,
  ProjectTypes: 5,
  Agencies: 6,
};

const AdminTableDetails = {
  getColumn: (id) => {
    let columnObj;
    switch (+id) {
      case AdminMenus.ProjectTypes:
        columnObj = {
          title: "Project Type",
          refString: "projectType",
        };
        break;
      case AdminMenus.ProjectStatus:
        columnObj = {
          title: "Project Status",
          refString: "projectStatus",
        };
        break;
      case AdminMenus.CompletionStatus:
        columnObj = {
          title: "Completion Status",
          refString: "completionStatus",
        };
        break;
      case AdminMenus.ApplicantCommunity:
        columnObj = {
          title: "Applicant Community",
          refString: "applicantCommunity",
        };
        break;
      case AdminMenus.ApplyingEntity:
        columnObj = {
          title: "Applying Entity",
          refString: "applyingEntity",
        };
        break;
        case AdminMenus.Agencies:
          columnObj = {
            title: "Agency",
            refString: "agency",
          };
          break;
      default:
        break;
    }

    return columnObj;
  },
};

export default AdminTableDetails;
