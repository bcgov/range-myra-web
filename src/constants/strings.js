export const APP_NAME = 'MyRangeBC'

// page titles
const createTitle = title => `${title} | ${APP_NAME}`
export const LOGIN_TITLE = createTitle('Sign in')
export const DETAIL_RUP_TITLE = createTitle('View RUP')
export const SELECT_RUP_TITLE = createTitle('Select RUP')
export const MANAGE_CLIENT_TITLE = createTitle('Manage Clients')
export const MANAGE_ZONE_TITLE = createTitle('Manage Zones')
export const PAGE_NOT_FOUND_TITLE = createTitle('Page Not Found')

export const SELECT_RUP = 'Select RUP'
export const MANAGE_ZONES = 'Manage Zones'
export const MANAGE_CLIENTS = 'Manage Clients'

// Agreement Table
export const RANGE_NUMBER = 'RAN'
export const RANGE_NAME = 'Range Name'
export const AGREEMENT_HOLDER = 'Primary Agreement Holder'
export const STATUS = 'Status'
export const STAFF_CONTACT = 'Staff Contact'
export const EFFECTIVE_DATE = 'Effective Date'
export const SUBMITTED = 'Submitted'
export const AGREEMENT_SEARCH_PLACEHOLDER =
  "Enter RAN, agreement holder's name, or staff contact"
export const INITIAL_PLAN = 'Initial Plan'

// RUP View
export const PREVIEW_PDF = 'Preview PDF'
export const DOWNLOAD_PDF = 'Download PDF'
export const PLAN_ACTIONS = 'Plan Actions'
export const SAVE_DRAFT = 'Save Draft'
export const SUBMIT = 'Submit'
export const AMEND_PLAN = 'Amend Plan'
export const SIGN_SUBMISSION = 'Sign Submission'
export const VIEW = 'View'
export const AWAITING_CONFIRMATION = 'Awaiting Confirmation'
export const VIEW_VERSIONS = 'View Versions'

// RUP tabs
export const BASIC_INFORMATION = 'Basic Information'
export const PASTURES = 'Pastures'
export const SCHEDULES = 'Schedules'
export const MINISTER_ISSUES = "Minister's Issues"
export const INVASIVE_PLANTS = 'Invasive Plants'
export const ADDITIONAL_REQUIREMENTS = 'Additional Requirements'
export const MANAGEMENT_CONSIDERATIONS = 'Management Considerations'
export const ATTACHMENTS = 'Attachments'

// RUP basic information
export const PLAN_START = 'Plan Start Date'
export const PLAN_END = 'Plan End Date'
export const AGREEMENT_START = 'Agreement Start Date'
export const AGREEMENT_END = 'Agreement End Date'
export const AGREEMENT_DATE = 'Agreement Date'
export const AGREEMENT_TYPE = 'Agreement Type'
export const DISTRICT = 'District (Responsible)'
export const ZONE = 'Zone'
export const ALTERNATIVE_BUSINESS_NAME = 'Alternative Business Name'
export const AGREEMENT_HOLDERS = 'Agreement Holders'
export const TYPE = 'Type'
export const NOT_PROVIDED = 'Not provided'
export const NP = 'N/P'
export const NO_PLAN = 'No Plan'
export const NOT_SELECTED = 'Not selected'
export const NO_RUP_PROVIDED = 'No RUP found'
export const CONTACT_NAME = 'Contact Name'
export const CONTACT_EMAIL = 'Contact Email'
export const CONTACT_PHONE = 'Contact Phone'
export const EXTENDED = 'Extended'
export const EXEMPTION_STATUS = 'Exemption Status'
export const PLAN_DATE = 'Plan Date'
export const PLAN_START_DATE = 'Plan Start Date'
export const PLAN_END_DATE = 'Plan End Date'
export const PRIMARY_AGREEMENT_HOLDER = 'Primary Agreement Holder'
export const OTHER_AGREEMENT_HOLDER = 'Agreement Holder (Other)'

// RUP Usage
export const YEAR = 'Year'
export const AUTH_AUMS = 'Auth AUMs'
export const TEMP_INCREASE = 'Temp Increase'
export const BILLABLE_NON_USE = 'Non-Use'
export const TOTAL_ANNUAL_USE = 'Total Annual'

// RUP pastures
export const PASTURE_NAME = 'Pasture Name'
export const ALLOWABLE_AUMS = 'Allowable AUMs'
export const PRIVATE_LAND_DEDUCTION = 'Private Land Deduction (%)'
export const GRACE_DAYS = 'Grace Days'
export const PASTURE_NOTES = 'Pasture Notes (non legal content)'

// RUP Plant Communities
export const ASPECT = 'Aspect'
export const ELEVATION = 'Elevation'
export const APPROVED_BY_MINISTER = 'Approved by minister'
export const PLANT_COMMUNITY_NOTES = 'Plant Community Description'
export const COMMUNITY_URL = 'Community URL'
export const PURPOSE_OF_ACTION = 'Purpose of Action'

// RUP schedules
export const PASTURE = 'Pasture'
export const LIVESTOCK_TYPE = 'Livestock Type'
export const NUM_OF_ANIMALS = '# of Animals'
export const DATE_IN = 'Date in'
export const DATE_OUT = 'Date out'
export const DAYS = 'Days'
export const PLD = 'PLD'
export const CROWN_AUMS = 'Crown AUMs'

// RUP minister issues
export const CONTACT_NO_EXIST = "Contact doesn't exist"
export const ACTION_NOTE =
  'Note: If an action involves a range development or removal of timber (ex. off-stream watering or fence) a separate authorization is required. Please contact a range staff member if you are considering such an action.'

// Manage Zone
export const NO_DESCRIPTION = 'No description available'
export const NOT_ASSIGNED = 'Not assigned'

// messages
export const UNEXPECTED_ERROR = 'An unexpected error occurred.'
export const STATUS404 =
  'The request is currently not available, please try later.'
export const STATUS500 =
  'Internal server error occurred, please contact the administrator (MyRangeBC@gov.bc.ca).'
export const UPDATE_PLAN_STATUS_SUCCESS =
  'You have successfully updated the status of the range use plan.'
export const UPDATE_AGREEMENT_ZONE_SUCCESS =
  'You have successfully updated the zone of the range use plan.'
export const ASSIGN_STAFF_TO_ZONE_SUCCESS =
  'You have successfully assigned the staff to the zone.'
export const SAVE_PLAN_AS_DRAFT_SUCCESS =
  'You have successfully saved the range use plan as a draft.'
export const STAFF_SAVE_PLAN_DRAFT_SUCCESS =
  'Your changes have been successfully saved to the range use plan.'
export const UPDATE_USER_PROFILE_SUCCESS =
  'You have successfully update your profile.'
export const SUBMIT_PLAN_SUCCESS =
  'You have successfully submitted the range use plan to the range staff.'
export const EMPTY_GRAZING_SCHEDULE_ENTRIES =
  'Schedule must have at least 1 entry.'
export const INVALID_GRAZING_SCHEDULE_ENTRY =
  'Schedule has one or more invalid entries.'
export const TOTAL_AUMS_EXCEEDS = 'Total AUMs exceeds authorized AUMs.'
export const USER_NOT_ACTIVE =
  'This account is not active yet. Please contact the administrator (MyRangeBC@gov.bc.ca).'
export const USER_NO_ROLE =
  'This account has not been assigned a role, please contact the administrator (MyRangeBC@gov.bc.ca).'
export const USER_NOT_REGISTERED = 'This account has not been registered.'
export const LOADING_USER = 'Loading User Information'
export const LINK_CLIENT_SUCCESS = 'You have successfully linked the client.'
export const NO_INTERNET = 'There is no Internet connection.'
export const TYPE_CLIENT_NAME = 'Type name of the client'
export const NO_RESULTS_FOUND = 'No result founds.'
export const ERROR_OCCUR = 'Error Occurred!'
export const REDIRECTING = 'Please wait while redirecting...'
export const CREATE_AMENDMENT_SUCCESS =
  'You have successfully created an amendment'
export const SIGN_IN_ERROR = 'Error occurred while signing in.'
export const UPDATE_USER_ERROR = 'Error occurred while updating your profile.'
export const NO_CLIENT_NUMBER_ASSIGNED =
  'Your account has not yet been linked to a client number. Please contact your local range staff office.'
export const GET_ZONES_ERROR = 'Error occurred while fetching zones'
export const GET_USERS_ERROR = 'Error occurred while fetching users'

// modals
export const COMPLETED_CONFIRM_HEADER = 'Update Status: Completed'
export const COMPLETED_CONFIRM_CONTENT =
  'COMPLETE indicates that a RUP has either been APPROVED or DISCARDED. If you change status to COMPLETE you will no longer be able to make edits to this RUP. Would you like to switch this RUP to complete?'
export const PENDING_CONFIRM_HEADER = 'Update Status: Pending'
export const PENDING_CONFIRM_CONTENT =
  'PENDING indicates that a RUP is in edit mode. It is used during initial creation if the decision maker has requested edits before approving. Do not switch the status to PENDING unless the decision maker has requested specific edits. Would you like to switch this RUP to Pending?'
export const CHANGE_REQUEST_CONFIRM_HEADER = 'Update Status: Change Request'
export const CHANGE_REQUEST_CONFIRM_CONTENT =
  "Are you sure you want to request changes? All agreement holders will need to review and sign again if they've signed previously."
export const WRONGLY_MADE_WITHOUT_EFFECT_CONFIRM_HEADER =
  'Update Status: Wrongly Made - Without Effect'
export const WRONGLY_MADE_WITHOUT_EFFECT_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const STANDS_WRONGLY_MADE_CONFIRM_HEADER =
  'Update Status: Stands - Wrongly Made'
export const STANDS_WRONGLY_MADE_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const APPROVED_CONFIRM_HEADER = 'Update Status: Approved'
export const APPROVED_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const NOT_APPROVED_CONFIRM_HEADER = 'Update Status: Not Approved'
export const NOT_APPROVED_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const NOT_APPROVED_FWR_CONFIRM_HEADER =
  'Update Status: Not Approved - Further Work Required'
export const NOT_APPROVED_FWR_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const RECOMMEND_READY_CONFIRM_HEADER = 'Update Status: Recommend Ready'
export const RECOMMEND_READY_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const RECOMMEND_NOT_READY_CONFIRM_HEADER =
  'Update Status: Recommend Not Ready'
export const RECOMMEND_NOT_READY_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const RECOMMEND_FOR_SUBMISSION_CONFIRM_HEADER =
  'Update Status: Recommend For Submission'
export const RECOMMEND_FOR_SUBMISSION_CONFIRM_CONTENT =
  'Are you sure you want to update the status?'
export const AMEND_PLAN_CONFIRM_HEADER = 'Amend Range Use Plan'
export const AMEND_PLAN_CONFIRM_CONTENT =
  'Are you sure you want to amend this range use plan?'
export const SUBMIT_PLAN_CONFIRM_HEADER = 'Confirm'
export const SUBMIT_PLAN_CONFIRM_CONTENT =
  'You will not be able to edit this RUP after submission.'

export const UPDATE_CONTACT_CONFIRM_HEADER =
  'Confirmation: Update Contact with Zone'
export const UPDATE_CONTACT_CONFIRM_CONTENT =
  'Are you sure you want to update this contact?'
export const DELETE_SCHEDULE_CONFIRM_HEADER =
  'Confirmation: Deleting Grazing Schedule'
export const DELETE_SCHEDULE_CONFIRM_CONTENT =
  'This schedule will be permanently deleted. Are you sure you want to delete this schedule?'
export const DELETE_SCHEDULE_ENTRY_CONFIRM_HEADER =
  'Confirmation: Deleting Grazing Schedule Entry'
export const DELETE_SCHEDULE_ENTRY_CONFIRM_CONTENT =
  'This schedule entry will be permanently deleted. Are you sure you want to delete this schedule entry?'
export const DELETE_MINISTER_ISSUE_ACTION_CONFIRM_HEADER =
  'Confirmation: Deleting Minister Issue Action'
export const DELETE_MINISTER_ISSUE_ACTION_CONFIRM_CONTENT =
  'This action will be permanently deleted. Are you sure you want to delete this minister issue action?'
export const DELETE_MANAGEMENT_CONSIDERATION_CONFIRM_HEADER =
  'Confirmation: Deleting Management Consideration'
export const DELETE_MANAGEMENT_CONSIDERATION_CONFIRM_CONTENT =
  'This consideration will be permanently deleted. Are you sure you want to delete this management consideration?'

export const UPDATE_CLIENT_ID_CONFIRM_HEADER = 'Confirmation: Link Client'
export const UPDATE_CLIENT_ID_CONFIRM_CONTENT =
  'Are you sure you want to link this user to the client?'
export const SUBMIT_RUP_CHANGE_CONFIRM_HEADER = 'Ready to Submit?'
export const SUBMIT_RUP_CHANGE_CONFIRM_CONTENT =
  'Once submitted you can no longer make edits to the Range Use Plan. Do not submit until you are satisfied with all content.'

// banners
export const SELECT_RUP_BANNER_HEADER = 'Select Range Use Plan'
export const SELECT_RUP_BANNER_CONTENT =
  "View details of each range use plan. Enter RAN, agreement holder's name, or staff contact in the search box to find a specific range use plan."
export const MANAGE_ZONE_BANNER_HEADER = 'Manage Zones'
export const MANAGE_ZONE_BANNER_CONTENT =
  'Search for range staff and link them to their corresonding zone.'
export const MANAGE_CLIENT_BANNER_HEADER = 'Manage Clients'
export const MANAGE_CLIENT_BANNER_CONTENT =
  'Search for agreement holders and link them to their corresponding client.'
