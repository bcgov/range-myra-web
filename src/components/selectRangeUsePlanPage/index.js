import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import * as API from '../../constants/api';
import {
  axios,
  getAuthHeaderConfig,
  isUserAgrologist,
  isUserAdmin,
  getDataFromLocalStorage,
  saveDataInLocalStorage
} from '../../utils';
import useDebounce from '../../utils/hooks/useDebounce';
import Error from './Error';
import { makeStyles } from '@material-ui/core/styles';
import ZoneSelect, { ZoneSelectAll } from './ZoneSelect';
import { Banner } from '../common';
import {
  SELECT_RUP_BANNER_HEADER,
  SELECT_RUP_BANNER_CONTENT,
} from '../../constants/strings';
import { useToast } from '../../providers/ToastProvider';
import {
  useQueryParam,
  StringParam,
  encodeObject,
  decodeObject,
  BooleanParam,
} from 'use-query-params';
import { useReferences } from '../../providers/ReferencesProvider';
import { useUser } from '../../providers/UserProvider';

import SortableAgreementTable from './SortableAgreementTable';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const keyValueSeparator = '-'; // default is "-"
const entrySeparator = '~'; // default is "_"
const NewObjectParam = {
  encode: (obj) => encodeObject(obj, keyValueSeparator, entrySeparator),

  decode: (str) => decodeObject(str, keyValueSeparator, entrySeparator),
};

const useStyles = makeStyles(() => ({
  searchFilterContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '15px',
    justifyContent: 'space-between',
  },
  checkboxBorder: {
    border: '1px solid black',
    borderRadius: '3px',
    padding: '4px',
    margin: '0 1rem',
  },
}));

const SelectRangeUsePlanPage = ({ match, history }) => {
  const { page = 1 } = match.params;
  const debouncedPage = useDebounce(page, 500);
  const [toastId, setToastId] = useState();
  const [limit = 10, setLimit] = useQueryParam('limit', StringParam);
  const debouncedLimit = useDebounce(limit, 500);
  const [searchSelectedZones, setSearchSelectedZones] = useState([]);
  const debouncedZones = useDebounce(searchSelectedZones, 500);
  const [orderBy = 'agreement.forest_file_id', setOrderBy] = useQueryParam(
    'orderBy',
    StringParam,
  );
  const debouncedOrderBy = useDebounce(orderBy, 500);
  const [order = 'asc', setOrder] = useQueryParam('order', StringParam);
  const debouncedOrder = useDebounce(order, 500);
  const filterInfo = getDataFromLocalStorage("filter-info");
  const [filters = { agreementCheck: 'true' }, setFilters] = useQueryParam(
    'filters',
    NewObjectParam,
  );
  const debouncedFilters = useDebounce(filters, 500);
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  // startup
  useEffect(() => {
    // Set initial page info from localstorage
    const pageInfo = getDataFromLocalStorage("page-info");
    if (pageInfo) {
      if (pageInfo.pageNumber) setPage(pageInfo.pageNumber);
      if (pageInfo.pageLimit) setLimit(pageInfo.pageLimit);
    }
    // Initialize filters
    setFilters({ 
      ...filterInfo,
      agreementCheck: 'true',
    });
    setFiltersInitialized(true);  // Workaround flag for checkbox racing the filter initialization
  }, []);
  const [planCheck = filterInfo?.planCheck || false, setPlanCheck] = useQueryParam(
    'planCheck',
    BooleanParam,
  );
  const [agreementCheck = filterInfo?.agreementCheck !== undefined ? filterInfo.agreementCheck : true, setAgreementCheck] = useQueryParam(
    'agreementCheck',
    BooleanParam,
  );
  const [activeCheck = filterInfo?.activeCheck || false, setActiveCheck] = useQueryParam(
    'activeCheck',
    BooleanParam,
  );
  useEffect(() => {
    if (filtersInitialized) addToFilters('planCheck', planCheck);
  }, [planCheck]);
  useEffect(() => {
    if (filtersInitialized) addToFilters('agreementCheck', agreementCheck);
  }, [agreementCheck]);
  useEffect(() => {
    if (filtersInitialized) addToFilters('activeCheck', activeCheck);
  }, [activeCheck]);

  const { warningToast, removeToast, errorToast } = useToast();

  const references = useReferences();
  const user = useUser();

  const zones = references.ZONES || [];
  const userZones = zones.filter((zone) => user.id === zone.userId);
  const districtIds = userZones.map((userZone) => {
    return userZone.districtId;
  });
  const unassignedZones = zones.filter(
    (zone) =>
      user.id !== zone.userId && districtIds.indexOf(zone.districtId) != -1,
  );
  const zoneUsers = references.USERS;

  const { data, error, revalidate, isValidating } = useSWR(
    `${API.SEARCH_AGREEMENTS}?page=${page}&selectedZones=${searchSelectedZones}&limit=${limit}&orderBy=${orderBy}&order=${order}&filterString=${JSON.stringify(filters)}`,
    (key) => axios.get(key, getAuthHeaderConfig()).then((res) => res.data),
    {
      onLoadingSlow: () =>
        setToastId(warningToast('Agreements are taking a while to load', -1)),
      onError: () => {
        if (references?.ZONES?.length > 0)
          errorToast('Could not load agreements');
      },
      onSuccess: () => removeToast(toastId),
    },
  );

  const addToFilters = (filterCol, filterVal) => {
    let newFilter = {
      ...filters,
    };
    newFilter[filterCol] = filterVal;
    setFilters(newFilter);
  };

  const setPage = (page) => {
    history.replace(`/home/${page}/${history.location.search}`);
  }

  const setPageAndSave = (page) => {
    history.replace(`/home/${page}/${history.location.search}`);
    const currPageInfo = getDataFromLocalStorage("page-info");
    const pageInfo = {
      ...currPageInfo,
      pageNumber: page
    }
    saveDataInLocalStorage("page-info", pageInfo);
  }

  const setPageLimitAndSave = (limit) => {
    const currPageInfo = getDataFromLocalStorage("page-info");
    const pageInfo = {
      ...currPageInfo,
      pageLimit: limit
    }
    saveDataInLocalStorage("page-info", pageInfo);
    setLimit(limit);
  }

  const setSaveFilterInfo = (filterCol, value) => {
    if (!filtersInitialized) return; // Avoid empty update

    const currFilterInfo = getDataFromLocalStorage("filter-info");
    const filterInfo = {
      ...currFilterInfo
    }
    filterInfo[filterCol] = value;
    saveDataInLocalStorage("filter-info", filterInfo);
  }

  const { agreements, totalPages, currentPage = page, totalItems } = data || {};
  const classes = useStyles();
  return (
    <section className="agreement">
      <Banner
        header={SELECT_RUP_BANNER_HEADER}
        content={SELECT_RUP_BANNER_CONTENT}
      />
      <div className={classes.searchFilterContainer}>
        <div className={classes.checkboxBorder}>
          <FormControlLabel
            control={
              <Checkbox
                checked={planCheck}
                onChange={() => {
                  setPlanCheck(!planCheck);
                  setSaveFilterInfo("planCheck", !planCheck);
                }}
                name="planCheck"
                color="primary"
              />
            }
            label="RUP Created"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreementCheck}
                onChange={() => {
                  setAgreementCheck(!agreementCheck);
                  setSaveFilterInfo("agreementCheck", !agreementCheck);
                }}
                name="agreementCheck"
                color="primary"
              />
            }
            label="Range Agreement"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={activeCheck}
                onChange={() => {
                  setActiveCheck(!activeCheck);
                  setSaveFilterInfo("activeCheck", !activeCheck);
                }}
                name="activeCheck"
                color="primary"
              />
            }
            label="Active RUP"
          />
        </div>
        {isUserAgrologist(user) && (
          <ZoneSelect
            zones={zones}
            userZones={userZones}
            unassignedZones={unassignedZones}
            zoneUsers={zoneUsers}
            setSearchSelectedZones={setSearchSelectedZones}
          />
        )}
        {(isUserAdmin(user)) && (
          <ZoneSelectAll
            zones={zones}
            zoneUsers={zoneUsers}
            setSearchSelectedZones={setSearchSelectedZones}
          />
        )}
      </div>

      {error ? (
        <Error onRetry={revalidate} />
      ) : (
        <>
          <SortableAgreementTable
            agreements={agreements}
            currentPage={currentPage - 1}
            totalPages={totalPages}
            totalAgreements={totalItems}
            perPage={limit}
            onPageChange={(page) => setPageAndSave(page + 1)}
            onLimitChange={setPageLimitAndSave}
            loading={isValidating}
            onOrderChange={(orderBy, order) => {
              setOrder(order);
              setOrderBy(orderBy);
            }}
            onFilterChange={(filterCol, filterVal) => {
              addToFilters(filterCol, filterVal);
              setSaveFilterInfo(filterCol, filterVal);
              setPage(1);
            }}
            orderBy={orderBy}
            order={order}
            filters={filters}
            onStatusCodeChange={(filterCol, filterVal) => {
              addToFilters(filterCol, filterVal);
              setSaveFilterInfo(filterCol, filterVal);
              setPage(1);
            }}
          />
        </>
      )}
    </section>
  );
};

export default SelectRangeUsePlanPage;
