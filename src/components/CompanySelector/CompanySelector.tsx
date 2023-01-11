import Select from 'react-select';
import { API_KEY } from '../../config'
import { DATABASE_URL } from '../../constants/nasdaq';
import { useDispatch } from 'react-redux';
import { setSelectedCompnay } from '../../redux/reducers/companies';
import { useApiCall } from '../../hooks/useApiCall';
import { sortBy } from 'lodash';
import { Companies } from './CompanySelector.types';
import { LABEL } from '../../constants/selectedCompany';

const CompanySelector = () => {
  const dispatch = useDispatch();
  const companies = useApiCall<Companies>(`${DATABASE_URL}&api_key=${API_KEY}`);
  const options = companies?.datasets.map(({ name, dataset_code }) => ({ label: name, value: dataset_code}));
  const sortedOptions = sortBy(options, LABEL);

  return (
    <Select
      options={sortedOptions}
      isLoading={!companies?.datasets?.length}
      onChange={e => dispatch(setSelectedCompnay(e))}
    />
  )
};

export default CompanySelector;