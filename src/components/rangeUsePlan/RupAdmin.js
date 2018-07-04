import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'semantic-ui-react';
import UpdateZoneModal from './UpdateZoneModal';
import {
  COMPLETED_CONFIRMATION_CONTENT, COMPLETED_CONFIRMATION_HEADER,
  DETAIL_RUP_BANNER_CONTENT,
} from '../../constants/strings';
import { ELEMENT_ID, PLAN_STATUS, REFERENCE_KEY } from '../../constants/variables';
import { Status, ConfirmationModal, Banner } from '../common';
import { getAgreementHolders, isStatusCreated, isStatusPending } from '../../utils';
import RupBasicInformation from './view/RupBasicInformation';
import RupPastures from './view/RupPastures';
import RupGrazingSchedules from './view/RupGrazingSchedules';
import RupMinisterIssues from './view/RupMinisterIssues';
import { EXPORT_PDF } from '../../constants/routes';

const propTypes = {
  agreement: PropTypes.shape({ zone: PropTypes.object }).isRequired,
  user: PropTypes.shape({}).isRequired,
  references: PropTypes.shape({}).isRequired,
  plan: PropTypes.shape({}).isRequired,
  pasturesMap: PropTypes.shape({}).isRequired,
  grazingSchedulesMap: PropTypes.shape({}).isRequired,
  // grazingScheduleEntriesMap: PropTypes.shape({}).isRequired,
  ministerIssuesMap: PropTypes.shape({}).isRequired,
  updatePlanStatus: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
  // isUpdatingStatus: PropTypes.bool.isRequired,
  // isDownloadingPDF: PropTypes.bool.isRequired,
  // getRupPDF: PropTypes.func.isRequired,
  // toastErrorMessage: PropTypes.func.isRequired,
  // toastSuccessMessage: PropTypes.func.isRequired,
};

class RupAdmin extends Component {
  constructor(props) {
    super(props);
    const zone = props.agreement && props.agreement.zone;
    this.state = {
      isCompletedModalOpen: false,
      isPendingModalOpen: false,
      isUpdateZoneModalOpen: false,
      zone,
    };
  }

  componentDidMount() {
    this.stickyHeader = document.getElementById(ELEMENT_ID.RUP_STICKY_HEADER);
    if (this.stickyHeader) {
      // requires the absolute offsetTop value
      this.stickyHeaderOffsetTop = this.stickyHeader.offsetTop;
      this.scrollListner = window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListner);
  }

  handleScroll = () => {
    if (this.stickyHeader) {
      if (window.pageYOffset >= this.stickyHeaderOffsetTop) {
        this.stickyHeader.classList.add('rup__sticky--fixed');
      } else {
        this.stickyHeader.classList.remove('rup__sticky--fixed');
      }
    }
  }

  onViewPDFClicked = () => {
    const { id, agreementId } = this.props.plan || {};
    if (id && agreementId) {
      this.pdfLink.click();
    }
  }

  setPDFRef = (ref) => { this.pdfLink = ref; }

  openModal = property => this.setState({ [property]: true })
  closeModal = property => this.setState({ [property]: false })
  openCompletedConfirmModal = () => this.openModal('isCompletedModalOpen')
  closeCompletedConfirmModal = () => this.closeModal('isCompletedModalOpen')
  openPendingConfirmModal = () => this.openModal('isPendingModalOpen')
  closePendingConfirmModal = () => this.closeModal('isPendingModalOpen')
  openUpdateZoneModal = () => this.openModal('isUpdateZoneModalOpen')
  closeUpdateZoneModal = () => this.closeModal('isUpdateZoneModalOpen')

  handleCompletedClicked = () => {
    this.updateStatus(PLAN_STATUS.COMPLETED, this.closeCompletedConfirmModal);
  }
  handlePendingClicked = () => {
    this.updateStatus(PLAN_STATUS.PENDING, this.closePendingConfirmModal);
  }
  updateStatus = (statusName, closeConfirmModal) => {
    const {
      references,
      updatePlanStatus,
      plan,
      updatePlan,
    } = this.props;
    const arrOfPlanStatus = references[REFERENCE_KEY.PLAN_STATUS] || [];
    const status = arrOfPlanStatus.find(s => s.name === statusName);
    if (status && plan) {
      const statusUpdated = (newStatus) => {
        closeConfirmModal();
        updatePlan({
          ...plan,
          status: newStatus,
        });
      };
      updatePlanStatus(plan.id, status.id).then(statusUpdated);
    }
  }

  onZoneUpdated = (newZone) => {
    this.setState({ zone: newZone });
  }

  render() {
    const {
      agreement,
      user,
      references,
      plan,
      pasturesMap,
      grazingSchedulesMap,
      // grazingScheduleEntriesMap,
      ministerIssuesMap,
    } = this.props;
    const {
      isCompletedModalOpen,
      isPendingModalOpen,
      isUpdateZoneModalOpen,
      zone,
    } = this.state;

    const { agreementId, status } = plan;
    const { clients, usage: usages } = agreement;
    const { primaryAgreementHolder } = getAgreementHolders(clients);
    const primaryAgreementHolderName = primaryAgreementHolder && primaryAgreementHolder.name;
    const statusDropdownOptions = [
      {
        key: PLAN_STATUS.COMPLETED,
        text: PLAN_STATUS.COMPLETED,
        value: 1,
        onClick: this.openCompletedConfirmModal,
      },
      {
        key: PLAN_STATUS.CHANGE_REQUESTED,
        text: PLAN_STATUS.CHANGE_REQUESTED,
        value: 2,
        onClick: this.openPendingConfirmModal,
      },
    ];

    return (
      <div className="rup">
        <a
          className="rup__pdf-link"
          target="_blank"
          href={`${EXPORT_PDF}/${agreementId}/${plan.id}`}
          ref={this.setPDFRef}
        >
          pdf link
        </a>

        <ConfirmationModal
          open={isCompletedModalOpen}
          header={COMPLETED_CONFIRMATION_HEADER}
          content={COMPLETED_CONFIRMATION_CONTENT}
          onNoClicked={this.closeCompletedConfirmModal}
          onYesClicked={this.handleCompletedClicked}
          // loading={isUpdatingStatus}
        />

        <ConfirmationModal
          open={isPendingModalOpen}
          header="Confirmation: Request Change"
          content="Are you sure you want to request changes to the agreement holder?"
          onNoClicked={this.closePendingConfirmModal}
          onYesClicked={this.handlePendingClicked}
          // loading={isUpdatingStatus}
        />

        <UpdateZoneModal
          isUpdateZoneModalOpen={isUpdateZoneModalOpen}
          closeUpdateZoneModal={this.closeUpdateZoneModal}
          onZoneUpdated={this.onZoneUpdated}
          agreementId={agreementId}
          currZone={zone}
        />

        <Banner
          className="banner__no-default-height"
          header={agreementId}
          content={DETAIL_RUP_BANNER_CONTENT}
        />

        <div id={ELEMENT_ID.RUP_STICKY_HEADER} className="rup__sticky">
          <div className="rup__sticky__container">
            <div className="rup__sticky__left">
              <div className="rup__sticky__title">{agreementId}</div>
              <div className="rup__sticky__primary-agreement-holder">{primaryAgreementHolderName}</div>
              <Status
                className="rup__status"
                status={status}
                user={user}
              />
            </div>
            <div className="rup__sticky__btns">
              <Button
                onClick={this.onViewPDFClicked}
                className="rup__btn"
                // loading={isDownloadingPDF}
              >
                View PDF
              </Button>
              {(isStatusPending(status) || isStatusCreated(status)) &&
                <Dropdown
                  className="rup__status-dropdown"
                  text="Update Status"
                  options={statusDropdownOptions}
                  button
                  item
                />
              }
            </div>
          </div>
        </div>

        <div className="rup__content">
          <RupBasicInformation
            className="rup__basic_information"
            agreement={agreement}
            plan={plan}
            zone={zone}
            user={user}
            onZoneClicked={this.openUpdateZoneModal}
          />

          <RupPastures
            className="rup__pastures"
            plan={plan}
            pasturesMap={pasturesMap}
          />

          <RupGrazingSchedules
            className="rup__schedules__container"
            references={references}
            usages={usages}
            plan={plan}
            pasturesMap={pasturesMap}
            grazingSchedulesMap={grazingSchedulesMap}
            // grazingScheduleEntriesMap={grazingScheduleEntriesMap}
          />

          <RupMinisterIssues
            className="rup__missues__container"
            references={references}
            plan={plan}
            pasturesMap={pasturesMap}
            ministerIssuesMap={ministerIssuesMap}
          />
        </div>
      </div>
    );
  }
}

RupAdmin.propTypes = propTypes;
export default RupAdmin;
