import {
  ClearOutlined,
  FundProjectionScreenOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAPI } from "../../../apis/AdminAPI";
import { AdminMenus } from "../../../shared/AdminMenus";
import "./ProjectAddEdit.css";

export default function ProjectAddEdit() {
  /** variables creation */
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [applyingEntity, setApplyingEntity] = useState([]);
  const [applicantCommunity, setApplicantCommunity] = useState([]);
  const [completionStatus, setCompletionStatus] = useState([]);

  const [messageAPI, messageContext] = message.useMessage();

  // for dates
  const [applicationDate, setApplicationDate] = useState(new Date());
  const [desiredDate, setDesiredDate] = useState();
  const [estimatedEndOfProject, setEstimatedEndOfProject] = useState();
  const [projectCompletionDate, setProjectCompletionDate] = useState();

  // state for collecting selected project
  const [selectedProject, setSelectedProject] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  /** form object */
  const [form] = Form.useForm();

  /** functionality to handle at page loads */
  useEffect(() => {
    getProjectTypes();
    getProjectStatus();
    getApplyingEntity();
    getApplicantCommunity();
    getCompletionStatus();
    // get project to statemaintain in edit mode
    checkEditModeAndGetDetails();
  }, [+id]);

  /** Getting Project Types */
  const getProjectTypes = () => {
    AdminAPI.getAdminLookup(AdminMenus.ProjectTypes)
      .then((res) => {
        setProjectTypes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Project Status */
  const getProjectStatus = () => {
    AdminAPI.getAdminLookup(AdminMenus.ProjectStatus)
      .then((res) => {
        setProjectStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Applying Entity */
  const getApplyingEntity = () => {
    AdminAPI.getAdminLookup(AdminMenus.ApplyingEntity)
      .then((res) => {
        setApplyingEntity(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Applying Entity */
  const getApplicantCommunity = () => {
    AdminAPI.getAdminLookup(AdminMenus.ApplicantCommunity)
      .then((res) => {
        setApplicantCommunity(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Applying Entity */
  const getCompletionStatus = () => {
    AdminAPI.getAdminLookup(AdminMenus.CompletionStatus)
      .then((res) => {
        setCompletionStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // check edit mode and get project details to statemaintain
  const checkEditModeAndGetDetails = () => {
    if (+id > 0) {
      AdminAPI.getProject(id)
        .then((res) => {
          // assigning selected project to state for further usage
          setSelectedProject(res);
          // statemaintaing details
          const projectDetails = {
            projectTitle: res.projectTitle,
            projectTypeId: res.projectTypeId,
            projectStatusId: res.projectStatusId,
            applyingEntityId: res.applyingEntityId,
            applicantName: res.applicantName,
            applicantCommunityId: res.applicantCommunityId,
            applicantInstitution: res.applicantInstitution,
            applicantEmailId: res.applicantEmailId,
            totalProjectCost: res.totalProjectCost,
            localContribution: res.localContribution,
            amountToBeAppliedForAgencies: res.amountToBeAppliedForAgencies,
            completionStatusId: res.completionStatusId,
            remarks: res.remarks,
            // assignig all date values fields
            applicationDate: getDate(res.applicationDate),
            desiredDate: getDate(res.desiredDate),
            estimatedEndOfProject: getDate(res.estimatedEndOfProject),
            projectCompletionDate: getDate(res.projectCompletionDate),
          };
          // assiging values to form for statemaintaing
          form.setFieldsValue(projectDetails);
          // as with the current date pickers we need to assigning then the state
          setApplicationDate(projectDetails.applicationDate);
          setDesiredDate(projectDetails.desiredDate);
          setEstimatedEndOfProject(projectDetails.estimatedEndOfProject);
          setProjectCompletionDate(projectDetails.projectCompletionDate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // function to get date from string - dd/mm/yyyy
  const getDate = (date) => {
    if (date && date !== undefined && date != null) {
      const dateVal = moment(date, "DD/MM/YYYY");
      return dateVal._d;
    }
    return undefined;
  };

  /** save click function */
  const onSubmit = (formValues) => {
    const projectDetails = formValues;
    //const appDate = formValues.applicationDate.format("DD/MM/YYYY");
    console.log(formValues);

    projectDetails.projectType = null;
    projectDetails.projectStatus = null;
    projectDetails.applyingEntity = null;
    projectDetails.applicantCommunity = null;
    projectDetails.completionStatus = null;
    projectDetails.projectNumber = "";

    //formatting data as per database table
    if (formValues.applicationDate)
      projectDetails.applicationDate = new Date(
        formValues.applicationDate
      ).toLocaleDateString();

    if (formValues.desiredDate)
      projectDetails.desiredDate = new Date(
        formValues.desiredDate
      ).toLocaleDateString();

    if (formValues.estimatedEndOfProject)
      projectDetails.estimatedEndOfProject = new Date(
        formValues.estimatedEndOfProject
      ).toLocaleDateString();

    if (formValues.projectCompletionDate)
      projectDetails.projectCompletionDate = new Date(
        formValues.projectCompletionDate
      ).toLocaleDateString();

    // based on the selected project details, we are
    if (selectedProject && selectedProject.projectId > 0) {
      projectDetails.projectId = selectedProject.projectId;
      projectDetails.projectNumber = selectedProject.projectNumber;
      updateProject(projectDetails);
    } else {
      saveProject(projectDetails);
    }
  };

  /** when form failed to get mandatory values */
  const onSubmitFailed = (errorInfo) => {
    messageAPI.error("Fill madatory fields");
  };

  // function to save project details
  const saveProject = (project) => {
    AdminAPI.saveProject(project)
      .then((res) => {
        messageAPI.success("Project Saved Successfully");
        navigate("/mainHome/proj");
      })
      .catch((err) => {});
  };

  // function to update project details
  const updateProject = (project) => {
    AdminAPI.updateProject(project)
      .then((res) => {
        messageAPI.success("Project Updaed Successfully");
        navigate("/mainHome/proj");
      })
      .catch((err) => {});
  };

  return (
    <div className="projectsAddEdit mainWindow">
      {messageContext}
      <div className="windowBreadCrumb">
        <Breadcrumb>
          <Breadcrumb.Item
            className="breadCrumbItem"
            onClick={() => {
              navigate("/mainHome/proj");
            }}
          >
            <FundProjectionScreenOutlined /> Projects
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id > 0 ? "Edit" : "Add"} Project</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mainWindowHeading">
        <div className="space-up-down">
          <h3>
            {selectedProject && selectedProject.projectNumber
              ? `Edit Project - ${selectedProject.projectNumber}`
              : `Add Project`}
          </h3>
        </div>
      </div>
      <div className="projectForm">
        <Form
          name="projectsAddEdit"
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onFinishFailed={onSubmitFailed}
        >
          <legend>Project Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <div>
                <Form.Item
                  label="Project Title"
                  name="projectTitle"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Project Title",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  shouldUpdate
                  label="Application Date"
                  name="applicationDate"
                  valuePropName="applicationDate"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Application Date",
                    },
                  ]}
                >
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className="datePicker"
                    selected={applicationDate}
                    onChange={(date) => setApplicationDate(date)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Desired Date" name="desiredDate">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className="datePicker"
                    selected={desiredDate}
                    onChange={(date) => setDesiredDate(date)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Estimated End of Project"
                  name="estimatedEndOfProject"
                >
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className="datePicker"
                    selected={estimatedEndOfProject}
                    onChange={(date) => setEstimatedEndOfProject(date)}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Project Type"
                  name="projectTypeId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Project Type",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "projectTypeName",
                      value: "projectTypeId",
                    }}
                    //   onChange={handleChange}
                    options={projectTypes}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Project Status"
                  name="projectStatusId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Project Status",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "projectStatusName",
                      value: "projectStatusId",
                    }}
                    //   onChange={handleChange}
                    options={projectStatus}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applying Entity"
                  name="applyingEntityId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Applying Entity",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "applyingEntityName",
                      value: "applyingEntityId",
                    }}
                    //   onChange={handleChange}
                    options={applyingEntity}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Applicant Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <div>
                <Form.Item
                  label="Applicant Name"
                  name="applicantName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Applicant Name",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applicant Community"
                  name="applicantCommunityId"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Applicant Community",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "applicantCommunityName",
                      value: "applicantCommunityId",
                    }}
                    //   onChange={handleChange}
                    options={applicantCommunity}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applicant Institution"
                  name="applicantInstitution"
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applicant Email-Id"
                  name="applicantEmailId"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Applicant Email Id",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Financial Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Total Project Cost"
                  name="totalProjectCost"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Project Total Cost",
                    },
                  ]}
                >
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Local Contribution" name="localContribution">
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Amount to be Applied for Agencies"
                  name="amountToBeAppliedForAgencies"
                >
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Project Status</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Project Completion Date"
                  name="projectCompletionDate"
                >
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className="datePicker"
                    selected={projectCompletionDate}
                    onChange={(date) => setProjectCompletionDate(date)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Completion Status" name="completionStatusId">
                  <Select
                    fieldNames={{
                      label: "completionStatusName",
                      value: "completionStatusId",
                    }}
                    //   onChange={handleChange}
                    options={completionStatus}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Remarks" name="remarks">
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <legend>Upload Documents</legend>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <Upload name="logo" multiple="true">
                  <Button size="large" icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item style={{ textAlign: "center" }}>
                <Space>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  >
                    {id > 0 ? "Update" : "Save"}
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      form.resetFields();
                    }}
                    size="large"
                    icon={<ClearOutlined />}
                  >
                    Clear
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
