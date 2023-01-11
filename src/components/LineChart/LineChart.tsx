import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { sortBy } from 'lodash';
import { useSelector } from 'react-redux';
import { useApiCall } from '../../hooks/useApiCall';
import { DATABASE_CODE, ROOT_URL } from '../../constants/nasdaq';
import { API_KEY } from '../../config';
import { LineChartProps, CompaniesState } from './LineChart.types';
import { CLOSE, DATE } from '../../constants/selectedCompany';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const selectedCompanyValue = useSelector<CompaniesState, string>(state => state.companies.selectedCompany.value);
  const selectedCompany = useApiCall<LineChartProps>(`${ROOT_URL}/${DATABASE_CODE}/${selectedCompanyValue}.json?&api_key=${API_KEY}`, !!selectedCompanyValue);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Company Historical Trend',
      },
    },
  };

  const indexOfDate = selectedCompany?.dataset?.column_names?.indexOf(DATE);
  const indexOfClose = selectedCompany?.dataset?.column_names?.indexOf(CLOSE);
  const sortedData = sortBy(selectedCompany?.dataset?.data, selectedCompany?.dataset?.data[indexOfDate]);
  
  const data = {
    labels: sortedData.map(data => data[indexOfDate]),
    datasets: [{
      label: 'End of day stock price',
      data: sortedData.map(data => data[indexOfClose]),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  }

  return (
    <Line
      options={options}
      data={data}
    />
  )
};

export default LineChart;